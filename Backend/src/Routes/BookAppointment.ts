import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function appointment(req: any, res: any) {
  const fullName = req.body.fullName;
  const mobileNumber = req.body.mobileNumber;
  const helpWith = req.body.helpWith;
  const message = req.body.message;
  const ans = await client.appointment.create({
    data: {
      fullName: fullName,
      mobileNumber: mobileNumber,
      helpWith: helpWith,
      message: message,
    },
  });
  if (!ans) {
    res.status(500).json({
      message: "some internal server error",
    });
  }
  if (ans) {
    res.status(200).json({
      message: "appoitment added..!",
    });
  }
}
