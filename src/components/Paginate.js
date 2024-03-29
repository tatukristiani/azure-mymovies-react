import ReactPaginate from "react-paginate";
import '../styles/Paginate.css';
import React from "react";

/**
 * Paginate for the movies.
 * @param onPageChange event that is passed on the ReactPaginate component.
 * @returns {JSX.Element} ReactPaginate component with some hardcoded attributes except the onPageChange.
 * @constructor Creates Paginate component which is really a Reacts ReactPaginate.
 */
const Paginate = ({ onPageChange, currentPage }) => {

    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={100}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            forcePage={parseInt(currentPage - 1)}
        />
    )
}

export default Paginate;