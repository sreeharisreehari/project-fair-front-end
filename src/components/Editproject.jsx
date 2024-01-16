import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { editprojectresponsecontext } from '../context/Contextshare';

function Editproject({project}) {
  const {editprojectresponse,seteditprojectresponse}=useContext(editprojectresponsecontext)

    
    const [preview,setpreview]=useState("")
    const [show, setShow] = useState(false);
   
    const handleClose = () => {
      setShow(false);
      handleClose1()
   
    }
    const handleShow = () => setShow(true);

    const [projectdetails,setprojectdetails]=useState({
      id:project._id,
        title:project.title,
        language:project.language,
        github :project.github,
        website :project.website,
        overview:project.overview,
        proimage:""
        
  


    })
    useEffect(()=>{
        if(projectdetails.proimage){
            setpreview(URL.createObjectURL(projectdetails.proimage))
        }
    },[projectdetails.proimage])
    
    const handleClose1=()=>{
        setprojectdetails({
          id:project._id,
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            proimage:""

        })
        setpreview("")
    }

    const handleupdate=async()=>{
        const {id,title,language,github,website,overview,proimage}=projectdetails

        if(!title || !language || !github || !website || !overview){
            alert('please fill the form completely')

        }
        else{
            const reqbody=new FormData()
            reqbody.append("title",title)
            reqbody.append("language",language)
            reqbody.append("github",github)
            reqbody.append("website",website)
            reqbody.append("overview",overview)
          preview?reqbody.append("proimage",proimage):reqbody.append("proimage",project.proimage)

        
        const token=sessionStorage.getItem("token")
        if(preview){
            const reqheader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
        
              }
              const result=await editProjectAPI(id,reqbody,reqheader)
              console.log(result); 
              if(result.status===200){
                alert('updated successfully')
                handleClose()
                seteditprojectresponse(result.data)
              }
              else{
                console.log(result.response.data);
              }
            
              
            
        }
        else{
            const reqheader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
            const result=await editProjectAPI(id,reqbody,reqheader)
            console.log(result); 
            if(result.status===200){
              alert('updated successfully')
              handleClose()
              seteditprojectresponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
          

        }
    }

    } 
    

    
  return (
    <>
         <button className='btn' onClick={handleShow}><i class="fa-solid fa-pen-to-square"></i></button>
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
            <label htmlFor="image" className=' d-flex justify-content-center mt-5' >
            <input id='image' type="file" style={{display:'none'}} onChange={(e)=>setprojectdetails({...projectdetails,proimage:e.target.files[0]})}   />
            {/* target.files are used to access a file or image. */}
            <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${project.proimage}`} className=' justify-content-center' alt="" />
        </label>
            </Col>
            <Col md={6}>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Title'  value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project language' value={projectdetails.language} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})}   />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project github link' value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})}   />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project website link' value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})}  />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Overview' value={projectdetails.overview} onChange={(e)=>setprojectdetails({...projectdetails,overview:e.target.value})} />
                </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose1}   variant="secondary" >
            Cancel
          </Button>
          <Button onClick={handleupdate}  variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Editproject