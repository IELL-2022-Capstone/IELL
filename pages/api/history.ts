// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NumberLike } from "@visx/scale";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = [string, ...number[]];
function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const data: Data[] = [
    ["string", 0.5, 5, 3, 4, 2.5, 4.3],
    ["string", 0.8, 2, 3, 4, 3, 5]
  ];
  res.status(200).json(JSON.stringify(data));
}
export default handler;
