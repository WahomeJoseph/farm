'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut, ShoppingBag } from 'lucide-react'
import { toast, Toaster } from 'sonner'

const UserButton = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const avatarFallback =
    session?.user?.name?.charAt(0)?.toUpperCase() ||
    session?.user?.email?.charAt(0)?.toUpperCase() ||
    'User'

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Signed out successfully!', { duration: 3000 })
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out. Please try again.', { duration: 4000 })
    }
  }

  return (
    <nav className='flex items-center'>
      <Toaster />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex items-center gap-3 p-2 hover:bg-green-100 text-green-700'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || 'User'} />
                <AvatarFallback className='bg-green-600 text-white'>
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <span className='text-sm font-medium hidden md:block'>
                {session.user?.name || session.user?.email?.split('@')[0] || 'User'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-green-100 shadow-md p-2 w-56'>
            <DropdownMenuLabel className='text-green-700'>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href='/orders' className='flex items-center gap-2 hover:shadow-sm'>
                <ShoppingBag className='h-4 w-4' />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className='text-red-600 focus:text-red-600 flex items-center gap-2 hover:shadow-sm'>
              <LogOut className='h-4 w-4' />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex items-center gap-2 p-2'>
          <Button
            asChild
            variant='outline'
            className='bg-white text-green-600 border-green-600 hover:bg-green-50'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
          <Button
            asChild
            className='bg-green-600 text-white hover:bg-green-700'>
            <Link href='/register-new-account'>Sign Up</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}

export default UserButton