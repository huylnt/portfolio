import { Link, Flex } from '@chakra-ui/react'
import { RxRocket } from 'react-icons/rx'

const OtherSite = ({ href, content }) => {
     return <Link href={href} target='_blank'>
          <Flex bg='accent' color='white' gap='10px' padding='15px' borderRadius='full' marginY='15px' align='center' _hover={{filter: 'brightness(150%)'}}>
               <RxRocket />
               {content}
          </Flex>
     </Link>
}

export default OtherSite