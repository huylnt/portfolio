const Card = ( { author, content }) => {
     return <div style = {{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', padding: '1px 20px', margin: '0 10px 30px 0', borderRadius: '10px', borderLeft: '4px solid rgba(11, 90, 36, 0.566)', borderBottom: '3px solid rgba(11, 90, 36, 0.566)'}}>
          <p style = {{ fontWeight: 'bolder'}}> {author} </p>
          <p> {content} </p>
     </div>
}

export default Card