import React from 'react'
import classNames from 'classnames'
import { RiErrorWarningLine } from 'react-icons/ri'
import { MdOutlineCelebration, MdOutlineDangerous } from 'react-icons/md'

import styles from './index.module.scss'

const Dialog = ({type, message}) => {
     let icon
     switch (type) {
          case 'success':
               icon = <MdOutlineCelebration />
               break
          case 'caution':
               icon = <RiErrorWarningLine />
               break
          case 'danger':
               icon = <MdOutlineDangerous />
               break
     }

     return <div className={classNames(styles.box, styles[type])}>
          {React.cloneElement(icon, {className: styles.icon})}
          <p>{message}</p>
     </div>
}

export default Dialog