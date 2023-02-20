import React from 'react'

import { ImageViewer } from './drivers/ImageViewer'
import { PDFViewer } from './drivers/PDFViewer'
import { DOCXViewer } from './drivers/DOCXViewer'
import { UnsupportedViewer } from './drivers/Unsupported'
import s from './FileViewer.module.css'

export type FileViewerProps = {
  fileType: string
  filePath: string
  isThumbnail?: boolean
}

export const FileViewer = ({
  fileType,
  filePath,
  isThumbnail
}: FileViewerProps) => {
  const _getViewer = (props: { filePath: string; isThumbnail?: boolean }) => {
    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png': {
        return <ImageViewer {...props} />
      }
      case 'pdf': {
        return <PDFViewer {...props} />
      }
      case 'docx': {
        return <DOCXViewer {...props} />
      }
      default: {
        return <UnsupportedViewer />
      }
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.viewer}>{_getViewer({ filePath, isThumbnail })}</div>
    </div>
  )
}
