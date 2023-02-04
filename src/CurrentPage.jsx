import React from 'react'

import Introduction from "pages/Introduction"
import Expertise from "pages/Expertise"
import Project from "pages/Project"
import Contact from "pages/Contact"
import Comment from "pages/Comment"

import styles from './CurrentPage.module.scss'

const CurrentPage = ({pageName, device}) => {
     let page
     switch (pageName) {
          case 'Introduction':
               page = <Introduction />
               break
          case 'Expertise':
               page = <Expertise />
               break
          case 'Project':
               page = <Project />
               break
          case 'Contact':
               page = <Contact device = {device}/>
               break
          case 'Comment':
               page = <Comment />
               break
          default:
               page = <h1> {'Page is not found'} </h1>
     }

     return <div style = {{width: '100%', height: '100%'}}>
          {page}
     </div>
          
}

export default CurrentPage