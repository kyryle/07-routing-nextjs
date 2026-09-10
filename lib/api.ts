import axios from "axios";
import type { Note, NoteId } from "../types/note"


const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

interface NoteData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}


export const fetchNotes = async (search: string, page: number, tag: string) => {
    try {
        const result = await axios.get<NoteHubResponse>('https://notehub-public.goit.study/api/notes', {
            params: {
                search: search,
                page: page,
                ...(tag && {tag}),
            },
            headers: {
                Authorization: `Bearer ${myKey}`
            }

        })
        // console.log(result);
        
        return result.data

    } catch (err) {
        console.log(err);
        return (
            {
                notes: [],
                totalPages: 0
            }
        )

    }

}

export const createNote = async (data: NoteData) => {
    try {
    const result = await axios.post<Note>(`https://notehub-public.goit.study/api/notes`, data, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const deleteNote = async (id: NoteId) => {
    try {
    const result = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const fetchNoteById = async (id: NoteId) => {
    try {
    const result = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    
    return result.data
    

} catch (err) {
        console.log(err);
        throw err
    }
}