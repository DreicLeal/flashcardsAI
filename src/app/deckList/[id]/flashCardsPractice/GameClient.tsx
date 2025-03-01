"use client";

import FlashCard from "@/components/flashCardsGame/FlashCard";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";


export default function GameClient({ id }: { id: string }) {
  const { deckList, currentIndex, setCurrentIndex } = useFlashCards();

  const router = useRouter();

  const closePractice = () => {
    setCurrentIndex(0);
    router.push("/deckList");
  };

  const chosenDeck = deckList.find((deck) => deck.id === id);
  if (!chosenDeck) throw new Error("Deck not found");

  return (
    <div className="flex flex-col p-2 gap-4 items-center">
      <div className="flex justify-between items-center w-full max-w-lg bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          {chosenDeck.name}
        </h2>
        <p className="text-gray-700 font-semibold">
          Cards: {currentIndex + 1}/{chosenDeck.cards.length}
        </p>
        <button className="text-gray-700" onClick={() => closePractice()}>
          ❌ Fechar
        </button>
      </div>
      <FlashCard 
       id={id} />
    </div>
  );
}
