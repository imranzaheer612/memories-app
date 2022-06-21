import React from 'react'
import Card from '../../components/Card'
import Navbar from '../../components/Navbar';

import './style.scss'



export default function Stories() {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  ];
  const text = 'Kayaks crowd Three Sister Springs, where people and manatees maintain controversial coexistence';
  const title = 'whats up!';
  const date = "26 March 2022";

  return (
    <>
     <Navbar></Navbar>
      <div className='stories-row'>
        <Card images={images} date={date} title={title} text={text}/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </>
  )
}
