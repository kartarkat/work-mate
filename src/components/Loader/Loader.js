import React from 'react'
import styles from './Loader.module.scss'

function Loader({ name = "Loading" }) {
  return (
    <div className={styles.loader}>
        <div className={styles.animation}></div>
        <div className={styles.title}>{name}</div>
    </div>
  )
}

export default Loader