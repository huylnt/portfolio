import { Box } from "@chakra-ui/react"

const CommentCard = ( { author, content }) => {
     return <Box bg='primary' padding='15px' marginY='25px' borderRadius='20px' borderLeft='3px solid var(--secondary)' borderBottom='5px solid var(--secondary)' boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'>
          <p style = {{ fontWeight: 'bolder'}}> {author} </p>
          <p> {content} </p>
     </Box>
}

export default CommentCard