import React from 'react'
import globalStyles from 'App.module.scss'
import privateStyles from './index.module.scss'

const LoadingButton = ({layoutHeight, height}) => {
     return <div className = {globalStyles.center} style = {{height: `${layoutHeight}`}}>
          <div style = {{width:`${height}`, height: `${height}`, position: 'relative'}} >
               <button className = {privateStyles.spinner}></button>
          </div>
     </div> 
}

export default LoadingButton