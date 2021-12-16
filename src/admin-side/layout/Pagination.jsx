import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div id="pagination">
            <ul className="content-pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? ' active' : ' '}>
                        <span onClick={e => paginate(number)} className="page-link">
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default Pagination;