import { forwardRef, HTMLAttributes, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { Button, IconButton } from '@calm-ui/button'

import './style.css'

type PaginationProps = {
  total?: number
  page?: number
  perPage?: number
  perPages?: number[]
  onPageChange?: (page: number) => void
  onPerPageChange?: (perPage: number) => void
}

export const Pagination = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement> & PaginationProps
>(({ total = 0, page = 1, perPage = 20, perPages = [10, 20, 50, 100], onPageChange, onPerPageChange, ...props }, ref) => {
  const totalPage = useMemo(() => {
    return Math.max(Math.ceil(total / perPage), 1)
  }, [total, perPage])

  const pager = useMemo(() => {
    let centerPage = page
    const centerCountBase = 5
    const centerCount = Math.min(totalPage - 2, centerCountBase)
    const ceilPage = Math.ceil(centerCount / 2)
    
    let centerPages: number[] = []
    
    if(totalPage > 2) {
      if(page < 1 + ceilPage) {
        centerPage = 1 + ceilPage
      } else if (page > totalPage - ceilPage) {
        centerPage = totalPage - ceilPage
      }
    
      if(centerCount < centerCountBase) {
        centerPages = Array.from({ length: centerCount }, (_, i) => i + 2)
      } else {
        centerPages = Array.from({ length: centerCount }, (_, i) => i + centerPage - Math.floor(centerCount / 2))
      }
    }

    const showPrevEllipsis = totalPage > centerCount + 2 && page > 1 + ceilPage
    const showNextEllipsis = totalPage > centerCount + 2 && page < totalPage - ceilPage

    return {
      centerPage,
      centerCount,
      ceilPage,
      centerPages,
      showPrevEllipsis,
      showNextEllipsis,
    }
  }, [page, totalPage])

  const changePerPage = (perPageNum: number) => {
    if(perPageNum === perPage) return

    onPerPageChange?.(perPageNum)
    onPageChange?.(1)
  }

  const changePage = (pageNum: number) => {
    if(pageNum === page) return

    onPageChange?.(pageNum)
  }

  useEffect(() => {
    if(page <= totalPage) return

    onPageChange?.(1)
  }, [page, totalPage])

  return <div {...props} ref={ref} className={clsx('cm-pagination', props.className)}>
    <div className='cm-pagination-perpages'>
      {
        perPages.map((pp) => <Button text={pp !== perPage} theme={pp === perPage?'primary':'default'} key={pp} onClick={() => changePerPage(pp)}>{pp}</Button>)
      }
    </div>
    <div className='cm-pagination-placeholder' aria-hidden></div>
    <div className='cm-pagination-count'>共 {total} 条</div>
    <div className='cm-pagination-pages' aria-label='pagination'>
      <IconButton disabled={page === 1} aria-label='perv page' onClick={() => changePage(page - 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"></path>
        </svg>
      </IconButton>

      <Button text={page !== 1} theme={1 === page ? 'primary' : 'default'} onClick={() => changePage(1)}>1</Button>

      {
        pager.showPrevEllipsis && <Button text theme='default' onClick={() => changePage(Math.max(pager.centerPage - pager.centerCount, 2))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path>
          </svg>
        </Button>
      }

      {
        pager.centerPages.map((p) => <Button text={page !== p} theme={p === page ? 'primary' : 'default'} onClick={() => changePage(p)} key={p}>{ p }</Button>)
      }

      {
        pager.showNextEllipsis && <Button text theme='default' onClick={() => changePage(Math.min(pager.centerPage + pager.centerCount, totalPage - 1))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path>
          </svg>
        </Button>
      }

      {
        totalPage > 1 && <Button text={page !== totalPage} theme={totalPage === page ? 'primary' : 'default'} onClick={() => changePage(totalPage)}>{ totalPage }</Button>
      }

      <IconButton disabled={page === totalPage} aria-label='next page' onClick={() => changePage(page + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"></path>
        </svg>
      </IconButton>
    </div>
  </div> 
})
