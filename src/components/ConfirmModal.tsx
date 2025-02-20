"use client";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmModal() {
  const [deckName, setDeckName] = useState("");
  const router = useRouter();
  const { setDeckList, setModalOpen, setNewDeckData, newDeckData, modalOpen} =
    useFlashCards();

  const confirmAddition = () => {
    if (newDeckData) {
      newDeckData.name = deckName;
      setDeckList((prev) => [...prev, newDeckData]);
      setModalOpen(false);
      setNewDeckData(null);
      router.push("/deckList");
    }
  };

  const cancelAddition = () => {
    setModalOpen(false);
    setNewDeckData(null);
  };

  return (
    <div className={`${modalOpen? "block": "hidden"}`}>
      {newDeckData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:bg-gray-900 px-2 py-1 rounded-md"
              onClick={cancelAddition}
            >
              ❌ Close
            </button>
            <div>
              <input
                className="font-bold text-secondary px-2 mt-5"
                type="text"
                placeholder={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
              <div className="flex">
                <h2 className="text-xl font-bold text-center mb-4 pr-2">Nome do Deck: </h2>
                <h2 className="text-xl font-bold text-primary text-center mb-4">
                  {deckName}
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-300 text-center">
              Total Cards: {newDeckData.cards.length}
            </p>

            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
              <table className="w-full table-auto border-collapse border border-gray-600 mt-4">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-600 px-4 py-2">Termo</th>
                    <th className="border border-gray-600 px-4 py-2">
                      Definição
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newDeckData.cards.map((card) => (
                    <tr key={card.id} className="text-gray-300">
                      <td className="border border-gray-600 px-4 py-2">
                        {card.term}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {card.definition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={confirmAddition}
              className="mt-4 bg-primary hover:bg-accent-hover text-white font-semibold px-4 py-2 rounded-lg shadow-md w-full"
            >
              ✅ Confirmar Adição
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
