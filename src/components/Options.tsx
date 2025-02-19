'use client'

import { useRouter } from "next/navigation"
import UploadData from "./UploadData"

export default function Options () {
    
    const router = useRouter()
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
            <UploadData/>
            <button className="bg-accent w-[50%] hover:bg-accentHover active:bg-accentActive transition duration-200 sm:w-[200px] rounded-md text-secondary font-bold text-lg" onClick={() => router.push("/deckList")}>Flash Cards</button>
        </div>
    )
}