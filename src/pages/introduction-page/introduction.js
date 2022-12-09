const Introduction = ({device}) => {
   let layout = 'space-evenly'
   let customHeight = '100%'
   if (device === 'mobile') {
      layout = 'flex-start'
      customHeight = '90%'
   }
   
   return <div style={{padding: '0 3vw 0 0'}}>
      <p style={{margin: '0', fontWeight: "600", fontSize: "calc(18px + 1vw)", color: "#519259", lineHeight: '2'}}> I'm Huy Le Nguyen Truong </p>
      <p style={{fontWeight: "800", fontSize: "calc(16px + 1vw)", color: "#064635", lineHeight: '1'}}> Full-stack Web Developer </p>
      <p style={{fontSize: "calc(14px + 0.5vw)"}}> 
         Nice to see you here! 
         <br />
         I always want to improve myself everyday. I have not only studied well at university but also spent most of my free time to discover new things online, gather new technical knowledge, update myself with the latest technology. 
         <br />
         With good English communication skills and also great soft skills, I am confident that I can become familiar with any new environment.
      </p>
      <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', gap: '3vw'}}>
         <a href="https://www.canva.com/design/DAE6WPw8UjE/Vq1opQnJbtFZqhzkjOoO6g/view?website#2" target = "_blank" style={{width: 'max-content', padding: '5px 10px', background: 'rgba(11, 90, 36, 0.566)', borderRadius: '10px', color: 'white', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px', textAlign: 'center', fontSize: 'calc(14px+0.5vw)'}}> View my CV </a>
         <a href="https://github.com/20127037/my-portfolio" target = "_blank" style={{width: 'max-content', padding: '5px 10px', background: 'rgba(11, 90, 36, 0.566)', borderRadius: '10px', color: 'white', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px', textAlign: 'center', fontSize: 'calc(14px+0.5vw)'}}> View my GitHub REPO </a>
      </div>
      
   </div>
}

export default Introduction