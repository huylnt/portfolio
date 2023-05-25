import { useLayoutEffect, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { Outlet, NavLink } from 'react-router-dom'
import { originVisitorContext } from "context/VisitorContext"
import { Flex, Text, Box, Icon, Avatar, Image } from '@chakra-ui/react'
import { HiOutlinePresentationChartLine } from 'react-icons/hi'
import { GiAlliedStar } from 'react-icons/gi'
import { AiOutlineProject, AiOutlineContacts } from 'react-icons/ai'
import { BiCommentEdit } from 'react-icons/bi'

const Navigator = () => {
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

  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  }

  const [mobileSidePanelExpanded, setMobileSidePanelExpanded] = useState(false)

  const handleMobileSidePanelResized = () => {
    setMobileSidePanelExpanded(prev => !prev)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    detectVisitor()
  }, [])

  return (width >= 1200) ? <Flex width='100vw' height='100vh' justify='space-between' align='center' gap='6vw' overflowY='scroll'>
    <Flex pos='sticky' top='10vh' height='80vh' justify='flex-start' align='center' gap='6vw' width='25vw'>
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

      <Image src='avatar.jpg' boxSize='80vh' fit='cover' rounded='30px' transform='rotate(-5deg)' boxShadow='dark-lg' />
    </Flex>

    <Box width='50vw' height='100%' p='15px'>
      <Outlet />
    </Box>
  </Flex> : <Flex justify='flex-start'>
    <Flex flexFlow='column' pos='sticky' top='0px' height='100vh' justify='center' align='center' gap='3vh' minWidth={mobileSidePanelExpanded ? '200px' : '100px'} bg='primary' padding='30px 30px 0 30px'>

        <Avatar marginBottom='5vh' src='avatar.jpg' onClick={handleMobileSidePanelResized} _hover={{cursor: 'pointer'}}/>

        <NavLink to='/introduction' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/introduction')}>
          <Flex justifyContent='flex-start' align='center' gap='15px' padding='1vh' my='10px' rounded='12px' width={mobileSidePanelExpanded ? '180px' : 'max-content'}>
            <Icon as={HiOutlinePresentationChartLine} boxSize='8' />
            {mobileSidePanelExpanded && <Text>Introduction</Text>}
          </Flex>
        </NavLink>

        <NavLink to='/expertise' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/expertise')}>
          <Flex justifyContent='flex-start' align='center' gap='15px' padding='1vh' my='10px' rounded='12px'  width={mobileSidePanelExpanded ? '180px' : 'max-content'}>
            <Icon as={GiAlliedStar} boxSize='8' />
            {mobileSidePanelExpanded && <Text>Expertise</Text>}
          </Flex>
        </NavLink>

        <NavLink to='/project' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/project')}>
          <Flex justifyContent='flex-start' align='center' gap='15px' padding='1vh' my='10px' rounded='12px' width={mobileSidePanelExpanded ? '180px' : 'max-content'}>
            <Icon as={AiOutlineProject} boxSize='8' />
            {mobileSidePanelExpanded && <Text>Project</Text>}
          </Flex>
        </NavLink>

        <NavLink to='/contact' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/contact')}>
          <Flex justifyContent='flex-start' align='center' gap='15px' padding='1vh' my='10px' rounded='12px' width={mobileSidePanelExpanded ? '180px' : 'max-content'}>
            <Icon as={AiOutlineContacts} boxSize='8' />
            {mobileSidePanelExpanded && <Text>Contact</Text>}
          </Flex>
        </NavLink>

        <NavLink to='/comment' className={({ isActive }) => (isActive ? 'path-active' : 'path')} onClick={() => handleRouteChanged('/comment')}>
          <Flex justifyContent='flex-start' align='center' gap='15px' padding='1vh' my='10px' rounded='12px' width={mobileSidePanelExpanded ? '180px' : 'max-content'}>
            <Icon as={BiCommentEdit} boxSize='8' />
            {mobileSidePanelExpanded && <Text>Comment</Text>}
          </Flex>
        </NavLink>
    </Flex>

    <Box p='10px 30px' flexGrow={1} overflowX='auto'>
      <Outlet />
    </Box>
  </Flex>
}

export default Navigator