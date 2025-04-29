import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/conn';
import User from '@/models/User';
import connectDB from '@/lib/db';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials?.email }).lean();

          if (!user) {
            console.log('User not found with this email!');
            return null;
          }

          if (!user.password) {
            console.log('Invalid credentials!');
            return null;
          }
          const isMatch = await bcrypt.compare(
            credentials?.password?.trim(),
            user.password
          );
          if (!isMatch) {
            console.log('Invalid credentials!');
            return null;
          }
          console.log('Login successful');
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username || user.name || user.email.split('@')[0],
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: profile?.email }).lean();
          if (!existingUser) {
            await User.create({
              name: profile?.name,
              email: profile?.email,
            });
          }
          return true;
        } catch (error) {
          console.error('Error during Google signin:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  pages: {
    signIn: '/sign-in',
  },
  debug: process.env.NODE_ENV === 'development',
  // debug: true
};