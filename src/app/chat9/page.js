'use client'

import Image from 'next/image'
import styles from './../../styles/chat.module.css'
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
const socket = io('https://chat-app-server-dmth.onrender.com/chat9', { withCredentials: true });
// const socket = io('http://localhost:9000/chat9', { withCredentials: true });

export default function Home() {

  const [msg, setMsg] = useState('')
  const [inMsg, setInMsg] = useState([])
  const [name, setName] = useState('Anon')
  // const [position, setPosition] = useState('')
  const lastMsg = useRef(null)

  function test() {
    setName(window.prompt('Enter a name to chat: '))
    localStorage.setItem('name', name)
  }

  useEffect(() => {
    const handleConnect = () => {
      console.log('User Connected');
      toast.success('You have joined the room!');
    };

    socket.on('connect', handleConnect);

    // test();

    return () => {
      socket.off('connect', handleConnect);
    };
  }, []);

  useEffect(() => {
    const handleMsg = (msg) => {
      // console.log('Message from server:', msg);
      setInMsg((prev) => [...prev, {
        msg: msg.msg,
        pos: socket.id === msg.id ? 'right' : 'left',
        fD: socket.id === msg.id ? 'row-reverse' : 'row',
        name: msg.name,
        namePos: socket.id === msg.id ? 'flex-end' : 'flex-start',
        // bgCol: socket.id === msg.id ? 'alice-blue' : 'rgba(0, 255, 0, 0.151)'
      }])
      // if (msg.id === socket.id) {
      //   setPosition('right')
      // }
      // else { setPosition('left') }
      // console.log(socket.id)
      lastMsg.current?.scrollIntoView();
    }
    socket.on('msg', handleMsg);
    // console.log(position)
    // console.log(inMsg)
    return () => {
      socket.off('msg', handleMsg);
    }
  }, [])

  // useEffect(() => {
  // lastMsg.current?.scrollIntoView();  
  // }, [inMsg])

  const send = (e) => {
    // e.preventDefault();
    // console.log(msg)
    // localStorage.setItem('name', 'Yash')
    // setName(localStorage.getItem('name'))
    console.log(name)
    socket.emit('msg', { msg: msg, id: socket.id, name: name })
    setMsg('')
  }

  return (
    <main className={styles.main}>
      <Toaster />
      <div className={styles.msg}>
        {
          inMsg.map((value, key) => {
            return (
              <div key={key} className={styles.msgDiv} >

                <div className={styles.sMDiv} style={{ display: 'flex', flexDirection: 'column' }}>

                  <div className={styles.nameDiv} style={{ display: 'flex', justifyContent: `${value.namePos}` }}>
                    <h4>{value.name}</h4>
                  </div>

                  <div className={styles.sSMDiv} style={{ textAlign: `${value.pos}`, display: 'flex', flexDirection: `${value.fD}`, alignItems: 'center', gap: '10px' }}>
                    <FaRegUserCircle size={25} />
                    <p key={key} style={{ color: 'black', display: 'flex', gap: '1vw', alignItems: 'center', display: 'inline' }}>{value.msg}</p>
                  </div>

                </div>
                <div ref={lastMsg} />
              </div>)
          })
        }
        {/* <p>{typeof(inmsg)}</p> */}

        <div className={styles.inputDiv}>
          <input type='textarea' value={msg} onChange={(e) => setMsg(e.target.value)} className={styles.input} placeholder='Type your Message' />
          {msg.length === 0 ?
            <button className={styles.btn}><AiOutlineSend color='lightGray' size={35} /></button> :
            <button onClick={send} className={styles.btn}><AiOutlineSend size={35} /></button>
          }
        </div>
      </div>
    </main>
  )
}
