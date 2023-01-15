import React, { useState, useEffect } from 'react';

import styles from 'App.module.scss'

import LoadingButton from 'components/LoadingButton'
import PageIcon from 'components/PageIcon';
import CurrentPage from 'CurrentPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Introduction')
  const [isWaiting, setIsWaiting] = useState('true')
  const [device, setDevice] = useState()
  const [visitor, setVisitor] = useState()

  const pages = ['Introduction', 'Expertise', 'Project', 'Contact', 'Comment']

  const handleResize = () => (window.innerWidth >= 1190) ? setDevice('desktop') : setDevice('mobile')

  const switchPage = (event) => {
    const pageName = event.target.getAttribute('data-page-name') || event.target.textContent

    switch (pageName) {
      case 'Introduction':
        setCurrentPage('Introduction')
        break
      case 'Expertise':
        setCurrentPage('Expertise')
        break
      case 'Project':
        setCurrentPage('Project')
        break
      case 'Contact':
        setCurrentPage('Contact')
        break
      case 'Comment':
        setCurrentPage('Comment')
        break
      default:
        console.log('Page switching failed to proceed')
        break
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    setTimeout(() => setIsWaiting(false), 3000)

    fetch(process.env.REACT_APP_LOCATION.concat(process.env.REACT_APP_LOCATION_KEY))
    .then(res => res.json())
    .then(data => setVisitor(data))

  }, [])

  if (isWaiting) {
    return (
      <>
        {visitor && <div className={styles.greeting}>
          <p> Welcome my new friend from <span>{visitor.city}</span>, {visitor.country}</p>
          <p> It may not be your <span>exact location</span>, but your browser tells me this.</p>
        </div>}

        <LoadingButton layoutHeight = '600px' height = '40px' />
      </>
    )
  }

  else if (device === 'desktop') {
      return (
        <>
          <div className={styles.appLayout}>
            <div className={styles.navigationDesktop}>
              {pages.map((page, index) => <PageIcon key={index} pageName={page} currentPage={currentPage} switchPage={switchPage} device={device} />)}
            </div>

            <img src='./avatar.jpg' id={styles.avatar} />

            <div className={styles.pageDesktop}>
              {visitor && <CurrentPage pageName={currentPage} device={device} visitor={visitor} />}
            </div>
          </div>

        </>
      )
    }

    else if (device === 'mobile') {
      return (
        <>
          <div className={styles.bannerMobile}>
            <div className={styles.avatarMobile} style = {{backgroundImage: `url('./avatar-square.jpg')`}}></div>
          </div>

          <div className={styles.navigationMobile}>
            {pages.map((page, index) => <PageIcon key={index} pageName={page} currentPage={currentPage} switchPage={switchPage} device={device} />)}
          </div>


          <div className = {styles.pageMobile}>
            {visitor && <CurrentPage pageName={currentPage} device={device} visitor={visitor} />}
          </div>
        </>
      )

    }


}





export default App;