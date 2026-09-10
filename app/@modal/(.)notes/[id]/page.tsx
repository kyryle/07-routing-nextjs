'use client';

import Modal from "../../../../components/Modal/Modal"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetails from "./NotePreview.client"
import { useParams, useRouter } from "next/navigation";


export default function ModalNote() {
    const { id } = useParams<{ id: string }>();
    const route = useRouter()

    const queryClient = new QueryClient()

    const handleClose = () => {
        route.back()
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Modal onClose={handleClose}>
                <NoteDetails id={id} />
            </Modal>
        </HydrationBoundary>
            )
}