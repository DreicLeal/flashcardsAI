import { Dispatch, SetStateAction } from "react";

export interface ICardsContextType {
  deckList: IDeck[];
  setDeckList: Dispatch<SetStateAction<IDeck[]>>;
  setFlip: Dispatch<SetStateAction<boolean>>;
  flip: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export type ICard = {
  id: string;
  term: string;
  definition: string;
};

export type IDeck = {
  id: string;
  name: string;
  cards: ICard[];
};
