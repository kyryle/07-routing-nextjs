'use client';

interface ErrorProps {
    error: Error
}

export default function Error({error}: ErrorProps) {
    
    return (
        <>
        <p>error has occured {error.message}</p>
        </>
    )
}