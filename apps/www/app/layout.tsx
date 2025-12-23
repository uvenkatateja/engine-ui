import type { Metadata } from 'next'
import './globals.css'
import { fontSans, fontMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'Engine UI',
    template: '%s | Engine UI',
  },
  description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
  keywords: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'UI Components',
    'Component Library',
    'Design System',
    'Radix UI',
    'Shadcn',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
