import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios
 from "axios";
 import { useParams } from "react-router-dom";
 import { Toast,ToastContainer } from "react-bootstrap";
import { getCustomerByIdAxios,updateCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import { getMealByIdAxios,getMealByMealIdAxios,updateMealAxios } from "../../../services/mealService/mealCrudAxios";

import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";

export const UpdateMealByIdComponent = () => {



  const[meal,setMeal] = useState({MealName:'',Price:'',MealDescription:'',MealImage:'',Menu_Id:''
})

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
const p=useParams();
// const p=2;

const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;


useEffect(()=>{
  getMeal();
},[])


const handleCloseToast = () => {
  setShowToast(false);
}
const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}


  const handleSubmit=(e)=>{
    e.preventDefault();
    saveMeal();
  }

  async function saveMeal()
  {
    try{
     
      const res=await updateMealAxios(meal);
      console.log(res);
      setShowToast(true);
    }
    catch(err)
    {
      console.log(err);
      setShowToastTwo(true);
    }
  }

  async function getMeal(){
    try{
      const res=await getMealByMealIdAxios(p.id);
      setMeal(res.data[0]);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleForm=(e)=>{

    setMeal({
      ...meal,
      [e.target.name]:e.target.value
    });
  }

  return (
  
         <Container className="mt-5" style={{backgroundColor:"#AED6F1",width:"900px",border:"1px solid white",borderRadius:"20px "}}>
         <Container style={{backgroundColor:"#AED6F1"}}>
          <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1"}}>
            <h2>Welcome to meal Updation</h2>
          </Alert>
         </Container>

         <Container  style={{backgroundColor:"#AED6F1"}}>
         <Row >
         
         <Form onSubmit={handleSubmit}  >
         <Row>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>meal name</Form.Label>
        <Form.Control type="text" name="MealName" onChange={handleForm}  placeholder={meal.mealName} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>price</Form.Label>
        <Form.Control type="text" name="Price" onChange={handleForm}  placeholder={meal.price} />
      </Form.Group>
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>meal Description</Form.Label>
        <Form.Control type="text" name="MealDescription" onChange={handleForm}  placeholder={meal.mealDescription} />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>meal Image</Form.Label>
         <Form.Control type="text" name="MealImage" onChange={handleForm}  placeholder={meal.mealImage} />
      </Form.Group>
         </Col>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>menu id</Form.Label>
        <Form.Control type="text" name="Menu_Id" onChange={handleForm} placeholder={meal.menu_Id} />
      </Form.Group>
         </Col>
         </Row>
        
     
         <Row>
        <Col  className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
      Update meal
      </Button>
        </Col>
        <Col lg={6} className=" d-flex justify-content-center">

<LinkContainer to={`/view-meal/${meal.menu_Id}`}> 
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
                    <Toast.Body className="text-white">meal Edited</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Problem in editing meal</Toast.Body>
                </Toast>
            </ToastContainer>
         </Container>
   
  );
};