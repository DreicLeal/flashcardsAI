"use client";

import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";
import CreateDeckOptions from "../CreateDeckOptions";

export default function DeckList() {
  const { deckList } = useFlashCards();

  const router = useRouter();

  const pushToGame = (deckId: string) => {
    router.push(`/deckList/${deckId}`);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {deckList.map((deck) => (
          <li
            key={deck.id}
            onClick={() => pushToGame(deck.id)}
            className="cursor-pointer bg-secondary border border-secondary hover:border-primary p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold text-primary">{deck.name}</h2>
            <p className="text-sm text-gray-300">Cards: {deck.cards.length}</p>
          </li>
        ))}
      </ul>
      <h1 className="mt-10 text-2xl font-semibold text-primary">Ou crie um novo</h1>
      <div className="flex items-center w-full justify-center gap-2">
        <CreateDeckOptions />
      </div>
    </div>
  );
}
