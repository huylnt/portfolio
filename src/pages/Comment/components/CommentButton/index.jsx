import React from 'react'
import classNames from 'classnames/bind'

import LoadingButton from 'components/LoadingButton'

import styles from './index.module.scss'

const CommentButton = (props) => {
     const { type } = props
     const displayedType = type.charAt(0).toUpperCase() + type.slice(1)

     var style = {
          button: styles.btn,
          type: styles[type],
          active: styles.active
     }
     const cx = classNames.bind(style)
     const btnClasses = cx('button', 'type', { active: props?.handleSubmit || props?.handleEdit || props?.handleDelete || props?.handleCancel })
     
     let btn
     switch (type) {
          case 'submit':
               if (props?.handleSubmit) btn = <div onClick={props.handleSubmit}> 
                    {props.isFetching && <LoadingButton layoutHeight = '100%' height = '20px' />}
                    {displayedType} 
               </div>
               else btn = <div> {displayedType} </div>
               break
          case 'edit':
               if (props?.handleEdit) btn = <div onClick={props.handleEdit}> {displayedType} </div>
               else btn = <div> {displayedType} </div>
               break
          case 'delete':
               if (props?.handleDelete) btn = <div onClick={props.handleDelete}> 
                    {props.isFetching && <LoadingButton layoutHeight = '100%' height = '20px' />}
                    {displayedType} 
               </div>
               else btn = <div> {displayedType} </div>
               break
          case 'cancel':
               if (props?.handleCancel) btn = <div onClick={props.handleCancel}> {displayedType} </div>
               else btn = <div> {displayedType} </div>
               break
     }

     let btnWithClass = React.cloneElement(btn, { className: btnClasses })
     return btnWithClass
}

export default CommentButton