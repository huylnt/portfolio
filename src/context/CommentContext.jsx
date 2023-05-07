import React, { useState, createContext } from 'react'

const originCommentContext = createContext()

const CommentContext = ({children}) => {
	const [commentHistory, setCommentHistory] = useState([])
     const [personalComment, setPersonalComment] = useState(null)

     const handleVisitorFound = (visitor) => {

          setVisitor(visitor)

          fetch(process.env.REACT_APP_MY_SERVER.concat('/welcome'), {
               method: "POST",
               headers: { "Content-type": "application/json; charset=UTF-8" },
               body: JSON.stringify({
                  visitor: visitor['ip_address'],
               }),
          })
     }
	return (
		<originCommentContext.Provider value = {{
               commentHistory, 
               setCommentHistory,
               personalComment,
               setPersonalComment
          }}> 
			{children} 
		</originCommentContext.Provider>
	)
}

export {originCommentContext, CommentContext}