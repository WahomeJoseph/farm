'use client'
import { login, logout } from "@/utils/auth";
export const SignInButton = () => {
    return (
        <button
            onClick={() => login()}
            className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 transition">
            Sign In With Github
        </button>
    )
}

export const SignOutButton = () => {
    return (
        <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600 transition">
            Sign Out
        </button>
    )
}