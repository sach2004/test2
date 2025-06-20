import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient()
export async function POST(req) {
   try{ 
    const {title , content , id} = await req.json()

    const newNote = await prisma.note.create({
        data : {
            title : title,
            content : content , 
            userId : id
        }
    })

    return NextResponse.json(
        {message : "Note created successfullly" , note : newNote},
        {status : 201}
    )

}catch(error){
    console.log(error)
    return NextResponse.json(
        {message : "Error creating note"},
        {status : 500}
    )
}
}

export async function GET() {
    
    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                {message : "Cannot connect to the session"},
                {status : 401}
            )
        }

        const allNotes = await prisma.note.findMany({
        where:
        {
            userId : session.user.id 
        }
    })

    return NextResponse.json(allNotes)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {message : "error fetching the data"},
            {status : 500}
        )
    }
    
    
}