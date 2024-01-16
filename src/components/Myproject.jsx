import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userprojectAPI } from '../services/allAPI'
import Editproject from './Editproject'
import { addprojectresponsecontext, editprojectresponsecontext } from '../context/Contextshare'


function Myproject() {
    const {editprojectresponse,seteditprojectresponse}=useContext(editprojectresponsecontext)

    const [useproject,setuserproject]=useState([])
    // const [addprojectresponse,setaddprojectresponse]=useContext(addprojectresponsecontext)
     const {addprojectresponse,setaddprojectresponse} = useContext(addprojectresponsecontext)

    const getuserproject=async()=>{
        const token=sessionStorage.getItem("token")
        const reqheader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result=await userprojectAPI(reqheader)
        console.log(result.data);
        setuserproject(result.data)

    }
    useEffect(()=>{
        getuserproject()
    },[addprojectresponse,editprojectresponse])

    const handledelete=async(id)=>{
        const token=sessionStorage.getItem("token")
        const reqheader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result=await deleteProjectAPI(id,reqheader)
        console.log(result); 
        if(result.status === 200){
            getuserproject()
        }
        else{
            console.log(result.response.data);
        }


    }

  return (
    
        <div className='card shadow p-4'>
           
            <div className='d-flex justify-content-between'>
                <h3>My Projects</h3>
                <Addproject/>

            </div>
            <div className='mt-4'>
              { useproject?.length>0?
              useproject?.map((item)=>(
                <div className='border d-flex align-items-center p-2 mb-3 rounded'>
                    <h5>{item.title}</h5>
                    <div className='ms-auto d-flex'>
                         <Editproject project={item}/> 
                       <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github"></i></a>

                        <button onClick={()=>handledelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>


                    </div>
                </div>))
                :
                <p className='text-warning fw-bolder fs-4'>No Projects uploaded yet !!</p>}

            </div>

        </div>
    
  )
}

export default Myproject