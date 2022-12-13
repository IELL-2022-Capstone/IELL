// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NumberLike } from "@visx/scale";
import type { NextApiRequest, NextApiResponse } from "next";
// import { data } from "../../data/data.js";
// console.log(data);
// type Data = {
//   text_id: null;
//   full_text: string;
//   cohesion: number;
//   syntax: number;
//   vocabulary: number;
//   phraseology: number;
//   grammar: number;
//   conventions: number;
// };
// type Data = {
//   cohesion: number;
//   syntax: number;
//   vocabulary: number;
//   phraseology: number;
//   grammar: number;
//   conventions: number;
// };

function handler(req: NextApiRequest, res: NextApiResponse<number[][]>) {
  const data = [
    [0.5, 5, 3, 4, 2.5, 4.3],
    [0.8, 2, 3, 4, 3, 5]
  ];
  res.status(200).json(data);
}
export default handler;
