import React, { useEffect, useState } from 'react'

import styles from './styles.css'

type modalNewsletter = {
  imgprofile1: string
  getoff: string
  yourfirstorder: string
  signupforour: string

  imgprofile2: string
  couponff: string
  text1: string
  buttonclose: string
}

const NewsletterModal = ({
  imgprofile1 = '/arquivos/profileimagetxt.png',
  getoff = 'GET 10% OFF',
  yourfirstorder = 'YOUR FIRST ORDER',
  signupforour = 'SIGN UP FOR OUR NEWSLETTER',
  imgprofile2 = '/arquivos/profileimagetxt.png',
  couponff = 'WELCOME10',
  text1 = 'Thank You',
  buttonclose = 'Close',
}: modalNewsletter) => {
  const [viewPopUp, setViewPopUp] = useState<boolean | null>(false)
  const [cookies, setCookies] = useState<boolean | null>(true)

  const [emailSend, setEmailSend] = useState<boolean | null>(false)
  const [email, setEmail] = useState('')

  const submit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10 json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
      }),
    }

    fetch('/api/dataentities/NL/documents', options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setEmailSend(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (document.cookie.indexOf('acceptPolicy') > 0) {
      setCookies(false)
    }

    setViewPopUp(cookies)
  }, [cookies])

  const handleClick = () => {
    document.cookie = 'acceptPolicy=true; expires=Thu, 18 Dec 2099 12:00:00 UTC'
    setViewPopUp(false)
  }

  return viewPopUp ? (
    <div className={styles.container}>
      {!emailSend ? (
        <div className={styles.box}>
          <div className={styles.transformDiv}>
            <div className={styles.buttonCloseDiv}>
              <button
                onClick={() => handleClick()}
                className={styles.buttonClose}
              ></button>
            </div>
            <div className={styles.imgDiv}>
              <img
                className={styles.profileImage}
                src={imgprofile1}
                alt="profile icon"
              />
            </div>
          </div>
          <div className={styles.divAllInfo}>
            <h1 className={styles.allInfoH1}>{getoff}</h1>
            <p className={styles.allInfoP}>{yourfirstorder}</p>
            <form className={styles.formModal} onSubmit={submit}>
              <div className={styles.divAllInfoInput}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.allInfoInput}
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
              <button type="submit" className={styles.allInfoBtn}>
                {signupforour}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.transformDiv}>
            <div className={styles.buttonCloseDiv}>
              <button
                onClick={() => handleClick()}
                className={styles.buttonClose}
              ></button>
            </div>
            <div className={styles.imgDiv}>
              <img
                className={styles.profileImage}
                src={imgprofile2}
                alt="profile icon"
              />
            </div>
          </div>
          <div className={styles.divAllInfo}>
            <h1 className={styles.allInfoH1}>{couponff}</h1>
            <p className={styles.allInfoP}>{text1}</p>
            <div className={styles.formModal} onSubmit={submit}>
              <div className={styles.divAllInfoInput}>
                <p className={styles.allInfoP}>. . .</p>
              </div>
              <button
                onClick={() => handleClick()}
                className={styles.allInfoBtn}
              >
                {buttonclose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null
}

NewsletterModal.schema = {
  title: 'Modal newsletter',
  description: 'Modal newsletter',
  type: 'object',
  properties: {
    imgprofile1: {
      title: 'profile img 01',
      description: 'profile img 01',
      type: 'string',
      default: '/arquivos/profileimagetxt.png',
    },

    getoff: {
      title: 'text getoff',
      description: 'text getoff',
      type: 'string',
      default: 'GET 10% OFF',
    },

    yourfirstorder: {
      title: 'text your first order',
      description: 'text your first order',
      type: 'string',
      default: 'YOUR FIRST ORDER',
    },

    signupforour: {
      title: 'text signupforour',
      description: 'text signupforour',
      type: 'string',
      default: 'SIGN UP FOR OUR NEWSLETTER',
    },

    imgprofile2: {
      title: 'profile img 02',
      description: 'profile img 02',
      type: 'string',
      default: '/arquivos/profileimagetxt.png',
    },

    couponff: {
      title: 'text your coupon',
      description: 'text your coupon',
      type: 'string',
      default: 'WELCOME10',
    },

    text1: {
      title: 'text your text1',
      description: 'text your text1',
      type: 'string',
      default: 'Thank You',
    },

    buttonclose: {
      title: 'text your buttonclose',
      description: 'text your buttonclose',
      type: 'string',
      default: 'Close',
    },
  },
}

export default NewsletterModal
