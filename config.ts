import { Instance } from "./types";

export const LEVEL = 5;
export const DATA_LENGTH = 6;
export const VALUE = [
  "Cohesion",
  "Syntax",
  "Vocabulary",
  "Phraseology",
  "Grammer",
  "Conventions",
  "Average"
];
export const AREA_WIDTH = 350;
export const AREA_HEIGHT = 220;
export const AREA_MARGIN = {
  top: 50,
  right: 20,
  bottom: 40,
  left: 30
};
export const RADAR_HEIGHT = 200;
export const RADAR_WIDTH = 300;
export const RADER_MARGIN = {
  top: 20,
  right: 60,
  bottom: 20,
  left: 60
};

export const AVERAGE : Instance = {
  resultId : -1,
  fullText : "",
  cohesion: 3.13,
  syntax: 3.03,
  vocabulary: 3.24,
  phraseology: 3.12,
  grammar: 3.03,
  conventions: 3.08
}