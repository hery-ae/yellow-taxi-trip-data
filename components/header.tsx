import Link from 'next/link'

export default function header({ appTitle }: { appTitle: string }) {
    return (
        <header className='border-b-2 py-4 mb-6'>
            <h1 className='text-xl text-center font-bold'>
                <Link href='/'>{appTitle}</Link>
            </h1>
        </header>
    )
}
