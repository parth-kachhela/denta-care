import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function GetPatientWithVisits(req: any, res: any) {
  const { id } = req.params;

  try {
    const patient = await client.patient.findUnique({
      where: { id },
      include: {
        visits: {
          orderBy: { visitDate: "desc" },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
