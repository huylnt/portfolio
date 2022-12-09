import React from 'react'

import Introduction from "../pages/introduction-page/introduction"
import Expertise from "../pages/expertise-page/expertise"
import Project from "../pages/project-page/project"
import Contact from "../pages/contact-page/contact"
import Comment from "../pages/comment-page/comment"

const CurrentPage = ({pageName, device}) => {
     switch (pageName) {
          case 'Home':
               return <Introduction device = {device}/>
          case 'Expertise':
               return <Expertise />
          case 'Project':
               return <Project device={device}/>
          case 'Contact':
               return <Contact device = {device}/>
          case 'Comment':
               return <Comment device = {device}/>
          default:
               return <h1> {'Page is not found'} </h1>
     }
}

export default CurrentPage