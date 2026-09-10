import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate";
// import type { ReactPaginateProps } from "react-paginate";

interface PaginationProps {
  totalPages: number,
  onPageChange: (page: number) => void
  forcePage: number
}

export default function Pagination({ totalPages, onPageChange, forcePage }: PaginationProps) {

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1
    onPageChange(nextPage)
  }
  
  

  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
        forcePage={forcePage - 1}
      />
  )
}