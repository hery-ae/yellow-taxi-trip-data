import '../styles/app.css'

import Header from '../components/header'
import Footer from '../components/footer'

export default function app({ children }: { children: React.ReactNode }) {
    return (
        <div className='container max-w-screen-lg min-h-screen flex flex-col mx-auto'>
            <Header appTitle='Yellow Taxi Trip Data' />
            {children}
            <Footer companyName='PT ...' />
        </div>
    )
}
