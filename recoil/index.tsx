import { atom, selector } from "recoil";

export const historyState = atom({
  key: "historyState",
  default: {
    text: [
      "hello world 1",
      "hello world 2",
      "hello world 3",
      "hello world 4",
      "hello world 5",
      "hello world 6",
      "hello world 7",
      "hello world 8",
      "hello world 9",
      "hello world 10"
    ],
    cohesion: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    syntax: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0],
    vocabulary: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0],
    phraseology: [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0],
    grammar: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    conventions: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0]
  }
});

export const tooltipState = atom({
  key: "tooltipState",
  default: false
});

export const inputState = atom({
  key: "inputState",
  default: ""
});

export const valueState = atom({
  key: "valueState",
  default: ""
});

export const currentIdState = atom({
  key: "currentIdState",
  default: -1
});
