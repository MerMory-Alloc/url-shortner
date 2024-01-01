import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['500', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'shortly',
  description: 'url shortner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
