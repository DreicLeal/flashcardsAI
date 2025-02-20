"use client";
import { createContext, useContext, useState, ChangeEvent } from "react";
import { ICardsContextType, IDeck } from "./flashCardsContextTypes";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

type IFile = {
  term: string;
  definition: string;
};

const CardsContext = createContext<ICardsContextType | undefined>(undefined);
export default function CardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [newDeckData, setNewDeckData] = useState<IDeck | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      const newDeck = {
        id: uuidv4(),
        name: "New Deck",
        cards: jsonData.map((row) => ({
          id: uuidv4(),
          term: row.term,
          definition: row.definition,
        })),
      };
      setNewDeckData(newDeck);
    };
    reader.readAsArrayBuffer(file);
  };

  const decksGenerate = async (deckDescription: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: deckDescription }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data: IDeck = await response.json();
      setNewDeckData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setModalOpen(true);
      setLoading(false)
      setIsFormOpen(false)
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
        isFormOpen
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
