"use client";
import { createContext, useContext, useState } from "react";
import { ICardsContextType, IDeck } from "./flashCardsContextTypes";

const CardsContext = createContext<ICardsContextType | undefined>(undefined);
export default function CardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <CardsContext.Provider
      value={{
        deckList,
        setDeckList,
        flip,
        setFlip,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export const useFlashCards = () => {
  const context = useContext(CardsContext);
  if (!context) throw new Error("useFlashCards must be used within a Provider");
  return context;
};
