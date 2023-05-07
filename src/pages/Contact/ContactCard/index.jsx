import {FiPhoneCall} from 'react-icons/fi'
import {CgMail} from 'react-icons/cg'
import {RiFacebookCircleLine} from 'react-icons/ri'
import {TfiLocationPin} from 'react-icons/tfi'
import { Flex } from '@chakra-ui/react'

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
     <Flex gap='20px' padding='10px 15px' marginTop='10px' align='center' borderRadius='10px' _hover={{background: 'var(--primary)'}}>
          {icon}
          <a href = {href}>{content}</a>
     </Flex>
     )
}

export default ContactCard