export default function footer({ companyName }: { companyName: string }) {
    return (
        <footer className='border-t py-2'>
            <p className='text-center'>
                &copy; 2024 {companyName}. All rights reserved.
            </p>
        </footer>
    )
}
