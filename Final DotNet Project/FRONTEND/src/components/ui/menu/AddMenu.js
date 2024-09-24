import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios
 from "axios";
 import { useNavigate, useParams } from "react-router-dom";
 import { Toast,ToastContainer } from "react-bootstrap";
import {getResByIdAxios, updateResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { getMenuByResIdAxios, saveMenuAxios } from "../../../services/menuService/menuCrudAxios";
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";


export const AddMenu = () => {



  const[menu,setMenu] = useState({Restaurant_Id:0});

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
const p=useParams();
//const p=2;

const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;


const handleCloseToast = () => {
  setShowToast(false);
}
const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}

const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    saveMenu();
  }

  async function saveMenu()
  {
    try{
     menu.Restaurant_Id=p.id;
     console.log(menu);
      const res=await saveMenuAxios(menu);
      //console.log(res);
      console.log("hee"+res.data.id);
      setShowToast(true);
      navigate(`add-meal/${res.data.id}`);
    }
    catch(err)
    {
      console.log("hereee"+err);
      setShowToastTwo(true);
      getMenu();
    }
  }

  async function getMenu()
  {
  try{
    const res=await getMenuByResIdAxios(menu.Restaurant_Id);
    console.log(res.data[0].id);
    navigate(`view-meal/${res.data[0].id}`);
  }
  catch(err)
  {
    console.log(err);
  }

  }


  const handleForm=(e)=>{

    setMenu({
      ...menu,
      [e.target.name]:e.target.value
    });
  }

  return (
  
         <Container className="mt-5" style={{backgroundColor:"#AED6F1",width:"900px",border:"1px solid white",borderRadius:"20px "}}>
         <Container style={{backgroundColor:"#AED6F1"}}>
          <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1"}}>
            <h2>Welcome to Menu </h2>
          </Alert>
         </Container>

         <Container  style={{backgroundColor:"#AED6F1"}}>
         <Row >
         
         <Form onSubmit={handleSubmit}  >
        
        
         <Row>
        <Col  className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
    Create Menu 
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
                    <Toast.Body className="text-white">menu created</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Problem in crating menut</Toast.Body>
                </Toast>
            </ToastContainer>
         </Container>
   
  );
};