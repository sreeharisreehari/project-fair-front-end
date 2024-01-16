import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import { addprojectAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import { addprojectresponsecontext } from '../context/Contextshare';

function Addproject() {
 const {addprojectresponse,setaddprojectresponse}=useContext(addprojectresponsecontext)

  const [preview,setpreview]=useState("")
    const [show, setShow] = useState(false);
    const [token,setToken]=useState("")

    const handleClose = () => {
      setShow(false);
      handleClose1()
    }
    const handleShow = () => setShow(true);

    const [add,setadd]=useState({
      title:"",
      language:"",
      github :"",
      website :"",
      overview:"",
      proimage:""

    })
    console.log(add);

    const handleClose1=()=>{
      setadd({
        title:"",
      language:"",
      github :"",
      website :"",
      overview:"",
      proimage:""

        
      })
      setpreview("")
    }
    useEffect(()=>{
      if(add.proimage)
      {(setpreview(URL.createObjectURL(add.proimage)))}
      else{
        setpreview("")
      }
    },[add.proimage])


    console.log(preview);
    useEffect(()=>{
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"))
        
      }
      else{
        setToken("")
      }
    },[])



    // add project
  
const handleadd=async(e)=>{
  e.preventDefault()

  const {title,language,github,website,overview,proimage}=add

  if(!title || !language || !github || !website || !overview || !proimage){
    alert('please fill the form completely')
  }
  else{
    // reqbody
    // 1)create object for formdata--since we  have uploaded the content--new method is used to create a object
    const reqbody=new FormData()
    // 2)add data to formdata-append()
    reqbody.append("title",title)
    reqbody.append("language",language)
    reqbody.append("github",github)
    reqbody.append("website",website)
    reqbody.append("overview",overview)
    reqbody.append("proimage",proimage)


    if(token){
      const reqheader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`

      }

    







    const result=await addprojectAPI(reqbody,reqheader)
    console.log(result);
    if(result.status===200){

      console.log(result.data);
      alert('project added succesfully')
      handleClose()
       setaddprojectresponse(result.data)
    }
    else{
      alert(result.response.data);
    }
  }

  }


    }

    

  return (
    <div>
        <button className='btn btn-warning' onClick={handleShow}>Add Project </button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <label className=' d-flex justify-content-center mt-5' >
            <input type="file" style={{display:'none'}} onChange={(e)=>setadd({...add,proimage:e.target.files[0]})} />
            {/* target.files are used to access a file or image. */}
            <img width={'200px'} height={'200px'} src={preview?preview:"https://www.pngfind.com/pngs/m/66-661092_png-file-upload-image-icon-png-transparent-png.png"} className=' justify-content-center' alt="" />
        </label>
            </Col>
            <Col md={6}>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Title'  value={add.title} onChange={(e)=>setadd({...add,title:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project language'  value={add.language} onChange={(e)=>setadd({...add,language:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project github link'  value={add.github} onChange={(e)=>setadd({...add,github:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project website link'  value={add.website} onChange={(e)=>setadd({...add,website:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Overview' value={add.overview} onChange={(e)=>setadd({...add,overview:e.target.value})} />
                </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose1} variant="secondary" >
            Cancel
          </Button>
          <Button onClick={handleadd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Addproject