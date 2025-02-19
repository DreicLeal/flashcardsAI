"use client";

import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";

export default function DeckList() {
  const { deckList } = useFlashCards();

  const router = useRouter();

  const pushToGame = (deckId: string) => {
    router.push(`/deckList/${deckId}`);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deckList.map((deck) => (
          <li
            key={deck.id}
            onClick={() => pushToGame(deck.id)}
            className="cursor-pointer bg-secondary hover:bg-secondary-hover p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold text-primary">{deck.name}</h2>
            <p className="text-sm text-gray-300">Cards: {deck.cards.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
