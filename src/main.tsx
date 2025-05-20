import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/index.tsx'
import './index.css'
import { AuthProvider } from './context/general.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'


createRoot(document.getElementById('root')!).render(
	// <StrictMode>
		<ThemeProvider>
			<SidebarProvider>
				<AuthProvider>
					<AppRoutes />
				</AuthProvider>
			</SidebarProvider>
		</ThemeProvider>
	// </StrictMode>
)
