import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: parseInt(params.id)
            }
        });

        if (!note) {
            return NextResponse.json(
                { message: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(note);

    } catch (error) {
        console.error("Error fetching note:", error);
        return NextResponse.json(
            { message: "Error fetching note" },
            { status: 500 }
        );
    }
}