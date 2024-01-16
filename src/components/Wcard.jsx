import React from 'react'
import Card from 'react-bootstrap/Card';
import titleimage from '../imeges/Screenshot (10).png'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import {BASE_URL} from '../services/baseurl'


function Wcard({project}) {
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <div>
         <Card style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.proimage}`:titleimage} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
        
       
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={titleimage} alt="" width={'100%'} />

            </Col>
            <Col md={6}>
            <p>{project.overview}</p>
            <p><span className='fw-bold'>Technologies</span>:{project.language}</p>
            </Col>

          </Row>
          <div className='d-flex'>
            
            <a style={{color:'grey'}} href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{color:'grey'}} href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>

          </div>



        </Modal.Body>
       
      </Modal>
    
    </div>
  )
}

export default Wcard