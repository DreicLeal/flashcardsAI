"use client";
import { ICard } from "@/context/flashCardsContext/flashCardsContextTypes";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";

export default function FlashCard({ cards }: { cards: ICard[] }) {
  const { flip, setFlip, currentIndex } = useFlashCards();
  const currentCard = cards[currentIndex];
  return(
    <div
      onClick={() => setFlip(!flip)}
      className="relative w-[90%]  max-w-sm h-[350px] flex items-center justify-center cursor-pointer bg-white border border-gray-300 rounded-lg shadow-lg p-5"
    >
      <div className="absolute bottom-0 left-0 w-full h-full bg-gray-300 rounded-lg shadow-md -z-10"></div>
      <div className="absolute bottom-2 left-2 w-full h-full bg-gray-200 rounded-lg shadow-sm -z-10"></div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        {flip ? (
          <p className="text-lg font-semibold text-gray-800 overflow-y-auto text-justify">{currentCard.definition}</p>
        ) : (
          <p className="text-lg font-semibold text-gray-800 text-center">{currentCard.term}</p>
        )}
      </div>
    </div>
  );
}
