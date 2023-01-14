import { memo } from 'react'
import styles from './index.module.scss'

import profileLink from 'profileLink'
import ContactCard from './components/ContactCard'

const Contact = ({ device }) => {
   let iconSize = '100'
   if (device === 'mobile') iconSize = '50'
   let iconSizeInPX = iconSize + 'px'

   const contacts = [
      {
         iconFamily: 'Phone',
         href: `tel:${profileLink.phone}`,
         content: '(+84) 774 848 931'
      },
      {
         iconFamily: 'Gmail',
         href: `mailto:${profileLink.email}`,
         content: 'lnthuy29012002@gmail.com'
      },
      {
         iconFamily: 'Facebook',
         href: profileLink.facebook,
         content: 'Huy Le Nguyen Truong'
      },
      {
         iconFamily: 'Location',
         href: '',
         content: 'Ho Chi Minh city, Viet Nam'
      },
   ]
   return <div className = {styles.pageLayout}>

      <p className = {styles.title}> 
         Feel free to contact me for work or daily-life concerns between <br /> <span className = {styles.time}> 8.00 am </span> to <span className = {styles.time}> 10.00 pm </span>
      </p>

      <div className = {styles.contactLayout}>
         {contacts.map((contact, index) => <ContactCard key = {index} {...contact} />)}
      </div>

      <br />

      <iframe src = {profileLink.map} width="90%" height="300px" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: '0', borderRadius: '20px', margin: '5px 0 0 0' }}></iframe>

   </div>

}

export default memo(Contact)