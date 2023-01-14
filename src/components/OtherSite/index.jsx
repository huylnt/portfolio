import {RxRocket} from 'react-icons/rx'

import styles from './index.module.scss'

const OtherSite = ({href, content}) => {
     return <a href = {href} target = '_blank' className = {styles.buttonA}>
          <RxRocket />
          {content}
     </a>
     
}

export default OtherSite