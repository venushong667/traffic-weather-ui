import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

// Resolve hydration warning of using attribute "class" and "style" that caused by the difference between React tree rendering
const ThemeProvider = dynamic(() => import('@/components/theme-provider'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Traffic & Weather Forecast',
    description: 'Assist in traffic and weather forecast',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div id="root" className="h-screen w-screen overflow-hidden">
                        <div className="overflow-hidden h-full w-full">
                            { children }
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
