import React, { useEffect, useState } from 'react'
import Header from '../components/Header'


import { Col, Row } from 'react-bootstrap';
import Wcard from '../components/Wcard';
import { allprojectAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';

function Project() {
  const [istoken,setistoken]=useState(false)

  const [allproject,setallproject]=useState([])
  const [searchkey,setsearchkey]=useState("")

  const getallproject=async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      const reqheader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`

      }
      const result=await allprojectAPI(searchkey,reqheader)
      console.log(result.data);
     if(result.status===200){
      setallproject(result.data)
     }
    }

  }

  console.log(searchkey);
  useEffect(()=>{
    getallproject()
  },[searchkey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setistoken(true)
      
    }
  })
  return (
    <div>
      <Header/>
     <div className='text-center'> <h1>All Project</h1>
<center><input style={{borderRadius:'10px'}} className='form-control w-25 ' placeholder='search the project using technologies' value={searchkey} onChange={e=>setsearchkey(e.target.value)}></input>

</center>


     </div>
    <Row className='mt-5 container-fluid'>
      {allproject?.length>0?
      allproject?.map((item)=>(<Col className='mb-5' sm={12} md={6} lg={4}>
        <Wcard project={item}/>

      </Col>))
      
      :<div>
        {istoken?<p className='fs-3 text-danger text-center'>Sorry no such project currently available</p>:

        
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="login gif" height={'300px'} width={'300px'}  />
        <p className='text-danger fw-3 fs-3 mt-5'>please <Link style={{textDecoration:"none"}} className='text-info' to={'/login'}>Login</Link> to view more project</p></div>}
        </div>
      }
    </Row>
    </div>
  )
}

export default Project