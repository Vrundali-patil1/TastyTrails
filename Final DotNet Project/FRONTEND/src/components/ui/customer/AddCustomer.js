
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
import axios from "axios";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AddCustomer=() =>
{


const[customer,setCustomer] = useState({Username:'',Email:'',
  Password:'',ConfirmPassword:'',Phone:'', Category:'', Addr:'',City:'',Pincode:''
})
const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);

const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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
  setCustomer(
        {
          ...customer,
         [e.target.name]:e.target.value
     }
     );

}



function handleSubmit(e)
{
 
    e.preventDefault();
 //   console.log(address);
    console.log("here sub");
    save1();
    navigate("/see-all-customers");
}


async function save1()
{
  try{
    const res=await saveCustomerAxios(customer);
    console.log(res);
    if(res.status==201)
      {
        console.log("here fff sub");
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
 <h1>Add Customer</h1></Alert>
</Container>

<Container className=" "  >
<Row >
    
<Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
<Row>
<Form onSubmit={handleSubmit}  style={{width:"900px"}}>     
<Row>
<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail" >
<Form.Label>Username</Form.Label>
<Form.Control type="text" name="Username" onChange={handleForm}  placeholder="Enter Username" required/>
</Form.Group>
</Col>

<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail" >
<Form.Label>Email</Form.Label>
<Form.Control type="email" name="Email" onChange={handleForm}  placeholder="Enter Email" required/>
</Form.Group>
           

</Col>
</Row>

<Row>
<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Password</Form.Label>
<Form.Control type="password"  name="Password" onChange={handleForm} placeholder="Enter password" required />
</Form.Group>
       
</Col>

<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Confirm Password</Form.Label>
<Form.Control type="password"  name="ConfirmPassword" onChange={handleForm} placeholder="Enter  password to confirm" required />
</Form.Group>
        
           

</Col>
</Row>

<Row>
<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Phone</Form.Label>
<Form.Control type="tel" name="Phone" onChange={handleForm} placeholder="Enter phone" required />
</Form.Group>
   
       
</Col>

<Col lg={6}>
<Form.Group className="mb-3"  controlId="formBasicCheckbox" >
<Form.Check type="radio" name="Category" value="customer" onClick={handleForm} label="customer" required />
<Form.Check type="radio" name="Category" value="admin" onClick={handleForm} disabled label="admin"  required/>

</Form.Group>
        
           

</Col>
</Row>

<Row>
<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Location</Form.Label>
 <Form.Control type="text"  name="Addr" onChange={handleForm} placeholder="Enter  location" required />
</Form.Group>
       
</Col>

<Col lg={6}>

<Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label>City</Form.Label>
                 <Form.Control type="text"  name="City" onChange={handleForm} placeholder="Enter  city" required />
               </Form.Group>

</Col>
</Row>

<Row>
<Col lg={6}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Pincode</Form.Label>
<Form.Control type="text"  name="Pincode" onChange={handleForm} placeholder="Enter Pincode" required />
</Form.Group>   
            
       
</Col>

</Row>


<Col lg={6} className=" d-flex justify-content-center">
<Button style={{backgroundColor:"#82E0AA "}} type="submit" >
Add Customers
</Button>
</Col>




</Form>

</Row>

              
              

</Col>


               <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
              
               <Col lg={6} className=" d-flex justify-content-center">

<LinkContainer to="/see-all-customers"> 
<NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>

</LinkContainer>


</Col>
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


