import { useEffect } from 'react'
import mammoth from 'mammoth/mammoth.browser'

import s from './DOCXViewer.module.css'

type DOCXViewerProps = {
  filePath: string
  isThumbnail?: boolean
}

export const DOCXViewer = ({ filePath, isThumbnail }: DOCXViewerProps) => {
  const id = `${filePath}${isThumbnail ? '-thumb' : ''}`

  const renderDoc = async (response: Response) => {
    const wrapperEl = document.getElementById(id)
    try {
      const res = await mammoth.convertToHtml({
        arrayBuffer: response
      })
      const docEl = document.createElement('div')
      docEl.innerHTML = res.value
      if (wrapperEl) {
        wrapperEl.innerHTML = docEl.outerHTML
      }
    } catch (e: any) {
      if (wrapperEl) {
        wrapperEl.innerHTML = e.message
      }
    }
  }

  useEffect(() => {
    const jsonFile = new XMLHttpRequest()
    jsonFile.open('GET', filePath, true)
    jsonFile.send()
    jsonFile.responseType = 'arraybuffer'
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        renderDoc(jsonFile.response)
      }
    }
  }, [])

  return (
    <div id={id} className={`${s.wrapper} ${isThumbnail ? s.thumbnail : ''}`}>
      <div className={s.loading}>Loading document...</div>
    </div>
  )
}
