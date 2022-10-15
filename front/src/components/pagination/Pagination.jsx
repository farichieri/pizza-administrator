import React from 'react';
import './pagination.scss';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const selectPage = (action, page) => {
    if (action === 'add' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (action === 'substract' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (action === 'select') {
      setCurrentPage(page);
    }
  };

  return (
    <div className='pagination'>
      <div className='page' onClick={() => selectPage('substract')}>
        <span>{'<'}</span>
      </div>
      {pageNumbers.map((page) => (
        <div
          key={page}
          className={page === currentPage ? 'currentPage' : 'page'}
          onClick={() => selectPage('select', page)}
        >
          <span>{page}</span>
        </div>
      ))}
      <div className='page' onClick={() => selectPage('add')}>
        <span>{'>'}</span>
      </div>
    </div>
  );
};

export default Pagination;
