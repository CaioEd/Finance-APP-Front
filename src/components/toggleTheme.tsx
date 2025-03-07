import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button variant='outline' size='icon' onClick={toggleTheme}>
            {theme === 'dark' ? (
            <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
            ) : (
            <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
            )}
        </Button>
    )
}
