import React from 'react'
import './page-icon.css'

const PageIcon = ({ pageName, currentPage, switchPage, device }) => {

     let iconName = 'Home'
     switch (pageName) {
          case 'Home':
               iconName = 'fa-solid fa-house'
               break
          case 'Expertise':
               iconName = 'fas fa-award'
               break
          case 'Project':
               iconName = 'fa-solid fa-paste'
               break
          case 'Contact':
               iconName = 'fa-solid fa-address-book'
               break
          case 'Comment':
               iconName = 'fa-regular fa-comment'
               break
     }
     
     const desktop = [
          <div className ="icon-element">
               <i className={iconName}></i>
               <p>{pageName}</p>
          </div>
     ]
     const mobile = [
          <div className='page-name-text'>{pageName}</div>
     ]
     if (device == 'desktop') {
          return (pageName === currentPage)
               ? <div data-page-name={pageName} className='icon-element-active' onClick={switchPage}> {desktop} </div>
               : <div data-page-name={pageName} onClick={switchPage}> {desktop} </div>
     }
     else if (device == 'mobile') {
          return (pageName === currentPage)
               ? <div data-page-name={pageName} style={{ fontWeight: 'bold', borderBottom: '3px solid green' }} onClick={switchPage}> {mobile} </div>
               : <div data-page-name={pageName} onClick={switchPage}> {mobile} </div>
     }

}

export default PageIcon