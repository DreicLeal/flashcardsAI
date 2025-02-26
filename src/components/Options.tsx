"use client";

import { useRouter } from "next/navigation";
import React from "react";
import CreateDeckOptions from "./CreateDeckOptions";

export default function Options() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
      <div className="flex flex-col items-center w-[200px] gap-2">
        <CreateDeckOptions />
      </div>
      <button
        className="bg-accent w-[50%] hover:bg-accentHover active:bg-accentActive transition 
        duration-200 sm:w-[200px] rounded-md text-secondary font-bold text-lg"
        onClick={() => router.push("/deckList")}
      >
        Ver meus Decks
      </button>

    </div>
  );
}
