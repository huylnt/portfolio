import { useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { originVisitorContext } from "context/VisitorContext"
import { Center, Spinner, Text, Skeleton, Flex } from "@chakra-ui/react"

const Welcome = () => {
     const visitorContext = useContext(originVisitorContext)
     const { visitor, handleVisitorFound } = visitorContext
     const navigateTo = useNavigate()

     const detectVisitor = async () => {
          const response = await fetch(process.env.REACT_APP_LOCATION.concat(process.env.REACT_APP_LOCATION_KEY))
          const content = await response.json()
          handleVisitorFound(content)
          setTimeout(() => navigateTo('/introduction'), 4000)
     }

     useEffect(() => {
          detectVisitor()
     }, [])

     return (
          <Center width='100vw' height='100vh' flexFlow='column' gap='80px' textAlign='center' fontSize='150%' paddingX='15px'>
               <div>

                    <Text>Welcome my new friend from</Text>

                    <Flex justify='center' marginY='10px'>
                         <Skeleton isLoaded={visitor?.city.name} height='50px' minWidth='150px' width='max-content' fadeDuration={3} bg='primary' borderRadius='full' textAlign='center' paddingX='10px'>
                              <span style={{ fontFamily: `'Permanent Marker', cursive`, color: 'var(--heading)' }}>{visitor?.city.name}</span>
                         </Skeleton>

                         <Text>,</Text>

                         <Skeleton isLoaded={visitor?.country.name} height='50px' minWidth='150px' width='max-content' fadeDuration={3} bg='primary' borderRadius='full' textAlign='center' paddingX='10px'>
                              <span style={{ fontFamily: `'Permanent Marker', cursive`, color: 'var(--heading)' }}>{visitor?.country.name}</span>
                         </Skeleton>
                    </Flex>

                    <Text fontStyle='italic'> It may not be your <span>exact location</span>, but your browser tells me this.</Text>
               </div>

               <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray'
                    color='accent'
                    size='xl'
               />
          </Center>
     )
}

export default Welcome