'use client'

import { useRouter } from "next/navigation"

export default function Options () {
    
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <button className="bg-accent w-[50%] sm:w-[200px] rounded-md text-secondary font-bold text-lg" onClick={() => router.push("/chat")}>Chat</button>
        </div>
    )
}