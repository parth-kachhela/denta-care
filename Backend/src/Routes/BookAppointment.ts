import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function appointment(req: any, res: any) {
  try {
    const { fullName, mobileNumber, helpWith, message, date, time } = req.body;

    // Convert string "2025-09-10" -> Date object
    const parsedDate = date ? new Date(date) : null;

    const ans = await client.appointment.create({
      data: {
        fullName,
        mobileNumber,
        helpWith,
        message,
        date: parsedDate, // ✅ Prisma expects Date object
        time, // ✅ keep time as string (slot name)
      },
    });

    res.status(200).json({
      message: "Appointment added!",
      data: ans,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}
