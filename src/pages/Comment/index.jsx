import { useState, useEffect, useContext, useLayoutEffect } from "react"
import { Context } from "context"
import CommentButton from "./components/CommentButton"
import CommentCard from "./components/CommentCard"

import LoadingButton from "components/LoadingButton"
import Dialog from "components/Dialog"

import { HiOutlineUser } from 'react-icons/hi'

import styles from './index.module.scss'



const Comment = () => {
   const globalState = useContext(Context)
   const { visitor, commentHistory, setCommentHistory } = globalState

   const [personalComment, setPersonalComment] = useState(null)

   const [isFetching, setIsFetching] = useState(false)
   const [hadPosted, setHadPosted] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [reload, setReload] = useState(0)
   const [dialog, setDialog] = useState({})

   useEffect(() => {

      const commentAuthor = localStorage?.getItem('commentAuthor')
      const commentContent = localStorage?.getItem('commentContent')

      if (commentAuthor && commentContent) {
         setPersonalComment(personalComment => ({author: commentAuthor, content: commentContent}))
         setHadPosted(true)

      }
      else {
         fetch(process.env.REACT_APP_MY_SERVER.concat('/comment/').concat(visitor['ip_address']))
         .then(res => res.json())
         .then(obj => {
            if (obj.msg !== null) {
               localStorage.setItem('commentAuthor', obj.msg.author)
               localStorage.setItem('commentContent', obj.msg.content)
               setPersonalComment(obj.msg)
               setHadPosted(true)
            }
         })
      }
      

      if (commentHistory.length < 1) {
         fetch(process.env.REACT_APP_MY_SERVER.concat('/comment')).then(res => res.json()).then(obj => {
            const tempCommentHistory = obj.msg.filter(comment => comment.author != localStorage?.getItem('commentAuthor'))
            setCommentHistory([...tempCommentHistory, {
               author: 'Virtual assistant',
               content: 'There is nothing else here.'
            }])
         })
      }

   }, [reload])

   const handleReload = () => {
      
      setDialog({})

      setHadPosted(false)
      setIsEditing(false)
      setIsFetching(false)

      setReload(reload + 1)
   }

   const handleDialog = (type, message, waitToRemove) => {
      setDialog({ type, message })
      if (waitToRemove) setTimeout(() => setDialog({}), 5000)
   }

   const handleSubmit = () => {
      const author = document.getElementById(styles.author).value;
      const content = document.getElementById(styles.content).value;

      if (!author || !content) handleDialog('caution', 'Oh, you have missed filling out the require information field.', true)
      else if (author.length < 6) handleDialog('caution', 'Oh, your name is quite short. May you provide more details?', true)
      else if (author.length > 30) handleDialog('caution', 'Oh, your name is quite long. May you shorten it so that we can remember it easier?', true)
      else if (content.length < 16) handleDialog('caution', 'Oh, you comment is not specific enough. I am waiting for more of your feeling now.', true)
      else if (content.length > 200) handleDialog('caution', 'Oh, your comment is valuable but quite long. Please help me summarize it.', true)
    
      else {
         setIsFetching(true)
         if (isEditing) {
            if (author === personalComment.author && content === personalComment.content) {
               setIsFetching(false)
               handleDialog('caution', 'Oh, you have not changed anything.', true)
               return
            }
         }
         fetch(process.env.REACT_APP_LANGUAGE_DETECTION.concat(content), {
            method: 'POST',
            headers: {
               "Authorization": "Bearer " + process.env.REACT_APP_LANGUAGE_DETECTION_KEY
            },
         })
         .then(res => res.json()).then(res => {
            return {
               language: res.data.detections[0].language,
               confidence: res.data.detections[0].confidence
            }
         })
         .then(({language, confidence}) => {
            if (language !== 'en' || confidence < 8) {
               setIsFetching(false)
               handleDialog('caution', 'Oops, your comment may not be English. Please be more accurate.', true)
            }
            else {
               localStorage.setItem('commentAuthor', author)
               localStorage.setItem('commentContent', content)
               if (!hadPosted) {
                  fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
                     method: "POST",
                     headers: { "Content-type": "application/json; charset=UTF-8" },
                     body: JSON.stringify({
                        visitor: visitor['ip_address'],
                        author,
                        content
                     }),
                  })
                  .then(response => response.json())
                  .then(obj => {
                     handleDialog('success', 'Great, your comment has been posted.', false)
                     setTimeout(handleReload, 2000)
                  })
                  .catch(err => handleDialog('danger', 'Oh sorry, the server may not be available currently.', true))
               }
               
               else fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
                  method: "PUT",
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                  body: JSON.stringify({
                     visitor: visitor['ip_address'],
                     author,
                     content
                  }),
               })
               .then(response => response.json())
               .then(obj => {
                  handleDialog('success', 'Great, your comment has been modified.', false)
                  setTimeout(handleReload, 2000)
               })
               .catch(err => handleDialog('danger', 'Oh sorry, the server may not be available currently.', true))
            }
         })
      }

   }

   const handleEdit = () => {
      setIsEditing(true)
   }

   const handleDelete = () => {
      setIsFetching(true)
      
      localStorage.removeItem('commentAuthor')
      localStorage.removeItem('commentContent')

      fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
         method: "DELETE",
         headers: { "Content-type": "application/json; charset=UTF-8" },
         body: JSON.stringify({
            visitor: visitor['ip_address'],
         }),
      })
      .then(response => response.json())
      .then(obj => {
         handleDialog('success', 'You have deleted your comment successfully.')
         setTimeout(handleReload, 2000)
      })
      .catch(err => handleDialog('danger', 'Oh sorry, the server may not be available currently.'))
   }

   const handleCancel = () => {
      setIsEditing(false)
   }


   return <div style={{ width: '100%', height: 'inherit' }}>

      <p> Comment history </p>
      <div className={styles.commentArea}>
         {commentHistory.length < 1 && <LoadingButton layoutHeight='300px' height = '40px' />}
         {commentHistory.map((comment, index) => <CommentCard key = {index} {...comment} />)}
      </div>

      <p> Write your own comment </p>
      <div>
         <label style={{ position: 'relative' }}>
            {!hadPosted && <input id={styles.author} type='text' placeholder="Type your name here" />}
            {hadPosted && !isEditing && <input id={styles.author} type='text' placeholder={personalComment.author} disabled/>}
            {isEditing && <input id={styles.author} type='text' defaultValue={personalComment.author} />}
            <HiOutlineUser className={styles.icon} />
         </label>


         {!hadPosted && <textarea id={styles.content} placeholder='Write your comment here'></textarea>}
         {hadPosted && !isEditing && <textarea id={styles.content} placeholder={personalComment.content} disabled></textarea>}
         {isEditing && <textarea id={styles.content} defaultValue = {personalComment.content}></textarea>}


         {!hadPosted && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='submit' handleSubmit={handleSubmit} isFetching = {isFetching} />
         </div>}

         {hadPosted && !isEditing && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='delete' handleDelete={handleDelete} isFetching = {isFetching} />
            <CommentButton type='edit' handleEdit={handleEdit} />
            <CommentButton type='submit' />
         </div>}

         {isEditing && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='cancel' handleCancel={handleCancel} />
            <CommentButton type='submit' handleSubmit={handleSubmit} isFetching = {isFetching} />
         </div>}

      </div>



   </div>
}

export default Comment