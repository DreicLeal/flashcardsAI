"use client";
import UploadData from "./UploadData";
import Image from "next/image";
import magic from "../../public/magic-wand.png";
import AIRequestForm from "./AIRequestForm";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";

export default function CreateDeckOptions() {
  const { isFormOpen, setIsFormOpen } = useFlashCards();
  return (
    <>
      <div>
        <p>Adicione um arquivo xls</p>
        <UploadData />
      </div>
      <p className="text-3xl font-semibold">OU</p>
      <div>
        <p className="text-center">✨Peça para IA</p>
        <button
          onClick={() => setIsFormOpen(true)}
          className="relative w-[180px] h-[120px] rounded-md p-2 flex flex-col items-center justify-center hover:bg-white/25 transition duration-300"
        >
          <Image className="w-20 h-20" src={magic} alt="varinha mágica" />
        </button>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-50">
          <div className="bg-transparent rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 p-1 rounded-md hover:bg-gray-900"
              onClick={() => setIsFormOpen(false)}
            >
              ❌ Close
            </button>
            <AIRequestForm />
          </div>
        </div>
      )}
    </>
  );
}
