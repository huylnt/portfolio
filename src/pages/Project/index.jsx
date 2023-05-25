import { Center, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"
import profileLink from "profileLink"

const Project = () => {
   return <Tabs isFitted variant='soft-rounded' colorScheme='green' size='lg' defaultIndex={0}>

         <TabList>
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
            <ProjectCard name='Image studio' description='A mobile application acts as library but enable users to do much more: categorizing images with album, applying filters, combining, ...' techStack={['Java', 'Android', 'NoSQL']} isPersonal={false} githubLink={[profileLink.usegeClient, profileLink.usegeServer]} officialSiteLink={profileLink.usegeInCHPlay} />
            </TabPanel>

            <TabPanel>
               <Center height='100vh'>Coming soon...</Center>
            </TabPanel>
         </TabPanels>

      </Tabs>
}

export default Project