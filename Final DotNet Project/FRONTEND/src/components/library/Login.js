import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast,ToastContainer } from "react-bootstrap";
import { Navbar ,Nav,NavLink,NavbarBrandn,NavbarCollapse} from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";


export const Login = () => {

const [customer,setCustomer]=useState({Email:'',Password:''});
const [showToast, setShowToast] = useState(false);

const navigate=useNavigate();

  const handleSubmit=(e)=>{
        e.preventDefault();
   chkCustomer();
  }

  const handleCloseToast = () => {
    setShowToast(false);
}


  async function chkCustomer()
  {
    try{
      console.log(customer);
      const res=await axios.get(`https://localhost:7125/login/${customer.Email}/${customer.Password}`);
      console.log(res.data.user);
      console.log(res.data);
      localStorage.setItem(`token_${res.data.user.category}`, res.data.token);

      if(res.status===200 && res.data.user.category==="customer")
        {
                navigate(`/customer-page/${res.data.user.id}`);
        }
        else  if(res.status===200 && res.data.user.category==="admin")
        {
          navigate("/admin-page");
        }
          else
          {
            setShowToast(true);
            console.log("else");
            
          }
    }
    catch(err)
    {
      console.log(err);
      setShowToast(true);
    }
  }

  const handleForm=(e)=>{
e.preventDefault();
    setCustomer({
      ...customer,
      [e.target.name]:e.target.value
    });
  }

  return (<>
           <Container >

            <Container>
          <Alert className="mt-5 d-flex justify-content-center text-green" style={{backgroundColor:"#AED6F1",border:"1px solid white",borderRadius:"20px "}}>
          <h2>Welcome To TastyTrails APP </h2></Alert>
         </Container>


         <Row>
          
                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Col lg={5} className="  d-flex justify-content-center"  >

<LinkContainer to="/sign-up"> 
<NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Sign Up</Button></NavLink>

</LinkContainer>


</Col>
                       
                        </Col>
                       

                        <Col lg={6} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                   
                   <Form onSubmit={handleSubmit}  >
     
       

  
         <Col lg={7} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email</Form.Label>
     <Form.Control type="text" name="Email" onChange={handleForm} placeholder="Enter username" required/>
   </Form.Group>
             
         </Col  >

         <Col lg={7} ><Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Password</Form.Label>
<Form.Control type="password"  name="Password" onChange={handleForm} placeholder="Enter password" required/>
</Form.Group> </Col>

<Col>   <Button style={{backgroundColor:"#82E0AA ",width:300,height:40}} type="submit" >
       Log  In
      </Button></Col>

                       
  
     
    
                        

                        </Form>
                       
                        </Col>
                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Col lg={5} className="  d-flex justify-content-center"  >

<LinkContainer to="/about-us"> 
<NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>About Us</Button></NavLink>

</LinkContainer>


</Col>
                       
                        </Col>
                        

                   

                   </Row>
                       
                       
                       

                  
              

                <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Something is wrong in username or password</Toast.Body>
                </Toast>
            </ToastContainer>

           </Container>  
        </>)
}