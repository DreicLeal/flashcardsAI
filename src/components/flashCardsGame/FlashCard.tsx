"use client";
import { ICard } from "@/context/flashCardsContext/flashCardsContextTypes";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FlashCard({ id }: { id: string }) {
  const {
    flip,
    setFlip,
    currentIndex,
    setCurrentIndex,
    setDeckList,
    deckList,
    currentPractice,
  } = useFlashCards();

  const currentCard = currentPractice[currentIndex];
  const router = useRouter();
  const [endOfPractice, setEndOfPractice] = useState(false);
  const nextCard = (cards: ICard[], memory: string) => {
    const updatedCard = {
      ...cards[currentIndex],
      lastMemory: memory,
      lastPractice: new Date(),
      learnProcess: {
        ...cards[currentIndex]?.learnProcess,
        [memory]: (cards[currentIndex]?.learnProcess?.[memory] || 0) + 1,
      },
    };

    const updatedCards = [...cards];
    updatedCards[currentIndex] = updatedCard;

    const updatedDeckList = deckList.map((deck) =>
      deck.id === id ? { ...deck, cards: updatedCards } : deck
    );

    setDeckList(updatedDeckList);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFlip(false);
    } else {
      setEndOfPractice(true);
    }
  };

  const closePractice = () => {
    setCurrentIndex(0);
    router.push("/deckList");
  };

  return (
    <div className="flex flex-col items-center gap-4 min-w-[300px]">
      <div
        onClick={() => setFlip(!flip)}
        className="relative w-[90%]  max-w-sm h-[350px] flex items-center justify-center cursor-pointer bg-white border border-gray-300 rounded-lg shadow-lg p-5"
      >
        <div className="absolute bottom-0 left-0 w-full h-full bg-gray-300 rounded-lg shadow-md -z-10"></div>
        <div className="absolute bottom-2 left-2 w-full h-full bg-gray-200 rounded-lg shadow-sm -z-10"></div>

        <div className="flex flex-col items-center justify-center w-full h-full">
          {flip ? (
            <p className="text-lg font-semibold text-gray-800 overflow-y-auto text-justify">
              {currentCard.definition}
            </p>
          ) : (
            <p className="text-lg font-semibold text-gray-800 text-center">
              {currentCard.term}
            </p>
          )}
        </div>
      </div>
      {endOfPractice ? (
        <button
          className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          onClick={closePractice}
        >
          Complete
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            onClick={() => nextCard(currentPractice, "poor")}
          >
            Não lembro
          </button>
          <button
            className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            onClick={() => nextCard(currentPractice, "fragile")}
          >
            Faço ideia
          </button>
          <button
            className="bg-accent hover:bg-accentActive text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            onClick={() => nextCard(currentPractice, "fixed")}
          >
            Lembro bem
          </button>
        </div>
      )}
    </div>
  );
}
