import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {Row,Col,card} from 'react-bootstrap'
import Profile from '../components/Profile'
import Myproject from '../components/Myproject'


function Dashboard() {
  const [username,setusername]=useState("")
  useEffect(()=>{
    setusername(JSON.parse(sessionStorage.getItem("existinguser")).username)

  },[])



  return (
    <div>
      <Header dashboard/>
      <h1 className='mt-3'>Welcome <span style={{color:'#FEBE10'}}>{username}</span></h1>
      <Row className='container-fluid mt-5'>
        <Col md={8}>
        <Myproject/>
        </Col>
        <Col md={4}>
          <Profile/>
          
        </Col>
      </Row>
      

    </div>
  )
}

export default Dashboard