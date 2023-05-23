import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigator from 'Navigator'
import { Introduction, Comment, Contact, Expertise, Project, Welcome } from 'pages'

import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const colors = {
  primary: '#e3dfdf',
  secondary: '#2c5845',
  accent: '#3b5644',
  heading: '#09401f',

  background: 'linear-gradient(138deg, rgba(224,241,228,0.27503501400560226) 0%, rgba(172,220,186,0.7120098039215687) 53%, rgba(35,96,54,0.20780812324929976) 100%)'
}
const theme = extendTheme({ colors })

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path='/' element={<Navigator />}>
            <Route path='/introduction' element={<Introduction />} />
            <Route path='/comment' element={<Comment />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/expertise' element={<Expertise />} />
            <Route path='/project' element={<Project />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
