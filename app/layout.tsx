import './globals.css'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

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
        <html lang="en" className="h-full">
            <body className={inter.className + ' h-full'}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div id="root" className="h-full w-full">
                        <div className="overflow-x-hidden h-full w-full">
                            { children }
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
