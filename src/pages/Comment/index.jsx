import { useState, useEffect } from "react"

import CommentButton from "./components/CommentButton"
import CommentCard from "./components/CommentCard"

import LoadingButton from "components/LoadingButton"
import Dialog from "components/Dialog"

import { HiOutlineUser } from 'react-icons/hi'

import styles from './index.module.scss'

const Comment = ({ visitor }) => {
   const [isWaiting, setIsWaiting] = useState(true)
   const [commentHistory, setCommentHistory] = useState([])
   const [personalComment, setPersonalComment] = useState(null)
   const [hadPosted, setHadPosted] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [reload, setReload] = useState(0)
   const [dialog, setDialog] = useState({})

   useEffect(() => {
      let _id;
      fetch(`${process.env.REACT_APP_MY_SERVER}/welcome`, {
         method: "POST",
         headers: { "Content-type": "application/json; charset=UTF-8" },
         body: JSON.stringify({
            visitor: visitor['ip_address'],
         }),
      })


      fetch(`${process.env.REACT_APP_MY_SERVER}/comment/${visitor['ip_address']}`)
         .then(res => res.json())
         .then(obj => {
            setPersonalComment(obj.msg)
            if (obj.msg !== null) {
               setHadPosted(true)
               _id = obj.msg['_id']
            }
         })
         .then(() => {
            fetch(`${process.env.REACT_APP_MY_SERVER}/comment`)
               .then(res => res.json())
               .then(obj => {
                  if (obj.msg.length > 0) setCommentHistory(obj.msg.filter(e => e['_id'] != _id))
                  setCommentHistory([...commentHistory, {
                     author: 'Virtual assistant',
                     content: 'There is nothing else here.'
                  }])
                  setIsWaiting(false)
               })
         })
         .catch(() => {
            setIsWaiting(false)
            handleDialog('danger', 'Oh sorry, the server may be offline currently.')
         })

   }, [reload])

   const handleReload = () => {
      setReload(reload + 1)
      setDialog({})
      setCommentHistory(commentHistory.splice(0, commentHistory.length))
      setHadPosted(false)
      setIsEditing(false)
   }

   const handleDialog = (type, message) => {
      setDialog({ type, message })
      setTimeout(() => setDialog({}), 5000)
   }

   const handleSubmit = () => {
      const author = document.getElementById(styles.author).value;
      const content = document.getElementById(styles.content).value;

      if (!author || !content) handleDialog('caution', 'Oh, you have missed filling out the require information field.')

      else if (author.length > 30) handleDialog('caution', 'Oh, your name is too long. May you reduce it a little bit more?')

      else if (content.length > 100) handleDialog('caution', 'Oh, your comment is so valuable but I think it needs to be shorter to be more concise.')

      else if (author === personalComment.author && content === personalComment.content) handleDialog('caution', 'Oh, you have not changed anything.')
      
      else {

         fetch(process.env.REACT_APP_LANGUAGE_DETECTION.concat(content), {
            method: 'POST',
            headers: {
               "Authorization": "Bearer " + process.env.REACT_APP_LANGUAGE_DETECTION_KEY
            },
         }).then(res => res.json()).then(res => {
            return {
               language: res.data.detections[0].language,
               confidence: res.data.detections[0].confidence
            }
         })
            .then(({language, confidence}) => {
               if (language !== 'en' || confidence < 12) handleDialog('caution', 'Oops, your comment is not English.')
               else {
                  if (!hadPosted) {
                     fetch(`${process.env.REACT_APP_MY_SERVER}/comment`, {
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
                        handleDialog('success', 'Great, your comment has been posted.')
                        setTimeout(handleReload, 2000)
                     })
                     .catch(err => handleDialog('danger', 'Oh sorry, the server may not be available currently.'))
                  }
                  else if (isEditing) {
                     fetch(`${process.env.REACT_APP_MY_SERVER}/comment`, {
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
                        handleDialog('success', 'Great, your comment has been modified.')
                        setTimeout(handleReload, 2000)
                     })
                     .catch(err => handleDialog('danger', 'Oh sorry, the server may not be available currently.'))
                  }
               }
            })
      }

   }

   const handleEdit = () => {
      setIsEditing(true)
   }

   const handleDelete = () => {
      fetch(`${process.env.REACT_APP_MY_SERVER}/comment`, {
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
         {isWaiting && <LoadingButton layoutHeight='100%' />}
         {commentHistory.map((comment, index) => <CommentCard key = {index} {...comment} />)}
      </div>

      <p> Write your own comment </p>
      <div>

         <label style={{ position: 'relative' }}>
            {!hadPosted && <input id={styles.author} type='text' placeholder="Type your name here" />}
            {hadPosted && !isEditing && <input id={styles.author} type='text' placeholder={personalComment.author} />}
            {isEditing && <input id={styles.author} type='text' defaultValue={personalComment.author} />}
            <HiOutlineUser className={styles.icon} />
         </label>


         {!hadPosted && <textarea id={styles.content} placeholder='Write your comment here'></textarea>}
         {hadPosted && !isEditing && <textarea id={styles.content} placeholder={personalComment.content}></textarea>}
         {isEditing && <textarea id={styles.content} defaultValue = {personalComment.content}></textarea>}


         {!hadPosted && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='submit' handleSubmit={handleSubmit} />
         </div>}

         {hadPosted && !isEditing && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='delete' handleDelete={handleDelete} />
            <CommentButton type='edit' handleEdit={handleEdit} />
            <CommentButton type='submit' />
         </div>}

         {isEditing && <div className={styles.btnArea}>
            {(Object.keys(dialog).length > 0) && <Dialog {...dialog} />}
            <CommentButton type='cancel' handleCancel={handleCancel} />
            <CommentButton type='submit' handleSubmit={handleSubmit} />
         </div>}

      </div>



   </div>
}

export default Comment