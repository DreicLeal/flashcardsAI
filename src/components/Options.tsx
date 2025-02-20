"use client";

import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import React from "react";
import CreateDeckOptions from "./CreateDeckOptions";

export default function Options() {
  const { modalOpen } = useFlashCards();
  


  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
    <CreateDeckOptions/>
      <button
        className="bg-accent w-[50%] hover:bg-accentHover active:bg-accentActive transition 
        duration-200 sm:w-[200px] rounded-md text-secondary font-bold text-lg"
        onClick={() => router.push("/deckList")}
      >
        Flash Cards
      </button>
      {modalOpen && <ConfirmModal />}
    </div>
  );
}
