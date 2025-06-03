import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function getAllPatients(req: any, res: any) {
  try {
    const appointments = await client.appointment.findMany(); // sabhi rows uthai ja rahi hain
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
