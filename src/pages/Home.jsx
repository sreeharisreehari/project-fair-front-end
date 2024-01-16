import React, { useEffect, useState } from 'react'
import {Row,Col, Card} from 'react-bootstrap'
import titleimage from '../imeges/fuu.gif'
import Wcard from '../components/Wcard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allAPI'



function Home() {
  const [islogin,setislogin]=useState(false)
  const [homeproject,sethomeproject]=useState([])

  const gethomeproject=async()=>{
    const result= await homeprojectAPI()
    console.log(result.data);
    sethomeproject(result.data)
    

  }
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setislogin(true)
    }
    else{
      setislogin(false)
    }
  },[])

  useEffect(()=>{
    gethomeproject()
  },[])
  return (
    <div>
        <div style={{width:'100%',height:'80vh'}}>
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
              <h1 style={{fontSize:'80px',color:'white'}}>Project fair</h1>
              <p>One stop for all software Development Projects</p>
              { islogin?
              <Link to={'/dashboard'} className='btn btn-dark rounded'>Manage Projects<i class="fa-solid fa-arrow-right ms-3"></i> </Link> :
              <Link to={'/login'} className='btn btn-dark rounded'>Get Started<i class="fa-solid fa-arrow-right ms-3"></i> </Link>}
            </Col>
            <Col sm={12} md={6}>
              <img src={titleimage} alt="" className='w-75' />
            </Col>
            
          </Row>
          <div/>
    </div>
    <div style={{height:'50vh',backgroundColor:'##002244'}} className='all-project mt-5 '>
      <h1 className='text-center mt-5'>Explore our Projects</h1>
      <marquee scrollAmount={20}>
        <div className='d-flex justify-content-evenly mt-5'>
          { homeproject?.length>0?
          homeproject.map((item)=>(<diV className='ms-5' style={{width:'100px'}}>
            <Wcard project={item} />
            
          </diV>))
          :null
          }
         
        </div>
      </marquee>
     
      <div className='text-center mt-5'>
      <Link to={'/project'}>See More Projects</Link>
      </div>
    </div>

    </div>
  )
}

export default Home