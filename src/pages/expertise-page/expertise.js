import Card from "./expertise-card"
import './expertise.css'
const Expertise = () => {
   return <div style={{height: '100%', width: '90%'}}>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Front-End Skills</p>
      <div className="expertise-container">
         <Card skillName='HTML' completeness='95%' />
         <Card skillName='CSS' completeness='90%' />
         <Card skillName='Javascript' completeness='85%' />
         <Card skillName='React' completeness='90%' />
         <Card skillName='Redux' completeness='80%' />
      </div>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Back-End Skills</p>
      <div className="expertise-container">
         <Card skillName='Node.js' completeness='60%' />
         <Card skillName='C++' completeness='75%' />
         <Card skillName='Python' completeness='50%' />
      </div>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Database</p>
      <div className="expertise-container">
         <Card skillName='SQL Server' completeness='70%' />
         <Card skillName='Postgre SQL' completeness='20%' />
      </div>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Other skills</p>
      <div className="expertise-container">
         <Card skillName='Git Version Control' completeness='50%' />
      </div>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Natural Languages</p>
      <div className="expertise-container">
         <Card skillName='English' completeness='80%' />
         <Card skillName='Vietnamese' completeness='98%' />
      </div>

      <p style={{fontWeight: "bold", fontSize: "calc(18px + 1vw)"}}>Soft skills</p>
      <div className="expertise-container" style={{padding: '0 0 5vh 0'}}>
         <Card skillName='Team Collaboration' completeness='95%' />
         <Card skillName='Presentation' completeness='98%' />
         <Card skillName='Critical Thinking' completeness='85%' />
      </div>
   </div>
}

export default Expertise