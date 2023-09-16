import { Center, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"
import profileLink from "profileLink"

const Project = () => {
   return <Tabs isFitted variant='soft-rounded' colorScheme='green' size='lg' defaultIndex={0}>

         <TabList boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' borderRadius='full'>
            <Tab>Web</Tab>
            <Tab>Mobile</Tab>
            <Tab>Desktop</Tab>
         </TabList>

         <TabPanels>
            <TabPanel>
               <ProjectCard name='Paint 2D' description='A web application that lets you sketch some basic geometric shape with custom color.' techStack={['HTML Canvas', 'CSS', 'ReactJS']} isPersonal='true' githubLink={profileLink.paintClient} officialSiteLink={profileLink.paintWebsite} />
               <ProjectCard name='My Shop' description='A web application that assists businessman manage their products, customers, orders and easily overview the work with some analyzing features.' techStack={['CSS', 'ReactJS', 'NoSQL']} isPersonal={true} githubLink={profileLink.shopClient} officialSiteLink={profileLink.shopWebsite} />
            </TabPanel>

            <TabPanel>
            <ProjectCard name='Cabo' description='A mobile application which is a part of drive-booking online system that allows customer to request booking.' techStack={['Flutter','Firebase']} isPersonal={false} githubLink={profileLink.caboClient} officialSiteLink={profileLink.caboShowcase} />
            <ProjectCard name='Eldercare' description='A mobile application which is essential for employee to keep track on their work.' techStack={['Flutter','NoSQL']} isPersonal={false} githubLink={profileLink.eldercareClient} officialSiteLink={profileLink.eldercareShowcase} />
            <ProjectCard name='Image studio' description='A mobile application acts as library but enable users to do much more: categorizing images with album, applying filters, combining, ...' techStack={['Java', 'Android', 'NoSQL']} isPersonal={false} githubLink={[profileLink.usegeClient, profileLink.usegeServer]} officialSiteLink={profileLink.usegeInCHPlay} />
            </TabPanel>

            <TabPanel>
               <Center height='100vh'>Coming soon...</Center>
            </TabPanel>
         </TabPanels>

      </Tabs>
}

export default Project