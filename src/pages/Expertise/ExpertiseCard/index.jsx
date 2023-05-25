import { GrHtml5 } from 'react-icons/gr'
import { TbBrandCss3, TbBrandSass, TbBrandJavascript, TbBrandNextjs, TbBrandPython, TbMicrophone2, TbBrandFlutter } from 'react-icons/tb'
import { FaReact, FaNodeJs, FaJava, FaWpforms } from 'react-icons/fa'
import { SiTypescript, SiRedux, SiExpress, SiMicrosoftsqlserver, SiPostgresql, SiMongodb, SiPython } from 'react-icons/si'
import { CgCPlusPlus } from 'react-icons/cg'
import { BiGitMerge } from 'react-icons/bi'
import { RiEnglishInput } from 'react-icons/ri'
import { MdLocalActivity } from 'react-icons/md'
import { GiTeamIdea, GiBrain } from 'react-icons/gi'
import { VscMultipleWindows } from 'react-icons/vsc'

import { Flex, Icon, Box } from '@chakra-ui/react'
import myLib from 'myLib'

const ExpertiseCard = ({ skillName, completeness }) => {
   const completeNumber = parseInt(completeness)

   let icon
   switch (skillName) {
      case 'HTML':
         icon = <GrHtml5 />
         break
      case 'CSS':
         icon = <TbBrandCss3 />
         break
      case 'SASS':
         icon = <TbBrandSass />
         break
      case 'Javascript':
         icon = <TbBrandJavascript />
         break
      case 'Typescript':
         icon = <SiTypescript />
         break
      case 'ReactJS':
         icon = <FaReact />
         break
      case 'Redux':
         icon = <SiRedux />
         break
      case 'NextJS':
         icon = <TbBrandNextjs />
         break
      case 'Node.js':
         icon = <FaNodeJs />
         break
      case 'Express.js':
         icon = <SiExpress />
         break
      case 'C++':
         icon = <CgCPlusPlus />
         break
      case 'Python':
         icon = <TbBrandPython />
         break
      case 'Microsoft SQL Server':
         icon = <SiMicrosoftsqlserver />
         break
      case 'MongoDB':
         icon = <SiMongodb />
         break
      case 'PostgreSQL':
         icon = <SiPostgresql />
         break
      case 'Git Version Control':
         icon = <BiGitMerge />
         break
      case 'English':
         icon = <RiEnglishInput />
         break
      case 'Vietnamese':
         icon = <MdLocalActivity />
         break
      case 'Presentation':
         icon = <TbMicrophone2 />
         break
      case 'Team Collaboration':
         icon = <GiTeamIdea />
         break
      case 'Critical thinking':
         icon = <GiBrain />
         break
      case 'Java for Android':
         icon = <FaJava />
         break
      case 'Flutter':
         icon = <TbBrandFlutter />
         break
      case 'Windows Forms':
         icon = <VscMultipleWindows />
         break
      case 'WPF':
         icon = <FaWpforms />
         break
   }

   return <Box boxShadow='rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' borderRadius='10px' padding='15px 15px' marginBottom='15px'>
      <Flex gap='15px' align='center' marginBottom='10px'>
         {icon}
         <p>{skillName}</p>
      </Flex>

      <Box width='100%' height='10px' borderRadius='5px' bg='rgba(157, 175, 162, 0.267)'>
         <div style={{ width: completeness, height: 'inherit' }}>
            <Box width='0' height='inherit' borderRadius='5px' style={{ background: `linear-gradient(to right, #023b1e 0%, var(--secondary) ${completeNumber}%)`, animation: 'widthIncrease ease-out 0s forwards', animationDuration: `${myLib.getRandomNumber(2, 7)}s` }}></Box>
         </div>
      </Box>
   </Box>
}

export default ExpertiseCard