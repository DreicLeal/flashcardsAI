"use client";

import ViewCard from "@/components/ViewCard";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";

export default function ViewClient({ id }: { id: string }) {
  const { deckList, setDeckList } = useFlashCards();

  const router = useRouter();
  const chosenDeck = deckList.find((deck) => deck.id === id);
  if (!chosenDeck) throw new Error("Deck not found");

  const pushTo = (path: string) => {
    router.push(path);
  };

  const deleteCard = (cardId: string) => {
    const updatedDeck = chosenDeck.cards.filter((card) => card.id !== cardId);
    setDeckList((prev) =>
        prev.map((deck) => 
         deck.id === chosenDeck.id 
        ?{...deck, cards: [...updatedDeck]}
        :deck       
        )
    );
  };
  const buttonStyle =
    "bg-primary hover:bg-accentHover text-white font-semibold p-2  rounded-lg shadow-md";
  return (
    <div>
      <div className="flex justify-between p-2">
        <button className={buttonStyle} onClick={() => pushTo("/deckList")}>
          Voltar
        </button>
        <button className={buttonStyle}>Adicione</button>
        <button
          className={buttonStyle}
          onClick={() => pushTo(`/deckList/${id}/flashCardsPractice`)}
        >
          Game
        </button>
      </div>
      <ul className="p-2 flex flex-col gap-2">
        {chosenDeck.cards.map((card) => (
        <ViewCard key={card.id} card={card} deleteCard={deleteCard}/>
        ))}
      </ul>
    </div>
  );
}
