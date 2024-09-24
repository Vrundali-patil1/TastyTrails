import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useState } from "react";
import axios
 from "axios";

import { Toast,ToastContainer } from "react-bootstrap";
import { Navbar ,Nav,NavLink,NavbarBrandn,NavbarCollapse} from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";
import { saveCustomerAxios } from "../../services/customerService/customerCrudAxios";

import { useNavigate } from "react-router-dom";
export const SignUp = () => {

const [customer,setCustomer]=useState({Username:'',Email:'',
  Password:'',ConfirmPassword:'',Phone:'', Category:'', Addr:'',City:'',Pincode:''});
const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
const [sp,setSp]=useState("");const [sppass,setSpPass]=useState("");
const [spphone,setSpPhone]=useState("");
const [sppin,setSpPin]=useState("");
const [sppadd,setSpAdd]=useState("");
const [spci,setSpCity]=useState("");
const [flag,setFlag]=useState(false);


const navigate= useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validate())
    {
      saveCustomer();
    }
    else
    {
alert("give proper data");
    }
    
  }


  function validate()
  {
    if(customer.Username.length <4)
    {
     setSp("length should have to be grtehr tahn 4");
    }
    else
    {
      setSp(" ");
      
    }

    if(customer.Phone.length !=10)
      {
       setSpPhone("phone msut be 10 digit");
      }
      else
      {
        setSpPhone(" ");
      }

      if(customer.Addr.length <4)
        {
         setSpAdd("length must grth tahn 4"
         );
        }
        else
        {
         setSpAdd(" ");
        }

        if(customer.City.length <3)
          {
       setSpCity("legth should be gretha tahn 2");
          }
          else
          {
            setSpCity(" ");
          }
      

          if(customer.Pincode.length <6)
            {
           setSpPin("legth should be gretha tahn 6");
            }
            else
            {
              setSpPin(" ");
            }
        
    
          

    
  


    if(customer.Password.length > 4 )
      {
        if((customer.Password != customer.ConfirmPassword))
        {
          setSpPass("length should have to be grtehr tahn 4 and password and confirm password should match");
        }
        else{
          setSpPass("");
        }
        
      }
      else
      {
        setSpPass("length should have to be grtheab than 4");
      }


if(customer.Username.length > 3 && customer.Password.length > 3 && customer.Pincode.length  >5  && customer.Addr.length >3
  && customer.City.length >1 
)
{
return true;
}
else{
  return false;
}
      
  }
  const handleCloseToast = () => {
    setShowToast(false);
}

const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}

  async function saveCustomer()
  {
    try{
      console.log("tttttttt");
      const res=await saveCustomerAxios(customer);
      
      console.log(res);
      if(res.status==201)
        {
          setShowToast(true);
          navigate("/log-in");
        }
        
    }
    catch(err)
    {
      setShowToastTwo(true);
      console.log(err);
    }
  }

  const handleForm=(e)=>{

    console.log(e.target.value);
    setCustomer({
      ...customer,
      [e.target.name]:e.target.value 
    });
  }

  return (
  
         <Container >


         <Container>
          <Alert className="mt-2 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1",border:"1px solid white",borderRadius:"20px "}}>
          <h1>Welcome to Customer Sign Up</h1></Alert>
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
        <Form.Control type="text" name="Username" onChange={handleForm}  onKeyUp ={ validate} placeholder="Enter Username" required/>
        <span style={{color:"red"}}>{sp}</span>
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
     <Form.Control type="password"  name="Password" onChange={handleForm} onKeyUp ={validate} placeholder="Enter password" required />
     <span style={{color:"red"}}>{sppass}</span>
   </Form.Group>
                
      </Col>

      <Col lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Confirm Password</Form.Label>
     <Form.Control type="password"  name="ConfirmPassword" onChange={handleForm}  onKeyUp ={validate} placeholder="Enter  password to confirm" required />
     <span style={{color:"red"}}>{sppass}</span>
   </Form.Group>
                 
                    
      
      </Col>
    </Row>

    <Row>
      <Col lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Phone</Form.Label>
       <Form.Control type="tel" name="Phone" onChange={handleForm}  onKeyUp ={validate}  placeholder="Enter phone" required />
       <span style={{color:"red"}}>{spphone}</span>
     </Form.Group>
            
                
      </Col>

      <Col lg={6}>
      <Form.Group className="mb-3"  controlId="formBasicCheckbox" >
        <Form.Check type="radio" name="Category" value="customer" onClick={handleForm} label="customer"  required />
        <Form.Check type="radio" name="Category" value="admin" onClick={handleForm} disabled label="admin"  required/>
       
      </Form.Group>
                 
                    
      
      </Col>
    </Row>

    <Row>
      <Col lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text"  name="Addr" onChange={handleForm}  onKeyUp ={validate} placeholder="Enter  location" required />
          <span style={{color:"red"}}>{sppadd}</span>
        </Form.Group>
                
      </Col>

      <Col lg={6}>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>City</Form.Label>
                          <Form.Control type="text"  name="City" onChange={handleForm}  onKeyUp ={validate}  placeholder="Enter  city" required />
                          <span style={{color:"red"}}>{spci}</span>
                        </Form.Group>
       
      </Col>
    </Row>

    <Row>
      <Col lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pincode</Form.Label>
        <Form.Control type="text"  name="Pincode" onChange={handleForm}  onKeyUp ={validate}  placeholder="Enter Pincode" required />
        <span style={{color:"red"}}>{sppin}</span>
      </Form.Group>   
                     
                
      </Col>

    </Row>


    <Col lg={6} className=" d-flex justify-content-center">
     <Button style={{backgroundColor:"#82E0AA "}} type="submit" >
        Sign Up
      </Button>
     </Col>




</Form>

         </Row>
        
                       
                       
 
         </Col>
      

                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                       
                        <Col lg={6} className=" d-flex justify-content-center">
    
    <LinkContainer to="/log-in"> 
    <NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Log In</Button></NavLink>
    
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
   
  );
};