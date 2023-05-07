import ReactDOM from 'react-dom'
import { VisitorContext } from 'context/VisitorContext'
import { CommentContext } from 'context/CommentContext'

import App from 'App'

import 'index.css'


ReactDOM.render(
     <VisitorContext>
          <CommentContext>
               <App />
          </CommentContext>
     </VisitorContext>, 
document.getElementById('root'))
