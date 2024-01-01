import React from 'react'
import styles from '@/styles/card.module.css'

const Card = (props) => {
    return (
        <div className={styles.mainMainDiv}>
            <div className={styles.mainDiv}>
                <h1 className={styles.title}>{props.name}</h1>
                <p className={styles.desc}>{props.description}</p>
            </div>
        </div>
    )
}

export default Card