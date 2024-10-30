import '../styles/app.css'

import { Metadata } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.png'
    }
}

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <div className='container max-w-screen-lg min-h-screen flex flex-col mx-auto'>
                    <Header appTitle='Yellow Taxi Trip Data' />
                    {children}
                    <Footer companyName='PT ...' />
                </div>
            </body>
        </html>
    )
}
