import { Link, Flex } from '@chakra-ui/react'
import { RxRocket } from 'react-icons/rx'

const OtherSite = ({ href, content }) => {
     const handleClicked = () => {
          if (Array.isArray(href)) {
               href.forEach(link => window.open(link, "_blank"))
          }
          else window.open(href, "_blank")
     }

     return <Flex bg='accent' color='white' gap='10px' padding='10px 15px' borderRadius='full' marginTop='20px' align='center' _hover={{ filter: 'brightness(150%)', cursor: 'pointer'}} onClick={handleClicked}>
          <RxRocket />
          {content}
     </Flex>

}

export default OtherSite