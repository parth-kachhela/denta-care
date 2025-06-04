import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function getAllPatients(req: any, res: any) {
  const { status } = req.query;
  const appointments = await client.appointment.findMany({
    where: status ? { status: String(status) } : {},
  });
  res.json(appointments);
}
