import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
            <div style={{width:'100%', height:'300px',backgroundColor:'##002244'}} className='d-flex justify-content-center align-items-center w-100 mt-5 flex-column'>
        <div className='footer d-flex justify-content-evenly align-items-center w-100'>
         <div className='website' style={{width:'400px'}}>
            <h4>  {' '}
            <i  class="fa-brands fa-stack-overflow fa-bounce"></i>
    Projectfair</h4>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cum accusantium error odit! Illum velit tempora nulla nemo quo.</p>
    <p>Lorem, quod recusandae excepturi rerum quae.</p>
         </div>
<div className='links d-flex flex-column'>
  <h4 className='mb-4'>Home</h4>
  <Link to={'/'} style={{textDecoration:"none",}}>Login</Link>
  <Link to={'/home'} style={{textDecoration:"none",}}>Project</Link>
  <Link to={'/watchhistory'} style={{textDecoration:"none",}}>Register</Link>

</div>
<div className='guides d-flex flex-column'>
<h4 className='mb-4'>Guides</h4>

<Link to={'https://react.dev/'} style={{textDecoration:"none",}}>React</Link>
<Link to={'https://react-bootstrap.github.io/'} style={{textDecoration:"none",}}>React Bootstrap</Link>
<Link to={'https://bootswatch.com/'} style={{textDecoration:"none",}}>Bootswatch</Link>

</div>
<div className='contact'>
<h4 className='mb-3 ms-4'>Contact Us</h4>
<div className='d-flex flex-column'>
  <input type="text" className='form-control' placeholder='Enter Your Email ID' />
<button className='btn btn-warning mt-3 mb-3'>Subscribe</button>
</div>
<div className='icon d-flex justify-content-evenly'>
<Link to={'https://www.instagram.com/?hl=en'} style={{textDecoration:"none"}}><i class="fa-brands fa-instagram"></i></Link>
<Link to={'https://twitter.com/?lang=en-in'} style={{textDecoration:"none"}}><i class="fa-brands fa-x-twitter"></i></Link>
<Link to={'https://in.linkedin.com/'} style={{textDecoration:"none"}}><i class="fa-brands fa-linkedin"></i></Link>
<Link to={'https://www.facebook.com/'} style={{textDecoration:"none"}}>
<i class="fa-brands fa-square-facebook"></i> </Link>

</div>

</div>
        </div>
        <p>Copyright &copy; 2023 Projectfair.Bulid with React</p>
    </div>

    </div>
  )
}

export default Footer