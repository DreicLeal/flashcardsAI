"use client";

import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";
import CreateDeckOptions from "../CreateDeckOptions";
import { ICard } from "@/context/flashCardsContext/flashCardsContextTypes";

export default function DeckList() {
  const { deckList, shufflingDeck } = useFlashCards();

  const router = useRouter();

  const pushToGame = (deckId: string) => {
    shufflingDeck(deckId)
    router.push(`/deckList/${deckId}`);
  };

  //fazer a partir de decklist e incluir useEffect
  const fixContentRate = (cards: ICard[]) => {
    let highScore = 0;
    cards.map((card) => card.lastMemory === "fixed" && highScore++);
    const rate = ((highScore / cards.length) * 100).toFixed(0);
    console.log(rate)
    return rate;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {deckList.map((deck) => (
          <li
            key={deck.id}
            onClick={() => pushToGame(deck.id)}
            className="relative cursor-pointer bg-secondary border border-secondary hover:border-primary p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold text-primary">{deck.name}</h2>
            <p>Cards: {deck.cards.length}</p>
            <p className="text-sm">Fixação: {fixContentRate(deck.cards)}/100</p>
            <div>

            <div
              className="absolute left-0 rounded-b-md bottom-0 w-full h-[4px] bg-accentActive"
            
            ></div>
            <div
              className="absolute left-0 rounded-b-md bottom-0 h-[4px] bg-primary"
              style={{ width: `${fixContentRate(deck.cards)}%` }}
            ></div>
            </div>
          </li>
        ))}
      </ul>
      <h1 className="mt-10 text-2xl font-semibold text-primary">
        Ou crie um novo
      </h1>
      <div className="flex items-center w-full justify-center gap-2">
        <CreateDeckOptions />
      </div>
    </div>
  );
}
