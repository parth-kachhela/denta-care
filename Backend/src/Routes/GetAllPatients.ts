import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function GetAllPatients(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    return res.status(500).json({ error: "Failed to fetch patients" });
  }
}
