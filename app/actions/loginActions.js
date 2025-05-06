"use server"
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/auth.config'

export const LoginActions = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return {
            status: 401,
            message: 'Unauthorized'
        }
    }
    return {
        status: 200,
        message: 'Login successful',
        user: session.user
    }
}