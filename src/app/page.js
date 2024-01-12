'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import data from '@/utils/data';
import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {

  const [hasPrompted, setHasPrompted] = useState(false)

  const prompt = () => {
    if (!hasPrompted) {
      const name = window.prompt("Enter a name to chat: ");
      localStorage.setItem('name', name)
      setHasPrompted(true)
    }
  }

  prompt();

  return (
    <main className={styles.main}>
      <div className={styles.cardsDiv}>
        {data.map((value, index) => {
          return (
            <div className={styles.cardDiv} key={index}>
              <Link href={value.link} className={styles.link}>
                <Card name={value.name} description={value.description} />
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}
