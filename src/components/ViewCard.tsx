"use client";

import { ICard } from "@/context/flashCardsContext/flashCardsContextTypes";
import { useState } from "react";

type IViewCardProps = {
  card: ICard;
  deleteCard: (cardId: string) => void;
};
const buttonStyle =
  "text-5xl hover:bg-accentActive w-[80px] h-[80px] transition duration-300 rounded-md";

export default function ViewCard({ card, deleteCard }: IViewCardProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <li key={card.id} className="bg-secondary rounded-md">
      <div className="bg-accent p-1 text-secondary flex justify-between items-center">
        <h2 className="font-semibold">{card.term}</h2>
        <p className="text-sm">Última lembrança: {card.lastMemory}</p>
        <button className="w-[80px]" onClick={() => setDeleteModal(prev => !prev)}>
          {deleteModal ? "cancelar" : "deletar"}
        </button>
      </div>
      <div className="p-1 h-[150px] overflow-auto">
        {deleteModal ? (
          <div className="flex flex-col items-center">
            <h2 className="font-bold">
              Tem certeza que deseja deletar esse card?
            </h2>
            <div className="flex items-center justify-evenly w-[90%]">
              <button
                onClick={() => deleteCard(card.id)}
                className={`${buttonStyle}`}
              >
                🗑️
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className={`flex items-center justify-center ${buttonStyle}`}
              >
                ❌
              </button>
            </div>
          </div>
        ) : (
          <p>{card.definition}</p>
        )}
      </div>
    </li>
  );
}
