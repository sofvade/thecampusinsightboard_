import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib.db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "GET") {
    const uni = await prisma.university.findUnique({ where: { id: String(id) } });
    if (!uni) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(uni);
  }
  return res.status(405).json({ error: "Method not allowed" });
}
