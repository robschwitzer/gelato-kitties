import { useContext, useRef } from "react";
import { CryptoKitty } from "../../types";
import ListContext from "../context/listContext";

interface Props {
  item: CryptoKitty;
  tabIndex: number;
}

const colors: string[] = [
  "#9333ea",
  "#6366f1",
  "#0ea5e9",
  "#fde047",
  "#fb923c",
  "#f43f5e",
  "#6b7280",
];

function Card({ item, tabIndex }: Props) {
  const { loading } = useContext(ListContext);
  const background = useRef(
    colors[Math.floor(Math.random() * colors.length)]
  ).current;

  if (loading || !Object.keys(item).length) {
    return (
      <div className="rounded-md shadow-md h-[300px] overflow-hidden relative bg-gray-50 dark:bg-[#32353a] animate-pulse transition-all">
        <div className="h-4/6 w-full animate-pulse" style={{ background }} />
        <div className="absolute h-[100px] w-[100px] bg-gray-50 dark:bg-[#04111d] shadow rounded-md left-10 bottom-8 animate-pulse" />
      </div>
    );
  }

  function onClick(): void {
    window.open(`https://www.cryptokitties.co/kitty/${item.id}`, "_blank");
  }

  return (
    <div
      onClick={onClick}
      tabIndex={tabIndex}
      className="rounded-md shadow-md h-[300px] cursor-pointer overflow-hidden relative bg-gray-50 dark:bg-[#32353a] hover:bg-sky-100 hover:scale-[1.01] dark:hover:bg-gray-700 transition-all"
    >
      <img
        src={item.image_url_cdn}
        alt="CryptoKitty"
        className="h-4/6 w-full"
        style={{ background }}
      />
      <div className="absolute left-10 bottom-8 flex flex-row items-center">
        <img
          src={item.image_url_cdn}
          alt="CryptoKitty Icon"
          className="h-[100px] w-[100px] bg-gray-50 dark:bg-[#32353a] shadow rounded-md"
        />
        <h1 className="ml-4 mt-6 text-xl font-bold">{item.name}</h1>
      </div>
    </div>
  );
}

export default Card;
