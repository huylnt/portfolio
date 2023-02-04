import React, { useState, createContext } from 'react'

const Context = createContext()

const GlobalState = ({children}) => {
     const [visitor, setVisitor] = useState()
	const [commentHistory, setCommentHistory] = useState([])

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
		<Context.Provider value = {{
               commentHistory, 
               setCommentHistory, 
               visitor, 
               handleVisitorFound
          }}> 
			{children} 
		</Context.Provider>
	)
}

export {Context, GlobalState}