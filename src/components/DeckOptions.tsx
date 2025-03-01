"use client";

import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type IDeckOptionsProps = {
  setDeckOptionsModal: Dispatch<SetStateAction<boolean>>;
  deckId: string;
};

export default function DeckOptions({
  deckId,
  setDeckOptionsModal,
}: IDeckOptionsProps) {
  const { shufflingDeck } = useFlashCards();
  const router = useRouter();

  const pushToGame = () => {
    shufflingDeck(deckId);
    router.push(`/deckList/${deckId}/flashCardsPractice`);
  };

  const pushToCards = () => {
    shufflingDeck(deckId);
    router.push(`/deckList/${deckId}/cardsView`);
  };

  const closeButton = () => {
    setDeckOptionsModal(false);
  };
const buttonStyle = "bg-primary hover:bg-accentHover text-white font-semibold px-4 py-2 rounded-lg shadow-md w-full"
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-white/25 z-20 flex items-center justify-center">
        <div className="bg-secondary p-2 mx-auto w-[200px] flex flex-col gap-2 rounded-md">
            <button className="self-end text-gray-600 hover:bg-gray-900 px-2 py-1 rounded-md" onClick={closeButton}>❌ Fechar</button>
            <button className={buttonStyle} onClick={pushToGame}>FlashCards</button>
            <button className={buttonStyle} onClick={pushToCards}>Ver Deck</button>
            <button className={buttonStyle}>Múltipla Escolha</button>
        </div>
    </div>
  );
}
