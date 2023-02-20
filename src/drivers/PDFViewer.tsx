import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {workerSrc} from 'pdfjs-dist/build/pdf.worker.entry'

import s from './PDFViewer.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

type PDFViewerProps = {
  filePath: string
  isThumbnail?: boolean
}

export const PDFViewer = ({ filePath, isThumbnail }: PDFViewerProps) => {
  const [totalPages, setTotalPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)

  const showNavigation = totalPages > 1 && !isThumbnail

  return (
    <div className={s.wrapper}>
      {showNavigation && (
        <div>
          Page {pageNumber} of {totalPages}
        </div>
      )}
      <Document
        className={s.document}
        file={filePath}
        onLoadSuccess={({ numPages }: { numPages: number }) =>
          setTotalPages(numPages)
        }
      >
        {showNavigation && (
          <button
            className={s.button}
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
        )}
        <Page
          className={`${isThumbnail ? s.thumbnail : ''}`}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
        {showNavigation && (
          <button
            className={s.button}
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === totalPages}
          >
            Next
          </button>
        )}
      </Document>
    </div>
  )
}
