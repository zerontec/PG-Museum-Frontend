import React from "react";
import Paginate from "react-paginating";
import './styles/Pagination.css'

const Pagination = ({total, currentPage, handlePageChange}) => {

    return (
        <Paginate
        total={total}
        limit={1}
        pageCount={5}
        currentPage={currentPage}
        className="pagination"
        >
        {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
        }) => (
            <div>
                {hasPreviousPage && (
                    <button
                    className='btn-punch'
                    {...getPageItemProps({
                        pageValue: 1,
                        onPageChange: handlePageChange
                    })}>{'<<'}</button>
                )}

                {hasPreviousPage && (
                    <button
                    className='btn-step'
                    {...getPageItemProps({
                        pageValue: previousPage,
                        onPageChange: handlePageChange
                    })}
                    >{"<"}</button>
                )}
    
                {pages.map((page) => {
                    let activePage = null;
                    if (currentPage === page) {
                        activePage = { backgroundColor: "#2E86C1", color: 'white', fontWeight: 'bold',
                        padding: '8px 12px', border: '1.5px solid #2E86C1'};
                    }
                    return (
                        <button
                        className='btn-unactive'
                        {...getPageItemProps({
                            pageValue: page,
                            key: page,
                            style: activePage,
                            onPageChange: handlePageChange
                        })}>{page}</button>
                    );
                })}

    
                {hasNextPage && (
                    <button
                    className='btn-step'
                    {...getPageItemProps({
                        pageValue: nextPage,
                        onPageChange: handlePageChange
                    })}>{">"}</button>
                )}

                {hasNextPage && (
                        <button
                        className='btn-punch'
                        {...getPageItemProps({
                            pageValue: totalPages,
                            onPageChange: handlePageChange
                        })}>{'>>'}</button>
                    )
                }
    
            </div>
        )}  
      </Paginate>
    );
};

export default Pagination;