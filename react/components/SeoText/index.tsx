import React, { useState } from 'react'

import styles from './styles.css'

const SeoText = (props: { text: string; title: string }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  if (!props.text || !props.title) return null

  return (
    <div
      className={`${styles.seoContainer} w-100 ${
        open ? styles.active : styles.closed
      }`}
    >
      <h3 className={`${styles.seoTitle} t-heading-3`}>{props.title}</h3>
      <p className={`${styles.seoText}`}>{props.text}</p>
      <div
        className={`${styles.readBtnContainer} flex flex-row`}
        onClick={handleClick}
      >
        <p className={`${styles.readBtn}`}>
          {open ? 'Read Less' : 'Read More'}
        </p>
        <span className={`${styles.readBtnIcon}`}>{open ? '-' : '+'}</span>
      </div>
    </div>
  )
}

SeoText.schema = {
  title: 'SEO Text PDP',
  description: 'Text Edition - PDP',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      type: 'string',
    },
    text: {
      title: 'Text',
      type: 'string',
    },
  },
}

export default SeoText
