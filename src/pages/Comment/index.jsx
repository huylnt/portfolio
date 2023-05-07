import { useState, useEffect, useContext } from "react"
import { originVisitorContext } from "context/VisitorContext"
import { originCommentContext } from "context/CommentContext"

import CommentCard from "./CommentCard"

import { Spinner, Text, InputGroup, InputLeftElement, Input, Textarea, Box, useToast, Button, Flex, Center } from "@chakra-ui/react"
import { MdOutlineCancel, MdPostAdd } from 'react-icons/md'
import { HiOutlineUser } from 'react-icons/hi'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

const Comment = () => {
   const visitorContext = useContext(originVisitorContext)
   const { visitor } = visitorContext
   const commentContext = useContext(originCommentContext)
   const { commentHistory, setCommentHistory, personalComment, setPersonalComment } = commentContext

   const toast = useToast()

   const [isFetching, setIsFetching] = useState(false)
   const [hadPosted, setHadPosted] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [reload, setReload] = useState(0)

   useEffect(() => {

      const commentAuthor = localStorage?.getItem('commentAuthor')
      const commentContent = localStorage?.getItem('commentContent')

      if (commentAuthor && commentContent) {
         setPersonalComment(personalComment => ({ author: commentAuthor, content: commentContent }))
         setHadPosted(true)
      }

      else {
         fetch(process.env.REACT_APP_MY_SERVER.concat('/comment/').concat(visitor?.ip))
            .then(res => res.json())
            .then(obj => {
               if (obj.msg !== null) {
                  localStorage.setItem('commentAuthor', obj.msg.author)
                  localStorage.setItem('commentContent', obj.msg.content)
                  setPersonalComment(obj.msg)
                  setHadPosted(true)
               }
            })
      }


      if (commentHistory.length < 1) {
         fetch(process.env.REACT_APP_MY_SERVER.concat('/comment')).then(res => res.json()).then(obj => {
            const tempCommentHistory = obj.msg.filter(comment => comment.author != localStorage?.getItem('commentAuthor'))
            setCommentHistory([...tempCommentHistory, {
               author: 'Virtual assistant',
               content: 'There is nothing else here.'
            }])
         })
      }

   }, [reload])

   const handleReload = () => {
      console.log('Here')
      setHadPosted(false)
      setIsEditing(false)
      setIsFetching(false)

      setReload(prev => prev + 1)
   }

   const handleSubmit = () => {
      const author = document.getElementById('author').value;
      const content = document.getElementById('content').value;

      if (!author || !content) toast({
         title: 'Oh, you have missed filling out the required information field.',
         variant: 'subtle',
         status: 'warning',
         position: 'bottom-right',
         colorScheme: 'orange',
         duration: 3000,
      })

      else if (author.length < 6) toast({
         title: 'Oh, your name is quite short. May you provide more details?',
         variant: 'subtle',
         status: 'warning',
         position: 'bottom-right',
         colorScheme: 'orange',
         duration: 3000,
      })

      else if (author.length > 30) toast({
         title: 'Oh, your name is quite long. May you shorten it so that we can remember it easier?',
         variant: 'subtle',
         status: 'warning',
         position: 'bottom-right',
         colorScheme: 'orange',
         duration: 3000,
      })

      else if (content.length < 16) toast({
         title: 'Oh, you comment is not specific enough. I am waiting for more of your feeling now.',
         variant: 'subtle',
         status: 'warning',
         position: 'bottom-right',
         colorScheme: 'orange',
         duration: 3000,
      })

      else if (content.length > 200) toast({
         title: 'Oh, your comment is valuable but quite long. Please help me summarize it.',
         variant: 'subtle',
         status: 'warning',
         position: 'bottom-right',
         colorScheme: 'orange',
         duration: 3000,
      })

      else {
         setIsFetching(true)
         if (isEditing) {
            if (author === personalComment.author && content === personalComment.content) {
               setIsFetching(false)
               toast({
                  title: 'Oh, you have not changed anything.',
                  variant: 'subtle',
                  status: 'warning',
                  position: 'bottom-right',
                  colorScheme: 'orange',
                  duration: 3000,
               })
               return
            }
         }

         fetch(process.env.REACT_APP_LANGUAGE_DETECTION.concat(content), {
            method: 'POST',
            headers: {
               "Authorization": "Bearer " + process.env.REACT_APP_LANGUAGE_DETECTION_KEY
            },
         })
            .then(res => res.json()).then(res => {
               return {
                  language: res.data.detections[0].language,
                  confidence: res.data.detections[0].confidence
               }
            })
            .then(({ language, confidence }) => {
               if (language !== 'en' || confidence < 8) {
                  setIsFetching(false)
                  toast({
                     title: 'Oops, your comment may not be English. Please be more accurate.',
                     variant: 'subtle',
                     status: 'warning',
                     position: 'bottom-right',
                     colorScheme: 'orange',
                     duration: 3000,
                  })
               }
               else {
                  localStorage.setItem('commentAuthor', author)
                  localStorage.setItem('commentContent', content)
                  if (!hadPosted) {
                     fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
                        method: "POST",
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify({
                           visitor: visitor['ip_address'],
                           author,
                           content
                        }),
                     })
                        .then(response => response.json())
                        .then(obj => {
                           toast({
                              title: 'Great, your comment has been posted.',
                              variant: 'subtle',
                              status: 'success',
                              position: 'bottom-right',
                              colorScheme: 'green',
                              duration: 3000,
                           })
                           setTimeout(handleReload, 2000)
                        })
                        .catch(err => toast({
                           title: 'Oh sorry, the server may not be available currently.',
                           variant: 'subtle',
                           status: 'error',
                           position: 'bottom-right',
                           colorScheme: 'red',
                           duration: 3000,
                        }))
                  }

                  else fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
                     method: "PUT",
                     headers: { "Content-type": "application/json; charset=UTF-8" },
                     body: JSON.stringify({
                        visitor: visitor['ip_address'],
                        author,
                        content
                     }),
                  })
                     .then(response => response.json())
                     .then(obj => {
                        toast({
                           title: 'Great, your comment has been modified.',
                           variant: 'subtle',
                           status: 'success',
                           position: 'bottom-right',
                           colorScheme: 'green',
                           duration: 3000,
                        })
                        setTimeout(handleReload, 2000)
                     })
                     .catch(err => toast({
                        title: 'Oh sorry, the server may not be available currently.',
                        variant: 'subtle',
                        status: 'error',
                        position: 'bottom-right',
                        colorScheme: 'red',
                        duration: 3000,
                     }))
               }
            })
      }

   }

   const handleEdit = () => {
      setIsEditing(true)
   }

   const handleDelete = () => {
      setIsFetching(true)

      localStorage.removeItem('commentAuthor')
      localStorage.removeItem('commentContent')

      fetch(process.env.REACT_APP_MY_SERVER.concat('/comment'), {
         method: "DELETE",
         headers: { "Content-type": "application/json; charset=UTF-8" },
         body: JSON.stringify({
            visitor: visitor['ip_address'],
         }),
      })
         .then(response => response.json())
         .then(obj => {
            toast({
               title: 'You have deleted your comment successfully.',
               variant: 'subtle',
               status: 'success',
               position: 'bottom-right',
               colorScheme: 'green',
               duration: 3000,
            })
            setTimeout(handleReload, 2000)
         })
         .catch(err => toast({
            title: 'Oh sorry, the server may not be available currently.',
            variant: 'subtle',
            status: 'error',
            position: 'bottom-right',
            colorScheme: 'red',
            duration: 3000,
         }))
   }

   const handleCancel = () => {
      setIsEditing(false)
   }


   return <div style={{ width: '100%', height: 'inherit' }}>

      <Text color='heading' fontWeight='bold' fontSize='125%'> Comment history </Text>
      <Box height='50%' overflowY='auto' marginY='10px'>
         <Box marginRight='15px' height='100%'>
            {commentHistory.length < 1 && <Center height='100%'>
               <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray'
                  color='accent'
                  size='xl'
               />
            </Center>}
            {commentHistory.map((comment, index) => <CommentCard key={index} {...comment} />)}
         </Box>
      </Box>

      <Text color='heading' fontWeight='bold' fontSize='125%' marginTop='20px'> Write your own comment </Text>

      <div>

         <label for='author'>
            {!hadPosted && <InputGroup marginY='20px'>
               <InputLeftElement pointerEvents='none' children={<HiOutlineUser color='black' />} _focus={{ color: 'black' }} />
               <Input id='author' type='text' placeholder="Type your name here" bg='primary' _focus={{ background: 'white' }} focusBorderColor='accent' />
            </InputGroup>}

            {hadPosted && !isEditing && <InputGroup marginY='20px'>
               <InputLeftElement pointerEvents='none' children={<HiOutlineUser color='black' />} _focus={{ color: 'black' }} />
               <Input id='author' type='text' value={personalComment.author} bg='primary' focusBorderColor='none' />
            </InputGroup>}

            {isEditing && <InputGroup marginY='20px'>
               <InputLeftElement pointerEvents='none' children={<HiOutlineUser color='black' />} _focus={{ color: 'black' }} />
               <Input id='author' type='text' defaultValue={personalComment.author} bg='white' focusBorderColor='accent' />
            </InputGroup>}
         </label>


         {!hadPosted && <Textarea id='content' placeholder='Write your comment here' bg='primary' _focus={{ background: 'white' }} focusBorderColor='accent'></Textarea>}
         {hadPosted && !isEditing && <Textarea id='content' value={personalComment.content} bg='primary' focusBorderColor='none'></Textarea>}
         {isEditing && <Textarea id='content' defaultValue={personalComment.content} focusBorderColor='accent'></Textarea>}

         <Flex justify='flex-end' marginTop='20px' gap='10px'>

            {!hadPosted && <Button variant='solid' colorScheme='green' leftIcon={<MdPostAdd />} onClick={handleSubmit} isLoading={isFetching} loadingText='Submitting'>Submit</Button>}

            {hadPosted && !isEditing && <Flex justify='flex-end' gap='10px'>
               <Button variant='outline' colorScheme='red' leftIcon={<AiOutlineDelete />} onClick={handleDelete} isLoading={isFetching} loadingText='Deleting...'>Delete</Button>
               <Button variant='outline' colorScheme='yellow' leftIcon={<AiOutlineEdit />} onClick={handleEdit} isLoading={isFetching} loadingText='Editing...'>Edit</Button>
            </Flex>}

            {isEditing && <Flex justify='flex-end' gap='10px'>
               <Button variant='solid' bg='#CCCAC9' leftIcon={<MdOutlineCancel />} onClick={handleCancel} _hover={{ filter: 'brightness(80%)' }}>Cancel</Button>
               <Button variant='solid' colorScheme='green' leftIcon={<MdPostAdd />} onClick={handleSubmit} isLoading={isFetching} loadingText='Submitting'>Submit</Button>
            </Flex>}

         </Flex>


      </div>

   </div>
}

export default Comment