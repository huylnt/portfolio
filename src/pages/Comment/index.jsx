import { useState, useEffect } from "react"

import CommentButton from "./components/CommentButton"
import CommentCard from "./components/CommentCard"

import LoadingButton from "components/LoadingButton"
import Dialog from "components/Dialog"

import { HiOutlineUser } from 'react-icons/hi'

import styles from './index.module.scss'

const Comment = ({ visitor }) => {
   const [isWaiting, setIsWaiting] = useState(true)
   const [isFetching, setIsFetching] = useState(false)
   const [commentHistory, setCommentHistory] = useState([])
   const [personalComment, setPersonalComment] = useState(null)
   const [hadPosted, setHadPosted] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [reload, setReload] = useState(0)
   const [dialog, setDialog] = useState({})

   useEffect(() => {
      let _id;
      fetch(process.env.REACT_APP_MY_SERVER.concat('/welcome'), {
         method: "POST",
         headers: { "Content-type": "application/json; charset=UTF-8" },
         body: JSON.stringify({
            visitor: visitor['ip_address'],
         }),
      })


      fetch(process.env.REACT_APP_MY_SERVER.concat('/comment/').concat(visitor['ip_address']))
      .then(res => res.json())
      .then(obj => {
          setPersonalComment(obj.msg)
         if (obj.msg !== null) {
            setHadPosted(true)
            _id = obj.msg['_id']
         }
      })
      .then(() => {
         fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'))
         .then(res => res.json())
         .then(obj => {
            let tempCommentHistory
            if (obj.msg.length > 0) tempCommentHistory = obj.msg.filter(e => e['_id'] != _id)
            setCommentHistory([...tempCommentHistory, {
               author: 'Virtual assistant',
               content: 'There is nothing else here.'
            }])
            setIsWaiting(false)
         })
      })
      .catch(() => {
         setIsWaiting(false)
         handleDialog('danger', 'Oh sorry, the server may be offline currently.', true)
      })

   }, [reload])

   const handleReload = () => {
      setReload(reload + 1)
      setDialog({})
      setCommentHistory(commentHistory.splice(0, commentHistory.length))
      setHadPosted(false)
      setIsEditing(false)
      setIsFetching(false)
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

      else if (hadPosted) {
         if (author === personalComment.author && content === personalComment.content)
            handleDialog('caution', 'Oh, you have not changed anything.', true)
      } 
      
      else {
         setIsFetching(true)
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
               else if (isEditing) {
                  fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
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
            }
         })
      }

   }

   const handleEdit = () => {
      setIsEditing(true)
   }

   const handleDelete = () => {
      setIsFetching(true)
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
         {isWaiting && <LoadingButton layoutHeight='300px' height = '40px' />}
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
            {isFetching && <LoadingButton layoutHeight = '100%' />}
            <CommentButton type='cancel' handleCancel={handleCancel} />
            <CommentButton type='submit' handleSubmit={handleSubmit} isFetching = {isFetching} />
         </div>}

      </div>



   </div>
}

export default Comment