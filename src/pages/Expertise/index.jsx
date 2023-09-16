import ExpertiseCard from './ExpertiseCard'
import { Text, Center, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'

const Expertise = () => {

   const feWebSkills = [
      {
         skillName: 'HTML',
         completeness: '95%',
      },
      {
         skillName: 'CSS',
         completeness: '80%',
      },
      {
         skillName: 'SASS',
         completeness: '70%',
      },
      {
         skillName: 'Javascript',
         completeness: '85%',
      },
      {
         skillName: 'Typescript',
         completeness: '20%',
      },
      {
         skillName: 'ReactJS',
         completeness: '80%',
      },
      {
         skillName: 'Redux',
         completeness: '70%',
      },
      {
         skillName: 'NextJS',
         completeness: '50%',
      },

   ]

   const feMobileSkills = [
      {
         skillName: 'Flutter',
         completeness: '75%',
      },
      {
         skillName: 'Java for Android',
         completeness: '45%',
      },
      {
         skillName: 'Kotlin',
         completeness: '25%',
      },

   ]

   const feDesktopSkills = [
      {
         skillName: 'Windows Forms',
         completeness: '25%',
      },
      {
         skillName: 'WPF',
         completeness: '63%',
      },
   ]

   const beSkills = [
      {
         skillName: 'Node.js',
         completeness: '70%',
      },
      {
         skillName: 'Express.js',
         completeness: '80%',
      },
      {
         skillName: 'C++',
         completeness: '75%',
      },
      {
         skillName: 'Python',
         completeness: '60%',
      },
   ]

   const dbSkills = [
      {
         skillName: 'Microsoft SQL Server',
         completeness: '70%',
      },
      {
         skillName: 'MongoDB',
         completeness: '60%',
      },
      {
         skillName: 'PostgreSQL',
         completeness: '20%',
      },
   ]

   const otherSkills = [
      {
         skillName: 'Git Version Control',
         completeness: '80%',
      },
   ]

   const languages = [
      {
         skillName: 'English',
         completeness: '75%',
      },
      {
         skillName: 'Vietnamese',
         completeness: '95%',
      },
   ]

   const softSkills = [
      {
         skillName: 'Presentation',
         completeness: '90%',
      },
      {
         skillName: 'Team Collaboration',
         completeness: '85%',
      },
      {
         skillName: 'Critical thinking',
         completeness: '80%',
      },
   ]

   return <div style={{ width: '100%', height: 'inherit' }}>

      <Text color='heading' fontWeight='bold' fontSize='125%'>Front-End Skills</Text>

      <Tabs isFitted variant='soft-rounded' colorScheme='green' size='lg' defaultIndex={0}>

         <TabList marginY='15px' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='full'>
            <Tab>Web</Tab>
            <Tab>Mobile</Tab>
            <Tab>Desktop</Tab>
         </TabList>

         <TabPanels>
            <TabPanel padding='0'>
               {feWebSkills.map((feSkill, index) => <ExpertiseCard key={index} {...feSkill} />)}
            </TabPanel>

            <TabPanel padding='0'>
               {feMobileSkills.map((feSkill, index) => <ExpertiseCard key={index} {...feSkill} />)}
            </TabPanel>

            <TabPanel padding='0'>
               {feDesktopSkills.map((feSkill, index) => <ExpertiseCard key={index} {...feSkill} />)}
            </TabPanel>
         </TabPanels>

      </Tabs>

      <br />

      <Text color='heading' fontWeight='bold' fontSize='125%'>Back-End Skills</Text>
      <div>
         {beSkills.map((beSkill, index) => <ExpertiseCard key={index} {...beSkill} />)}
      </div>

      <br />

      <Text color='heading' fontWeight='bold' fontSize='125%'>Database</Text>
      <div>
         {dbSkills.map((dbSkill, index) => <ExpertiseCard key={index} {...dbSkill} />)}
      </div>

      <br />

      <Text color='heading' fontWeight='bold' fontSize='125%'>Other skills</Text>
      <div>
         {otherSkills.map((otherSkill, index) => <ExpertiseCard key={index} {...otherSkill} />)}
      </div>

      <br />

      <Text color='heading' fontWeight='bold' fontSize='125%'>Natural Languages</Text>
      <div>
         {languages.map((language, index) => <ExpertiseCard key={index} {...language} />)}
      </div>

      <br />

      <Text color='heading' fontWeight='bold' fontSize='125%'>Soft skills</Text>
      <div>
         {softSkills.map((softSkill, index) => <ExpertiseCard key={index} {...softSkill} />)}
      </div>

   </div>
}

export default Expertise