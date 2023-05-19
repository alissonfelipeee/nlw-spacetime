'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    files[0].type.startsWith('image')
      ? setPreviewType('image')
      : setPreviewType('video')

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />

      {preview &&
        (previewType === 'image' ? (
          // eslint-disable-next-line
          <img
            src={preview}
            alt="Preview da mídia selecionada"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          <video
            src={preview}
            className="aspect-video w-full rounded-lg object-cover"
            controls
          />
        ))}
    </>
  )
}
