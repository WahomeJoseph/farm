import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function checkSession() {
    
    const {data: session,status} = useSession()
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            if (status === 'unauthenticated') {
                router.push('/sign-in?sessionExpired=true')
            }
        }

        const interval = setInterval(checkSession, 5000)
        checkSession()
        return () => clearInterval(interval)
    })
  return {status, session}
}
