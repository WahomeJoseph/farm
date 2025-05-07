import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
import User from '@/models/User'
import connectDB from '@/lib/db'

export const { auth, handlers, signIn } = NextAuth({
        adapter: MongoDBAdapter(clientPromise),
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: 'jwt',
            maxAge: 60 * 60,
        },
        providers: [
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            }),
            Credentials({
                name: 'Credentials',
                credentials: {
                    email: { label: 'Email', type: 'email' },
                    password: { label: 'Password', type: 'password' },
                },
                async authorize(credentials) {
                    await connectDB()
                    try {
                        if (!credentials?.email || !credentials?.password) {
                            throw new Error('Email and password are required!')
                        }
                        const user = await User.findOne({ email: credentials?.email }).select('+password')

                        if (!user) {
                            console.log('User not found with this email!')
                            throw new Error('User not found with the email.')
                        }
                        const isMatch = await bcrypt.compare(
                            credentials?.password?.trim(),
                            user.password
                        )
                        if (!isMatch) {
                            console.log('Invalid credentials!')
                            throw new Error('Invalid credentials!')
                        }
                        console.log('Login successful')
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                        }
                    } catch (error) {
                        console.log('Authentication error:', error)
                        throw new Error('Authentication error.Please try again!')
                    }
                }
            }),
        ],

        callbacks: {
            async signIn({ user, account }) {
                await connectDB()
                if (account?.provider === 'google') {
                    try {
                        const existingUser = await User.findOne({ email: user?.email })
                        if (!existingUser) {
                            await User.create({
                                name: user?.name,
                                email: user?.email,
                            })
                        }
                        return true
                    } catch (error) {
                        console.error('Error during Google sign in:', error)
                        return false
                    }
                }
                return true
            },
            async session({ session, token }) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.sub || token.id,
                        email: token.email,
                        name: token.name,
                    }
                }
            },
            async jwt({ token, user }) {
                if (user) {
                    token.id = user.id
                    token.email = user.email
                    token.name = user.name
                }
                return token
            },

        },
        pages: {
            signIn: '/sign-in',
        },
        // debug: process.env.NODE_ENV === 'development',
        trustHost: true,
    })