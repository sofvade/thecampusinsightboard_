import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib.db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const q = (req.query.q as string)?.toLowerCase() || "";
    const universities = await prisma.university.findMany();
    const filtered = universities.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.city.toLowerCase().includes(q) || 
      u.tags.join(" ").toLowerCase().includes(q)
    );
    return res.status(200).json(filtered);
  }
  if (req.method === "POST") {
    const body = req.body;
    const created = await prisma.university.create({ data: body });
    return res.status(201).json(created);
  }
  return res.status(405).json({ error: "Method not allowed" });
}
