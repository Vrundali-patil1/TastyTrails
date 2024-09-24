import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios
 from "axios";
 import { useParams } from "react-router-dom";
 import { Toast,ToastContainer } from "react-bootstrap";
import {getResByIdAxios, updateResAxios } from "../../../services/restaurantService/restaurantCrusAxios";

import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";

export const UpdateRestaurantByIdComponent = () => {



  const[restaurnat,setRestaurnat] = useState({Name:'',Description: '',Location:'',RestaurantImage:''})

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
const p=useParams();
//const p=2;
const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;


useEffect(()=>{
  getRes();
},[])


const handleCloseToast = () => {
  setShowToast(false);
}
const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}


  const handleSubmit=(e)=>{
    e.preventDefault();
    saveRes();
  }

  async function saveRes()
  {
    try{
     
      const res=await updateResAxios(restaurnat);
      console.log(res);
      setShowToast(true);
    }
    catch(err)
    {
      console.log(err);
      setShowToastTwo(true);
    }
  }

  async function getRes(){
    try{
      const res=await getResByIdAxios(p.id);
      setRestaurnat(res.data[0]);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleForm=(e)=>{

    setRestaurnat({
      ...restaurnat,
      [e.target.name]:e.target.value
    });
  }

  return (
  
         <Container className="mt-5" style={{backgroundColor:"#AED6F1",width:"900px",border:"1px solid white",borderRadius:"20px "}}>
         <Container style={{backgroundColor:"#AED6F1"}}>
          <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1"}}>
            <h2>Welcome to Restaurant Updation</h2>
          </Alert>
         </Container>

         <Container  style={{backgroundColor:"#AED6F1"}}>
         <Row >
         
         <Form onSubmit={handleSubmit}  >
         <Row>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="Name" onChange={handleForm}  placeholder={restaurnat.name} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="Description" onChange={handleForm}  placeholder={restaurnat.description} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>location</Form.Label>
        <Form.Control type="text" name="Location" onChange={handleForm}  placeholder={restaurnat.location} />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>restaurant image</Form.Label>
         <Form.Control type="text" name="RestaurantImage" onChange={handleForm}  placeholder={restaurnat.restaurantImage} />
      </Form.Group>
         </Col>
         
         </Row>
        
         <Row>
        <Col  className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
      Update restarnt
      </Button>
        </Col>
        <Col lg={6} className=" d-flex justify-content-center">

<LinkContainer to="/see-all-restaurants"> 
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
                    <Toast.Body className="text-white">restaurant Edited</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Problem in editing restaurant</Toast.Body>
                </Toast>
            </ToastContainer>
         </Container>
   
  );
};