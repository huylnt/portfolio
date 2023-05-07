import React, { useState, createContext } from 'react'

const originVisitorContext = createContext()

const VisitorContext = ({children}) => {
     const [visitor, setVisitor] = useState()

     const handleVisitorFound = (visitor) => {
          setVisitor(visitor)

          fetch(process.env.REACT_APP_MY_SERVER.concat('/welcome'), {
               method: "POST",
               headers: { "Content-type": "application/json; charset=UTF-8" },
               body: JSON.stringify({
                  visitor: visitor.query,
               }),
          })
     }
	return (
		<originVisitorContext.Provider value = {{
               visitor, 
               handleVisitorFound
          }}> 
			{children} 
		</originVisitorContext.Provider>
	)
}

export {originVisitorContext, VisitorContext}