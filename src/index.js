import ReactDOM from 'react-dom'
import { GlobalState } from 'context'
import App from 'App.jsx'

import 'index.css'


ReactDOM.render(
     <GlobalState>
          <App />
     </GlobalState>, 
document.getElementById('root'))
