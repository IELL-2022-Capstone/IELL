// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NumberLike } from "@visx/scale";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = [string, ...number[]];
function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const data = {};
  res.status(200).json(JSON.stringify(data));
}
export default handler;
