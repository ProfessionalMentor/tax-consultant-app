import connectMongo from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, phone, service, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Missing name or phone number" },
        { status: 400 }
      );
    }

    await connectMongo();

    const contactRequest = await Contact.create({
      name,
      phone,
      service: service || "Other",
      message: message || "",
      status: "NEW",
    });

    return NextResponse.json(
      { 
        message: "Consultation logged successfully", 
        contact: { id: contactRequest._id } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      { message: "Internal server error saving consultation request" },
      { status: 500 }
    );
  }
}
