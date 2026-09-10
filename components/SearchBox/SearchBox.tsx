import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchValue: string,
  onSearch: (value: string) => void,
}

export default function SearchBox({searchValue, onSearch}: SearchBoxProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <input
      defaultValue={searchValue}
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
 />
  )
}