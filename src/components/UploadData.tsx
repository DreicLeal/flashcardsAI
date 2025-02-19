"use client";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useState } from "react";
import { IDeck } from "@/context/flashCardsContext/flashCardsContextTypes";
import ConfirmModal from "./ConfirmModal";

type IFile = {
  term: string;
  definition: string;
};

export default function UploadData() {
  const [newDeckData, setNewDeckData] = useState<IDeck | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setModalOpen(true);
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) return;
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
      console.log(newDeck);
      setNewDeckData(newDeck);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={(e) => handleFileUpload(e)} />
      {modalOpen && (
        <ConfirmModal
          newDeckData={newDeckData}
          setModalOpen={setModalOpen}
          setNewDeckData={setNewDeckData}
        />
      )}
    </div>
  );
}
