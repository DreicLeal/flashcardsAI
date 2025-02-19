import GameClient from "./GameClient";

type IParams = {
  id: string;
};

export default async function FlashCardsGame({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { id } = await params;

  return <GameClient id={id}/>
}
