import globalStyles from 'App.module.scss'
import ExpertiseCard from './components/ExpertiseCard'

const Expertise = () => {

   const feSkills = [
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
         completeness: '20%',
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
         completeness: '50%',
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

   return <div style={{width: '100%', height: 'inherit'}}>

      <p className = {globalStyles.heading}>Front-End Skills</p>
      <div>
         { feSkills.map((feSkill, index) => <ExpertiseCard key = {index} {...feSkill} />)}
      </div>

      <p className = {globalStyles.heading}>Back-End Skills</p>
      <div>
         { beSkills.map((beSkill, index) => <ExpertiseCard key = {index} {...beSkill} />)}
      </div>

      <p className = {globalStyles.heading}>Database</p>
      <div>
         { dbSkills.map((dbSkill, index) => <ExpertiseCard key = {index} {...dbSkill} />)}
      </div>

      <p className = {globalStyles.heading}>Other skills</p>
      <div>
         { otherSkills.map((otherSkill, index) => <ExpertiseCard key = {index} {...otherSkill} />)}
      </div>

      <p className = {globalStyles.heading}>Natural Languages</p>
      <div>
         { languages.map((language, index) => <ExpertiseCard key = {index} {...language} />)}
      </div>

      <p className = {globalStyles.heading}>Soft skills</p>
      <div>
         { softSkills.map((softSkill, index) => <ExpertiseCard key = {index} {...softSkill} />)}
      </div>

   </div>
}

export default Expertise