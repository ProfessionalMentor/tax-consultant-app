import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, ntnNumber, strn, cnic, businessName, businessType } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new client (use email username as default password hash)
    const bcrypt = require("bcryptjs");
    const defaultPassword = email.split("@")[0];
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const client = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        ntnNumber,
        strn,
        cnic,
        businessName,
        businessType,
        role: "CLIENT",
      },
    });

    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error("Failed to create client:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
