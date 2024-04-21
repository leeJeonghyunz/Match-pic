import { atom, selector } from "recoil";

import { originalImg } from "./img";

export interface IToDo {
  index: number;
  img: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const cardState = atom<IToDoState>({
  key: "card",
  default: originalImg,
});

export const isStartAtom = atom({
  key: "start",
  default: false,
});

function shuffleArray(array: any[]) {
  const newArray = [...array]; // 받아온 array를 newArray에 복사
  for (let i = newArray.length - 1; i > 0; i--) {
    // i는 배열의 마지막 index부터 1씩 줄어들음.
    const j = Math.floor(Math.random() * (i + 1)); // j는 0부터 i-1까지의 수
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // newArray의 i번째와 j번째 교환
  }
  return newArray;
}

export const shuffledCardState = selector<IToDoState>({
  key: "shuffledCard",
  get: ({ get }: any) => {
    const originalState = get(cardState);
    const shuffledState: IToDoState = {};
    for (const key in originalState) {
      shuffledState[key] = shuffleArray(originalState[key]);
    }
    return shuffledState;
  },
});
