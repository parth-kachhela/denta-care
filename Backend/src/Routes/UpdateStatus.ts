import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export default async function updateStatus(req: any, res: any) {
  const { status } = req.body;
  const { id } = req.params;

  const updated = await client.appointment.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
}
