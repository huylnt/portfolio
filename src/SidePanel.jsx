import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { Outlet, NavLink } from 'react-router-dom'
import { originVisitorContext } from "context/VisitorContext"
import { Flex, Container, Text, Box, Icon, Avatar, Image } from '@chakra-ui/react'
import { HiOutlinePresentationChartLine } from 'react-icons/hi'
import { GiAlliedStar } from 'react-icons/gi'
import { AiOutlineProject, AiOutlineContacts } from 'react-icons/ai'
import { BiCommentEdit } from 'react-icons/bi'

const SidePanel = () => {
  const visitorContext = useContext(originVisitorContext)
  const { visitor, handleVisitorFound } = visitorContext
  const navigateTo = useNavigate()

  const handleRouteChanged = async (path) => {
    localStorage.setItem('route', path)
  }

  const detectVisitor = async () => {
    const response = await fetch(process.env.REACT_APP_LOCATION)
    const content = await response.json()
    handleVisitorFound(content)
  }

  useEffect(() => {
    detectVisitor()
  }, [])

  return (
    <Flex width='100vw' height='100vh' justify='space-around' align='center' gap='100px' overflow='hidden'>
      <Box minWidth='150px' height='fit-content' position='relative' marginLeft='30px' borderRadius='30px' boxShadow='rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' fontSize='80%'>

        <NavLink to='/introduction' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/introduction')}>
          <Flex flexFlow='column' justifyContent='center' align='center' gap='15px' padding='20px' my='10px' rounded='12px'>
            <Icon as={HiOutlinePresentationChartLine} boxSize='8' />
            <Text>Introduction</Text>
          </Flex>
        </NavLink>

        <NavLink to='/expertise' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/expertise')}>
          <Flex flexFlow='column' justifyContent='center' align='center' gap='15px' padding='20px' my='10px' rounded='12px'>
            <Icon as={GiAlliedStar} boxSize='8' />
            <Text>Expertise</Text>
          </Flex>
        </NavLink>

        <NavLink to='/project' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/project')}>
          <Flex flexFlow='column' justifyContent='center' align='center' gap='15px' padding='20px' my='10px' rounded='12px'>
            <Icon as={AiOutlineProject} boxSize='8' />
            <Text>Project</Text>
          </Flex>
        </NavLink>

        <NavLink to='/contact' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/contact')}>
          <Flex flexFlow='column' justifyContent='center' align='center' gap='15px' padding='20px' my='10px' rounded='12px'>
            <Icon as={AiOutlineContacts} boxSize='8' />
            <Text>Contact</Text>
          </Flex>
        </NavLink>

        <NavLink to='/comment' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/comment')}>
          <Flex flexFlow='column' justifyContent='center' align='center' gap='15px' padding='20px' my='10px' rounded='12px'>
            <Icon as={BiCommentEdit} boxSize='8' />
            <Text>Comment</Text>
          </Flex>
        </NavLink>
      </Box>

      <Image src='avatar.jpg' height='80%' rounded='30px' transform='rotate(-5deg)' boxShadow='dark-lg' />

      <Box flexGrow='8' height='100%' m='20px' p='15px' overflowY='auto'>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default SidePanel