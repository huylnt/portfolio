import { memo } from 'react'
import { Text } from '@chakra-ui/react'
import profileLink from 'profileLink'
import ContactCard from './ContactCard'

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
   return <div>

      <Text color='heading' fontSize='125%' fontWeight='bold' bg='background' borderRadius='20px' padding='20px' boxShadow='rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px' marginBottom='30px'> 
         Feel free to contact me for work or daily-life concerns between <span style={{fontFamily: `'Permanent Marker', cursive`}}> 8.00 am </span> to <span style={{fontFamily: `'Permanent Marker', cursive`}}> 10.00 pm </span>
      </Text>

      <div>
         {contacts.map((contact, index) => <ContactCard key = {index} {...contact} />)}
      </div>

      <br />

      <iframe src = {profileLink.map} width="100%" height="300px" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: '0', borderRadius: '20px', margin: '5px 0 0 0' }}></iframe>

   </div>

}

export default memo(Contact)