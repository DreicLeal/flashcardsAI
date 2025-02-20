"use client";

import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";

export default function UploadData() {
  const { handleFileUpload } = useFlashCards();

  return (
    <label
    htmlFor="selection"
    className="relative w-[180px] h-[120px] rounded-md p-2 flex flex-col items-center justify-center hover:bg-white/25 transition duration-300 cursor-pointer"
  >

    <p className="absolute top-[-7%] text-primary text-9xl font-semibold h-[75px]">+</p>
    <input
      type="file"
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      id="selection"
      accept=".xlsx"
      onChange={(e) => handleFileUpload(e)}
    />
  </label>
  );
}
