import styles from './index.module.scss'

const CommentCard = ( { author, content }) => {
     return <div className = {styles.card}>
          <p style = {{ fontWeight: 'bolder'}}> {author} </p>
          <p> {content} </p>
     </div>
}

export default CommentCard