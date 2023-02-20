import React from 'react'

import s from './ImageViewer.module.css'

type ImageViewerProps = {
  filePath: string
  isThumbnail?: boolean
}

export const ImageViewer = ({ filePath, isThumbnail }: ImageViewerProps) => {
  return (
    <div className={s.wrapper}>
      <img
        className={`${s.image} ${isThumbnail ? s.thumbnail : ''}`}
        src={filePath}
        alt="Work sample image"
      />
    </div>
  )
}
