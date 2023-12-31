'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

export default function Home() {

  const [msg, setMsg] = useState('')
  const [inMsg, setInMsg] = useState([])
  const socket = io('https://chat-app-server-dmth.onrender.com', { withCredentials: true });

  useEffect(() => {
    console.log(typeof (inmsg))
    socket.on('msg', (msg) => {
      console.log('Message from server:', msg);
      setInMsg((prev) => [...prev, msg])
    });

    console.log(inMsg)

    return () => {
      socket.disconnect();
    };
  });

  const send = (e) => {
    e.preventDefault();
    console.log(msg)
    socket.emit('msg', msg)
    // setMsg('')
  }

  return (
    <main className={styles.main}>
      <div className={styles.inputDiv}>
        <input type='textarea' value={msg} onChange={(e) => setMsg(e.target.value)} className={styles.input} placeholder='Type your Message' />
        <button onClick={send} className={styles.btn}><AiOutlineSend size={25}/></button>
      </div>
      <div className={styles.msg}>
        {
          inMsg.map((value, key) => {
            return (<p key={key} style={{ color: 'black' }}><FaRegUserCircle />{value}</p>)
          })
        }
        {/* <p>{typeof(inmsg)}</p> */}
      </div>
    </main>
  )
}
