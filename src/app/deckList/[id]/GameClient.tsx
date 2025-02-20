"use client";

import FlashCard from "@/components/flashCardsGame/FlashCard";
import { ICard } from "@/context/flashCardsContext/flashCardsContextTypes";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";

export default function GameClient({ id }: { id: string }) {
  const { deckList, currentIndex, setCurrentIndex,setFlip } = useFlashCards();
  const router = useRouter();
  const nextCard = (cards: ICard[]) => {

    if (currentIndex < cards.length - 1) {
      setFlip(false)
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const closePractice = () => {
    setCurrentIndex(0);
    router.push("/deckList");
  };

  const chosenDeck = deckList.filter((deck) => deck.id === id)[0];
  return (
    <div className="flex flex-col p-2 gap-4 items-center">
      <div className="flex justify-between items-center w-full max-w-lg bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          {chosenDeck.name}
        </h2>
        <p className="text-gray-700 font-semibold">
          Cards: {currentIndex + 1}/{chosenDeck.cards.length}
        </p>
      </div>
      <FlashCard cards={chosenDeck.cards} />
      {currentIndex + 1 === chosenDeck.cards.length ? (
        <button
          className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          onClick={closePractice}
        >
          Complete
        </button>
      ) : (
        <button
          className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          onClick={() => nextCard(chosenDeck.cards)}
        >
          Next
        </button>
      )}
    </div>
  );
}
