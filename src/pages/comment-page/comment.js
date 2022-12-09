import { useState, useEffect } from "react"

import Card from "./comment-card"

import "./comment.css"

const Comment = ({ device }) => {
   const [commentHistory, setCommentHistory] = useState([])
   useEffect(() => {
      fetch('http://localhost:3001/comment')
      .then(res => res.json())
      .then(obj => {
         setCommentHistory(obj.msg)
      })
      .catch(err => console.log(err))
   }, [])
   
   const onSubmit = () => {
      const author = document.getElementById('author').value;
      const content = document.getElementById('content').value;

      if (author && content) {
         fetch('http://localhost:3001/comment', {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
               author,
               content
            }),
         })
         .then(response => response.json())
         .then(obj => {
            console.log(obj)
            window.location.reload(false)
         })
         .catch(err => console.log('Error at line 22', err));
      }
   }

   return <div style={{ height: '100%', width: '90%' }}>

      <p> Comment history </p>
      <div style={{ height: '50%', overflowY: 'scroll', marginBottom: '20px' }}>
         {
            commentHistory.map(element => {
               return (
                  <Card author = {element.author} content = {element.content} />
               )
            })
         }
      </div>

      <p> Write your own comment </p>
      <div>

         <label style={{ position: 'relative' }}>
            <i className="fa-solid fa-user" style={{ position: 'absolute', top: '3px', left: '15px' }}></i>
            <input id="author" type='text' placeholder = "Type your name here" style={{ height: '30px' }} />
         </label>

         <label>
            <textarea id="content" placeholder = "Write your comment here" style={{ padding: '10px', minWidth: '100%', maxWidth: '100%', minHeight: '120px', maxHeight: '120px' }}>  </textarea>
         </label>

         <div className="btn" onClick={onSubmit} > Submit </div>
      </div>

   </div>
}

export default Comment