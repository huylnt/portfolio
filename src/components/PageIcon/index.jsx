import React, {memo} from 'react'
import {HiOutlinePresentationChartLine} from 'react-icons/hi'
import {GiAlliedStar} from 'react-icons/gi'
import {AiOutlineProject, AiOutlineContacts} from 'react-icons/ai'
import {BiCommentEdit} from 'react-icons/bi'

import styles from './index.module.scss'

const PageIcon = ({ pageName, currentPage, switchPage, device }) => {

     let icon
     switch (pageName) {
          case 'Introduction':
               icon = <HiOutlinePresentationChartLine data-page-name = {pageName} />
               break
          case 'Expertise':
               icon = <GiAlliedStar data-page-name = {pageName} />
               break
          case 'Project':
               icon = <AiOutlineProject data-page-name = {pageName} />
               break
          case 'Contact':
               icon = <AiOutlineContacts data-page-name = {pageName} />
               break
          case 'Comment':
               icon = <BiCommentEdit data-page-name = {pageName} />
               break
     }
     
     const desktop = [
          <div className = {styles.routeLayoutIcon}>
               { React.cloneElement(icon, { className: styles.icon }) }
               <p>{pageName}</p>
          </div>
     ]

     const mobile = [
          <div className = {styles.routeLayoutText}>{pageName}</div>
     ]

     if (device == 'desktop') {
          return (pageName === currentPage)
               ? <div data-page-name={pageName} className = {styles.activeDesktop}>{desktop}</div>
               : <div data-page-name={pageName} onClick={switchPage} style = {{position: 'relative'}}>
                    <div className = {styles.hoverDesktop}>{desktop}</div>
               </div>
     }

     else if (device == 'mobile') {
          return (pageName === currentPage)
               ? <div data-page-name={pageName} className = {styles.activeMobile} onClick={switchPage}>{mobile}</div>
               : <div data-page-name={pageName} onClick={switchPage}>{mobile}</div>
     }

}

export default memo(PageIcon)