import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST /api/patients
export default async function Addpatient(req: any, res: any) {
  const { fullName, address, contact, disease, diagnosis, solution } = req.body;

  if (
    !fullName ||
    !address ||
    !contact ||
    !disease ||
    !diagnosis ||
    !solution
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newPatient = await prisma.patient.create({
      data: {
        fullName,
        address,
        contact,
        visits: {
          create: {
            disease,
            diagnosis,
            solution,
          },
        },
      },
    });

    return res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ error: "Failed to create patient." });
  }
}
