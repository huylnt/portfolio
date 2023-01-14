import profileLink from 'profileLink'
import OtherSite from 'components/OtherSite'

import globalStyles from 'App.module.scss'
import styles from './index.module.scss'

const Introduction = () => {

   return <div className = {globalStyles.center}>
      <div>
         <p className={styles.name}> I'm Huy Le Nguyen Truong </p>

         <p className={styles.occupation}> Full-stack Web Developer </p>

         <p className={styles.content}>
            Nice to see you here!
            <br />
            I always want to improve myself everyday. I have not only studied well at university but also spent most of my free time to discover new things online, gather new technical knowledge, update myself with the latest technology.
            <br />
            With good English communication skills and also great soft skills, I am confident that I can become familiar with any new environment.
         </p>

         <div className={styles.linkList}>
            <OtherSite href={profileLink.cv} content='View my CV' />
            <OtherSite href={profileLink.github} content='View my Github repository' />
         </div>
      </div>

   </div>
}

export default Introduction