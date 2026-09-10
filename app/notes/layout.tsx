import SideBarNotes from "@/components/SideBar/SideBar"


interface NotesLayoutProps {
  children: React.ReactNode
}

export default function NotesLayout({ children }: NotesLayoutProps) {
    return (
        <div>
            <SideBarNotes/>
            
            {children};
        </div>
    )
}
