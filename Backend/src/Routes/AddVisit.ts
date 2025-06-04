import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function AddVisit(req: any, res: any) {
  const { patientId, disease, diagnosis, solution } = req.body;

  if (!patientId || !disease || !diagnosis || !solution) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const visit = await client.visit.create({
      data: {
        patientId,
        disease,
        diagnosis,
        solution,
      },
    });

    res.status(201).json({ message: "Visit recorded successfully", visit });
  } catch (err) {
    console.error("Error adding visit:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
