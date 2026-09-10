import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesByTagsClient from "./Notes.client";

interface NotesByTagsProps {
    params: Promise<{slug: string[]}>
}

export default async function NotesByTags({ params }: NotesByTagsProps) {
    const { slug } = await params
    // console.log(slug);

    const tag = slug[0]

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
            queryKey: ["noteQuery", {search: "", page: 1, tag}],
            queryFn: () => fetchNotes("", 1, tag),
    
    })
    
    
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesByTagsClient />
        </HydrationBoundary>
        
    )
}
