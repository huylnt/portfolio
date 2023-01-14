import React from 'react'
import { GrHtml5 } from 'react-icons/gr'
import { TbBrandCss3, TbBrandSass, TbBrandJavascript, TbBrandNextjs, TbBrandPython, TbMicrophone2 } from 'react-icons/tb'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiTypescript, SiRedux, SiExpress, SiMicrosoftsqlserver, SiPostgresql, SiMongodb, SiPython } from 'react-icons/si'
import { CgCPlusPlus } from 'react-icons/cg'
import { BiGitMerge } from 'react-icons/bi'
import { RiEnglishInput } from 'react-icons/ri'
import { MdLocalActivity } from 'react-icons/md'
import { GiTeamIdea, GiBrain } from 'react-icons/gi'

import myLib from 'myLib'

import styles from './index.module.scss'

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
   }

   return <div className={styles.card}>
      <div className={styles.title}>
         {React.cloneElement(icon, { className: styles.icon })}
         <p>{skillName}</p>
      </div>

      <div className={styles.progressBar}>
         <div style={{ width: completeness, height: 'inherit' }}>
            <div className={styles.activeProgress} style={{ background: `linear-gradient(to right, #023b1e 0%, var(--theme-background) ${completeNumber}%)`, animationDuration: `${myLib.getRandomNumber(2,7)}s` }}></div>
         </div>
      </div>


   </div>
}

export default ExpertiseCard