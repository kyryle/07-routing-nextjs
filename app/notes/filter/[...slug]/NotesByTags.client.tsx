// "use client";
// import { fetchNotes } from "@/lib/api";
// import { Note } from "@/types/note";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";

// export default function NotesByTagsClient() {
//   const { slug } = useParams<{ slug: string[] }>();

//   const tag = slug[0];

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["tagQuery", {search: "", page: 1, tag}],
//     queryFn: () => fetchNotes("", 1, tag),
//     refetchOnMount: false,
//   });

//   return (
//     <>
//       {data && (
//         <ul>
//           {data && data.notes.map((note: Note) => (
//               <li key={note.id}>{note.title}</li>
//           ))}
//         </ul>
//           )}
//           {isLoading && <p>Loading...</p>}
//           {isError && <p>an error have occured</p>}
//     </>
//   );
// }
'use client';

import css from "./notesPage.module.css"
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import Modal from "../../../../components/Modal/Modal"
import NoteForm from "../../../../components/NoteForm/NoteForm"
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { fetchNotes } from "../../../../lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Note } from "../../../../types/note"
import { useParams } from "next/navigation";

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();

  const tag = slug[0];

    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { data } = useQuery({
        queryKey: ["noteQuery", searchValue, page, tag],
        queryFn: () => fetchNotes(searchValue, page, tag),
        placeholderData: keepPreviousData,
    })
    // console.log(data);


    const handleClick = () => {
        setModalIsOpen(true)
    }

    const handleClose = () => {
        setModalIsOpen(false)
    }


    const onSearch = (value: string) => {
        setSearchValue(value)
        setPage(1)
    }

    const debouncedOnSearch = useDebouncedCallback(onSearch, 1000)

    const handlePage = (page: number) => {
        setPage(page)
    }


    const results: Note[] = data?.notes ?? []
    const totalPages = data?.totalPages ?? 0
    // console.log(data);
    // console.log(results);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox searchValue={searchValue} onSearch={debouncedOnSearch} />
                {totalPages > 1 && <Pagination totalPages={totalPages} onPageChange={handlePage} forcePage={page} />}
                <button className={css.button} onClick={handleClick}>Create note +</button>
                {results.length > 0 && <NoteList notes={results} />}
                {modalIsOpen && <Modal onClose={handleClose}>
                    <NoteForm onClose={handleClose} />
                </Modal>}

            </header>
        </div>
    )
}