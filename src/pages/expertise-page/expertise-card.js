const Card = ({skillName, completeness}) => {

   function pickApproriateColor(completeness) {
      const completeNumber = parseInt(completeness)
      if (completeNumber > 85) return "#03fc5a"
      else if (completeNumber > 70) return "#02bd43"
      else if (completeNumber > 40) return "#017a2c"
      else return "#013613"
   }

   return <div style={{boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px", padding: "5px 10px", marginBottom: "5vh"}}>
      <p style={{lineHeight: "0", fontSize: "calc(14px + 0.5vw)"}}>{skillName}</p>
      <div style={{width: "100%", height: "10px", backgroundColor: "black"}}>
         <div style={{width: completeness, height: "inherit", backgroundColor: pickApproriateColor(completeness)}}> </div>
      </div>
   </div>
}

export default Card