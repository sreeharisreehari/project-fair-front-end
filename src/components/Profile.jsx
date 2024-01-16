import React, { useEffect } from 'react'
import titleimage from '../imeges/profile-removebg-preview.png'
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import { updateProfileAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userprofile,setuserprofile]=useState({
      id:"",
      username:"",
      email:"",
      password:"",
      github:"",
      linkedin:"",
      profile:""
    })
    // once an image is uploaded then that image is stored in existing image

    const [existingimage,setexistingimage]=useState("")
    const [preview,setpreview]=useState("")
    // preview is to hold the url of the new image

    useEffect(()=>{
      const  user=JSON.parse(sessionStorage.getItem("existinguser"))
      console.log(user);

      setuserprofile({...userprofile,id:user._id,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})
      setexistingimage(user.profile)
    },[])

    useEffect(()=>{
      if(userprofile.profile){(setpreview(URL.createObjectURL(userprofile.profile)))
      }
    else{
      setpreview("")
    }
    },[userprofile.profile])
    console.log(userprofile);

    const profileUpdate = async()=>{
      const {id,github,linkedin,profile} = userprofile
      console.log(userprofile);
      if (!github || !linkedin || !profile) {
        alert("fill all details")
        
      }
      else{
        const reqBody = new FormData()

        // reqBody.append("username",username)
        // reqBody.append("email",email)
        // reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        reqBody.append("profile",profile)

        const token = sessionStorage.getItem("token")
        console.log(token);
        if (preview) {
          const reqheader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            const result = await updateProfileAPI(id,reqBody,reqheader)
            console.log(result);
          if (result.status === 200) {
            alert('Profile Updated Successfully')
            console.log(result.data); 
            
            
            
            sessionStorage.setItem("existinguser",JSON.stringify(result.data))

            
          }
        }  
        else{
          const reqheader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProfileAPI(id,reqBody,reqheader)
          console.log(result);
        if (result.status === 200) {
          console.log(result.data);  
          
          sessionStorage.setItem("existinguser",JSON.stringify(result.data))

          
        }
        }




        
      }

    }
     
  

  return (

<div className='card shadow p-5'>
    <div className='d-flex justify-content-between align-item-center'>
        <h2>Profile  </h2>
              <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i  class="fa-solid fa-right-from-bracket fa-rotate-90"></i></button>

    </div>
    <Collapse in={open}>
    <div className='row justify-content-center'>
        <label htmlFor="profile">
        <input id="profile" type="file" style={{display:'none'}} onChange={(e)=>setuserprofile({...userprofile,profile:e.target.files[0]})} />
        {
          existingimage==""?
          <img width={'200px'} height={'200px'} src={preview?preview:`https://th.bing.com/th/id/OIP.JPnkSi87CyRhZwQjkWFDFgHaHa?w=827&h=827&rs=1&pid=ImgDetMain`}className='rounded-circle justify-content-center' alt="" />
        :          <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingimage}`}className='rounded-circle justify-content-center' alt="" />

        }
        </label>
        <div  className='mb-3 mt-4'>
<input type="text" placeholder='GitHub' className='form-control' value={userprofile.github} onChange={(e)=>setuserprofile({...userprofile,github:e.target.value})} />

        </div>
        <div  className='mb-3 mt-4'>
<input type="text" placeholder='    LinkedIn' className='form-control' value={userprofile.linkedin} onChange={(e)=>setuserprofile({...userprofile,linkedin:e.target.value})} />

        </div>
        <div  className='mb-3 mt-3'>
   <button className='btn btn-success rounded w-100' onClick={profileUpdate}>Update</button>
        </div>
        </div>
        </Collapse>
    </div>
  )
}

export default Profile