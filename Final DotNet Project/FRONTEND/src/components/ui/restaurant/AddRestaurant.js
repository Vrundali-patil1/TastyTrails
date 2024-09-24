
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAddress } from '../../../services/addressService/addressCrudAxios';
import { saveCustomerAxios} from '../../../services/customerService/customerCrudAxios';
import { Toast,ToastContainer,Container } from "react-bootstrap";
import { Navbar ,Nav,NavLink,NavbarBrandn,NavbarCollapse} from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";

import { Alert } from 'react-bootstrap';
import { saveResAxios } from '../../../services/restaurantService/restaurantCrusAxios';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const AddRestaurant=() =>
{



  const[restaurnat,setRestaurnat] = useState({Name:'',Description: '',Location:'',RestaurantImage:''})

  const [token, setToken] = useState(localStorage.getItem("token_admin"));
  //to set defaults of axios header
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);

const navigate=useNavigate();

const handleCloseToast = () => {
  setShowToast(false);
}

const handleCloseToastTwo = () => {
setShowToastTwo(false);
}

function handleForm(e)
{
  //console.log("here");
setRestaurnat(
        {
          ...restaurnat,
         [e.target.name]:e.target.value
     }
     );

}



function handleSubmit(e)
{
 
    e.preventDefault();
 //   console.log(address);
   // console.log("here sub");
    save1();
    navigate("/see-all-restaurants");
}


async function save1()
{
  try{
    const res=await saveResAxios(restaurnat);
    console.log(res);
    if(res.status==200)
      {
        setShowToast(true);
      }
      
  }
  catch(err)
  {
    setShowToastTwo(true);
    console.log(err);
  }
}





    return(
        <>
       <Container >


<Container>
 <Alert className="mt-2 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1",border:"1px solid white",borderRadius:"20px "}}>
 <h1>Add Restaurnt</h1></Alert>
</Container>

<Container className=" d-flex justify-content-center"  >
<Row >
       <Col  style={{backgroundColor:"#AED6F1",border:"1px solid white",borderRadius:"20px "}}>
       <Form onSubmit={handleSubmit}  >
         <Row>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="Name" onChange={handleForm}  placeholder="restaurnt name" />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="Description" onChange={handleForm}  placeholder="restaunrt descrption" />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>location</Form.Label>
        <Form.Control type="text" name="Location" onChange={handleForm}  placeholder="restaurnt location" />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>restaurant image</Form.Label>
         <Form.Control type="text" name="RestaurantImage" onChange={handleForm}  placeholder="restaurnat image" />
      </Form.Group>
         </Col>
         
         </Row>
        
         <Row>
        <Col  className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
      Add restarnt
      </Button>
        </Col>
        <Col lg={6} className=" d-flex justify-content-center">

<LinkContainer to="/see-all-restaurants"> 
<NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>

</LinkContainer>


</Col>
         </Row>
         
                </Form>
       </Col>
</Row>
</Container>

<ToastContainer position="top-end">
       <Toast bg="success" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
           <Toast.Header>
               <strong className="me-auto">Confirmation</strong>
           </Toast.Header>
           <Toast.Body className="text-white">customer registered</Toast.Body>
       </Toast>
   </ToastContainer>

   <ToastContainer position="top-end">
       <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
           <Toast.Header>
               <strong className="me-auto">Confirmation</strong>
           </Toast.Header>
           <Toast.Body className="text-white">cusotmer NOT registered</Toast.Body>
       </Toast>
   </ToastContainer>
</Container>

        </>
    )
}


