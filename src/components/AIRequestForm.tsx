"use client";
import { useFlashCards } from "@/context/flashCardsContext/flashcardsGameContext";
import { FormEvent, useState } from "react";

export default function AIRequestForm() {
  const { decksGenerate, loading } = useFlashCards();

  const [requestInput, setRequestInput] = useState("");
  const decksAIRequest = (e: FormEvent) => {
    e.preventDefault();
    decksGenerate(requestInput);
  };
  return (
    <div className="bg-secondary h-[200px] justify-center p-4 flex flex-col items-center gap-4 rounded-md">
      <h2 className="text-primary font-semibold text-2xl">
        Descreva o assunto
      </h2>
      <form
        onSubmit={(e) => decksAIRequest(e)}
        className="w-fit flex flex-col gap-4 items-center"
      >
        <input
          className="text-black outline-0 p-2 rounded-md"
          type="text"
          value={requestInput}
          onChange={(e) => setRequestInput(e.target.value)}
        />
        <button
          className="px-4 w-[200px] py-2 rounded-md hover:bg-accentHover transition duration-300"
          type="submit"
        >
          {loading ? "Pensando✨" : "✨Enviar solicitação"}
        </button>
      </form>
    </div>
  );
}
