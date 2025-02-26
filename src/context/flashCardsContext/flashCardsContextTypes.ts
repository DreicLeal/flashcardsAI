import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface ICardsContextType {
  deckList: IDeck[];
  setDeckList: Dispatch<SetStateAction<IDeck[]>>;
  setFlip: Dispatch<SetStateAction<boolean>>;
  flip: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  decksGenerate: (deckDescription: string) => Promise<void>;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  newDeckData: IDeck | null;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setNewDeckData: Dispatch<SetStateAction<IDeck | null>>;
  loading: boolean;
  setIsFormOpen: (value: SetStateAction<boolean>) => void;
  isFormOpen: boolean;
  shufflingDeck: (id: string) => void
  currentPractice: ICard[]
}

type ILearnProcess = {
  [key: string]: number;
};

export type ICard = {
  id: string;
  term: string;
  definition: string;
  lastMemory: string | null;
  lastPractice: Date | null;
  nextPractice: Date;
  learnProcess: ILearnProcess;
};

export type IDeck = {
  id: string;
  name: string;
  cards: ICard[];
  lastPractice: Date | null;
};
