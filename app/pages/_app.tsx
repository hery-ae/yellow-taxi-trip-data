import '../styles/app.css'

import type { AppProps } from 'next/app'
import Header from '../components/header'
import Footer from '../components/footer'

export default function app({ Component, pageProps }: AppProps) {
    return (
        <div className='container max-w-screen-lg min-h-screen flex flex-col mx-auto'>
            <Header appTitle='Yellow Taxi Trip Data' />
            <Component {...pageProps} />
            <Footer companyName='PT ...' />
        </div>
    )
}
