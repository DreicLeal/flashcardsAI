"use client";
import {
  createContext,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { ICard, ICardsContextType, IDeck } from "./flashCardsContextTypes";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { IDeckAPISchema } from "@/app/api/flashcards/route";

type IFile = {
  term: string;
  definition: string;
};

const CardsContext = createContext<ICardsContextType>({} as ICardsContextType);
export default function CardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [newDeckData, setNewDeckData] = useState<IDeck | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPractice, setCurrentPractice] = useState<ICard[]>([]);
  const [deckList, setDeckList] = useState<IDeck[]>(() => {
    try {
      const storedDecks = localStorage.getItem("storedDecks");
      return storedDecks ? JSON.parse(storedDecks) : [];
    } catch (error) {
      console.error("localStorage not defined", error);
      return [];
    }
  });

  const shufflingDeck = (id: string) => {
    const deckFound = deckList.find((deck) => deck.id === id);
    if (deckFound) {
      const toShuffleCards = deckFound.cards;
      for (let i = toShuffleCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toShuffleCards[i], toShuffleCards[j]] = [
          toShuffleCards[j],
          toShuffleCards[i],
        ];
      }
      setCurrentPractice(toShuffleCards);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("storedDecks", JSON.stringify(deckList));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [deckList, currentIndex]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setModalOpen(true);
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: IFile[] = XLSX.utils.sheet_to_json(sheet);
      const newDeck: IDeck = {
        id: uuidv4(),
        name: "New Deck",
        lastPractice: null,
        cards: jsonData.map((row) => ({
          id: uuidv4(),
          term: row.term,
          definition: row.definition,
          lastMemory: null,
          lastPractice: null,
          nextPractice: new Date(),
          learnProcess: {
            poor: 0,
            fragile: 0,
            fixed: 0,
          },
        })),
      };
      setNewDeckData(newDeck);
    };
    reader.readAsArrayBuffer(file);
  };

  const decksGenerate = async (deckDescription: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: deckDescription }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data: IDeckAPISchema = await response.json();
      const completeDeckData: IDeck = {
        id: uuidv4(),
        name: "New Deck",
        lastPractice: null,
        cards: data.cards.map((card) => ({
          id: uuidv4(),
          term: card.term,
          definition: card.definition,
          lastMemory: null,
          lastPractice: null,
          nextPractice: new Date(),
          learnProcess: {
            poor: 0,
            fragile: 0,
            fixed: 0,
          },
        })),
      };
      setNewDeckData(completeDeckData);
    } catch (error) {
      console.error(error);
    } finally {
      setModalOpen(true);
      setLoading(false);
      setIsFormOpen(false);
    }
  };

  return (
    <CardsContext.Provider
      value={{
        deckList,
        setDeckList,
        flip,
        setFlip,
        currentIndex,
        setCurrentIndex,
        decksGenerate,
        handleFileUpload,
        modalOpen,
        newDeckData,
        setModalOpen,
        setNewDeckData,
        loading,
        setIsFormOpen,
        isFormOpen,
        currentPractice,
        shufflingDeck,
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
