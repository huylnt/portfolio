import { Box, Flex, Badge, Text, Tag } from "@chakra-ui/react"
import OtherSite from "components/OtherSite"

const ProjectCard = ({ name, description, techStack, isPersonal, githubLink, officialSiteLink }) => {
     const handleCardClicked = () => {
          window.open(officialSiteLink, "_blank");
     }

     return (
          <Box padding='20px 20px 10px 20px' marginY='30px' borderRadius='20px' borderLeft='3px solid var(--secondary)' borderBottom='5px solid var(--secondary)' boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' onClick={handleCardClicked}>
               <Flex justify='flex-start' align='center' width='100%' gap='30px' marginBottom='10px'>
                    <Text color='heading' fontWeight='bold' fontSize='125%'>{name}</Text>
                    <Badge colorScheme={(isPersonal) ? 'green' : 'blue'}>{isPersonal ? 'Personal' : 'Team'}</Badge>
               </Flex>

               <Text align='justify'>{description}</Text>

               <Flex zIndex='1' gap='30px' justify='space-between' align='center'>
                    <Flex flexGrow='8' maxWidth='80%' overflowX='auto' gap='30px'>
                         {techStack.map(e => <Text width='max-content' height='50px' padding='12px 20px' borderRadius='12px' bg='primary' whiteSpace='nowrap'>
                              {e}
                         </Text>)}
                    </Flex>

                    <OtherSite maxWidth='20%' flexGrow='2' href={githubLink} content='View source code' />
               </Flex>
          </Box>
     )
}

export default ProjectCard