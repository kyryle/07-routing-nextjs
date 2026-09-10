

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api"
import NoteDetails from "./NotePreview.client"

interface SingleNoteDetailsProps {
    params: Promise<{id: string}>
}

export default async function ModalNote({ params }: SingleNoteDetailsProps) {
    const { id } = await params 

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["singleNote", id],
        queryFn: () => fetchNoteById(id),

    })

    

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails id={id} />
        </HydrationBoundary>
            )
}