import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

// interface NotesByTagsProps {
//     params: Promise<{slug: string[]}>
// }

export default async function NotesByTags() {
    // const { slug } = await params
    // console.log(slug);

    // const tag = slug[0]

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
            queryKey: ["noteQuery", {search: "", page: 1}],
            queryFn: () => fetchNotes("", 1, ""),
    
    })
    
    
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
        
    )
}
