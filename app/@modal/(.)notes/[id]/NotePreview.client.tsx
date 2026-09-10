"use client";

import { useQuery } from "@tanstack/react-query"
import css from "../../../../components/NoteList/NoteList.module.css"
import { fetchNoteById } from "@/lib/api"

interface NoteDetailsProps {
  id: string
}


export default function NoteDetails({id}: NoteDetailsProps) {

 const {data: note, isError } = useQuery({
          queryKey: ["singleNote", id],
          queryFn: () => fetchNoteById(id),
          refetchOnMount: false,
 })
  if (isError || !note) {
    return <p>заметка не найдена</p>
  }
  
    return (
        <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <p className={css.content}>was created at: {note.createdAt}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
            </div>
          </li>
    )
}