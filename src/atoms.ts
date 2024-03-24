import { atom, selector } from "recoil";

import a from "./img/a.jpg";
import b from "./img/b.jpg";
import c from "./img/c.jpg";
import d from "./img/d.jpg";
import e from "./img/e.jpg";
import f from "./img/f.jpg";
import g from "./img/g.jpg";
import h from "./img/h.jpg";
import i from "./img/i.jpg";

export interface IToDo {
  index: number;
  img: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const cardState = atom<IToDoState>({
  key: "card",
  default: {
    one: [
      {
        index: 1,
        img: a,
      },
      {
        index: 2,
        img: d,
      },

      {
        index: 3,
        img: g,
      },
    ],
    two: [
      {
        index: 4,
        img: b,
      },
      {
        index: 5,
        img: e,
      },
      {
        index: 6,
        img: h,
      },
    ],
    three: [
      {
        index: 7,
        img: c,
      },
      {
        index: 8,
        img: f,
      },
      {
        index: 9,
        img: i,
      },
    ],
  },
});

function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const shuffledCardState = selector<IToDoState>({
  key: "shuffledCard",
  get: ({ get }: any) => {
    const originalState = get(cardState);
    const shuffledState: IToDoState = {};
    for (const key in originalState) {
      if (Object.prototype.hasOwnProperty.call(originalState, key)) {
        shuffledState[key] = shuffleArray(originalState[key]);
      }
    }
    return shuffledState;
  },
});
