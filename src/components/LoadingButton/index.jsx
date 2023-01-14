import React from 'react'
import globalStyles from 'App.module.scss'
import privateStyles from './index.module.scss'

const LoadingButton = ({layoutHeight}) => {
     return <div className = {globalStyles.center} style = {{height: `${layoutHeight}`}}>
          <button className = {privateStyles.spinner}></button>
     </div> 
}

export default LoadingButton