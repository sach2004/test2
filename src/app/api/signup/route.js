import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export  async function POST(req) {
  try {
    const { email, password } = await req.json();


    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "User registered", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Error registering" },
      { status: 500 }
    );
  }
}
