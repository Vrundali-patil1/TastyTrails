import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios
 from "axios";
 import { useParams } from "react-router-dom";
 import { Toast,ToastContainer } from "react-bootstrap";
import { getCustomerByIdAxios,updateCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";

export const UpdateCustomerByIdComponent = () => {



  const[customer,setCustomer] = useState({Username:'',Email:'',
    Password:'',ConfirmPassword:'',Phone:'',  Addr:'',City:'',Pincode:''
})

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
const p=useParams();

const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;


useEffect(()=>{
  getUser();
},[])


const handleCloseToast = () => {
  setShowToast(false);
}
const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}


  const handleSubmit=(e)=>{
    e.preventDefault();
    saveCustomer();
  }

  async function saveCustomer()
  {
    try{
     
      const res=await  updateCustomerAxios(customer);
      console.log(res);
      setShowToast(true);
    }
    catch(err)
    {
      console.log(err);
      setShowToastTwo(true);
    }
  }

  async function getUser(){
    try{
      const res=await getCustomerByIdAxios(p.id);
      setCustomer(res.data[0]);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleForm=(e)=>{

    setCustomer({
      ...customer,
      [e.target.name]:e.target.value
    });
  }

  return (
  
         <Container className="mt-5" style={{backgroundColor:"#AED6F1",width:"900px",border:"1px solid white",borderRadius:"20px "}}>
         <Container style={{backgroundColor:"#AED6F1"}}>
          <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1"}}>
            <h2>Welcome to Customer Updation</h2>
          </Alert>
         </Container>

         <Container  style={{backgroundColor:"#AED6F1"}}>
         <Row >
         
         <Form onSubmit={handleSubmit}  >
         <Row>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="Email" onChange={handleForm}  placeholder={customer.email} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="Username" onChange={handleForm} onKeyUp={getUser} placeholder={customer.username} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" name="Password" onChange={handleForm} onKeyUp={getUser} placeholder={customer.password} />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>Confirm Password</Form.Label>
         <Form.Control type="text" name="ConfirmPassword" onChange={handleForm} onKeyUp={getUser} placeholder={customer.confirmPassword} />
      </Form.Group>
         </Col>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="Phone" onChange={handleForm} placeholder={customer.phone} />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Location</Form.Label>
        <Form.Control type="textarea" name="Addr" onChange={handleForm}  placeholder={customer.addr} />
      </Form.Group>
         </Col>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="City" onChange={handleForm} placeholder={customer.city} />
      </Form.Group>
         </Col>
         </Row>
      <Row>
      <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pincode</Form.Label>
        <Form.Control type="text" name="Pincode" onChange={handleForm} placeholder={customer.pincode} />
      </Form.Group>
         </Col>
      </Row>
         <Row>
        <Col  lg={6} className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
      Update Customer
      </Button>
        </Col>
        <Col lg={6} className=" d-flex justify-content-center">

       <LinkContainer to="/see-all-customers"> 
       <NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>
       
       </LinkContainer>

      
</Col>
         </Row>
         
                </Form>
            
         </Row>
         </Container>
         <ToastContainer position="top-end">
                <Toast bg="warning" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Customer Edited</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Problem in editing customer</Toast.Body>
                </Toast>
            </ToastContainer>
         </Container>
   
  );
};