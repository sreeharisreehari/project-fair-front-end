import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../imeges/secure-login.gif'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isauthtokencontext } from '../context/Contextshare';



function Auth({register}) {
const {isauthtoken,setisauthtoken}=useContext(isauthtokencontext)

//   create a state to hold the balue of user registration details
 const [userdata,setuserdata]=useState({
    username:"",
    email:"",
    password:""
 })
 console.log(userdata);

 

 const navigate=useNavigate()


    const registerform= register?true:false

    const handleregister=async(e)=>{
        e.preventDefault()
        // then destructure the content

        const {username,email,password}=userdata



        
        if(!username || !email || !password){
            toast.error('please fill the form completely')
        }
        else{
        const result= await registerAPI(userdata) 
        console.log(result.data);
        if(result.status ===200){
            toast.success(`${result.data.username} is successfully registered`)
            setuserdata({
                username:"",
    email:"",
    password:""

            })
            // navigate to login page
            navigate('/login')


        }
        else{
            toast.error(result.response.data)
        }


        }

       
    

        


        
    }
     // to login
     const handlelogin=async(e)=>{
        e.preventDefault()
        const {email,password}=userdata
        if(!email|| !password){
            toast.info('please fill the form completely')
        }
        else{
            const result=await loginAPI(userdata)
            // toast.success('login successful')
            console.log(result);
            if(result.status==200){
                // alert
                toast.success('login successfull')
                setisauthtoken(true)
                // store
                sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))
                sessionStorage.setItem("token",result.data.token)



                //state empty
                setuserdata({
                    username:"",
                    email:"",
                    password:""
                }) 
                // navigate
          
                setTimeout(()=>{
                    navigate('/')
                    

                },2500)
            

            }
            else{
                alert(result.response.data)
            }

            
            
        }
        
     }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'100vh'}}>
        
        <div className='w-75 container' >
        <Link><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
            <Row >
                <Col>
                <img src={titleimage} alt="" width={'100%'} />

                </Col>
                <Col>
                <h1 className='ms-5'><i class="fa-brands fa-stack-overflow"></i>Project Fair</h1>
                <h5 className='ms-5 mt-4'>{
                    registerform?"Sign up to your Account":"Sign in to your Account"
                    }</h5>
                    <br />
                    <br />
                  
                    <Form>
                                {
                                    registerform&&
                                    <Form.Group className='mt-5' controlId="validationFormik01">
                                    <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Yourname' onChange={(e)=>setuserdata({...userdata,username:e.target.value})}/>
                                    </Form.Group>
                                }
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="email" placeholder='Enter Your Email' onChange={(e)=>setuserdata({...userdata,email:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Your Password' onChange={(e)=>setuserdata({...userdata,password:e.target.value})}/>
                            </Form.Group>
                            {registerform?
                                <div className='d-flex align-items-center flex-column mt-4'>
                                    <button onClick={handleregister} style={{borderRadius:'10px'}} className='btn btn-warning '>Register</button>
                                    <p className='mt-2' style={{color:'white'}}>Already A User? Click Here To <Link to={'/login'}>Login</Link></p>

                                </div>:
                                <div className='d-flex align-items-center flex-column mt-4'>
                                <button onClick={handlelogin} style={{borderRadius:'10px'}} className='btn btn-warning  mt-4'>Login</button>
                                <p className='mt-2' style={{color:'white'}}>New User? Click Here To <Link to={'/register'}>Register</Link></p>

                            </div>
                            }

                            </Form>

                
                </Col>
            </Row>
        </div>
        {/* <ToastContainer autoclose={2000} theme='colored' position='top-center'/> */}
        <ToastContainer autoClose={2000} theme='colored' position='top-center'/> 
    </div>
  )
}

export default Auth