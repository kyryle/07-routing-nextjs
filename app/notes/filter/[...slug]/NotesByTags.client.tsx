"use client";
import { fetchNotesByTags } from "@/lib/api";
import { Note } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NotesByTagsClient() {
  const { slug } = useParams<{ slug: string[] }>();

  const tag = slug[0];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tagQuery"],
    queryFn: () => fetchNotesByTags(tag),
    refetchOnMount: false,
  });

  return (
    <>
      {data && (
        <ul>
          {data && data.notes.map((note: Note) => (
              <li key={note.id}>{note.title}</li>
          ))}
        </ul>
          )}
          {isLoading && <p>Loading...</p>}
          {isError && <p>an error have occured</p>}
    </>
  );
}
