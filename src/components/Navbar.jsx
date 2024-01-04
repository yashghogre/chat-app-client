import React from 'react'
import { IoMdMenu } from "react-icons/io";
import styles from '@/styles/navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.mMDiv}>
            <div className={styles.mDiv}>
                <h3 className={styles.title}>TalkBud</h3>
                <div className={styles.iconDiv}>
                    <IoMdMenu size={35} />
                </div>
            </div>
        </div>
    )
}

export default Navbar