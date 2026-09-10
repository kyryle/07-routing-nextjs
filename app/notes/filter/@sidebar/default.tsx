import Link from "next/link"
import css from "./SideBar.module.css"

type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'

export default async function SideBarNotes() {
    const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


    return (
        <ul className={css.menuList}>
  
  <li className={css.menuItem}>
    <Link href={`/notes/filter/all`} className={css.menuLink}>
      All notes
    </Link>
            </li>
            {tags.map((tag) => (
  <li className={css.menuItem} key={tag}>
    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
      {tag}
    </Link>
    </li>
            ))}
</ul>

    )
}