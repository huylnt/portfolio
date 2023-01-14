import React, { memo } from "react"
import {FiPhoneCall} from 'react-icons/fi'
import {CgMail} from 'react-icons/cg'
import {RiFacebookCircleLine} from 'react-icons/ri'
import {TfiLocationPin} from 'react-icons/tfi'

import styles from './index.module.scss'

const ContactCard = ({iconFamily, href, content}) => {
     let icon
     switch (iconFamily) {
          case 'Phone':
               icon = <FiPhoneCall />
               break
          case 'Gmail':
               icon = <CgMail />
               break
          case 'Facebook':
               icon = <RiFacebookCircleLine />
               break
          case 'Location':
               icon = <TfiLocationPin />
               break
     }

     return (
     <div className = {styles.cardLayout}>
          { React.cloneElement(icon, { className: styles.icon }) }
          <a href = {href}>{content}</a>
     </div>
     )
}

export default memo(ContactCard)