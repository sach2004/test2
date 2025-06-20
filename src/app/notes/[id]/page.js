"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotesDetail(){

    const params = useParams()
    const noteId = params.id

    const [note , setNote] = useState(null)


    useEffect(() => {
      async function fetchNote() {
        try {
            const result = await axios.get(`/api/singleNote/${noteId}`)

        setNote(result.data)
        } catch (error) {
            console.log(error)
        }  
      }

      fetchNote()
    }, [])
    

    return(
        <div>
            <h1>{note.title}</h1>
            <h2>{note.content}</h2>
        </div>
    )
}