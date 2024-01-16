import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isauthtokencontext } from '../context/Contextshare';

function Header({dashboard}) {

  const {isauthtoken,setisauthtoken}=useContext(isauthtokencontext)

  const navigate=useNavigate()
  const handlelogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existinguser")
    setisauthtoken(false)
// navigate to home page
    navigate('/')


  }
  return (
    <div>
         <Navbar style={{backgroundColor:'white'}}>
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
            <i class="fa-brands fa-stack-overflow"></i>{''} project fair
            </Link>
           
            
          </Navbar.Brand>
          {
            dashboard &&
            <button onClick={handlelogout} style={{borderRadius:"10px"}} className='btn btn-warning' >Logout<i class="fa-solid fa-right-from-bracket"></i></button>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header