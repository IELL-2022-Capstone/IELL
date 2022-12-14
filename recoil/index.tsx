import { atom } from "recoil";
import { History, Instance } from "../types";
import mockupData from "../mockupData";

export const historyState = atom<History>({
  key: "historyState",
  default: mockupData
});

export const dataState = atom<Instance>({
  key: "dataState",
  default: {
    fullText: "",
    resultId: -1,
    cohesion: 0,
    syntax: 0,
    vocabulary: 0,
    phraseology: 0,
    grammar: 0,
    conventions: 0
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
