
import { LinkContainer} from "react-router-bootstrap";
import { Nav,NavLink} from "react-bootstrap";
import {Container,Row} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {Button} from "react-bootstrap";
import { getCustomerByIdAxios } from "../../../services/customerService/customerCrudAxios";
import {Col} from "react-bootstrap";
import { deleteOrderByCustAxios } from "../../../services/orderService/orderCrudAxios";
import axios from "axios";

export function CustomerPage()
{
    const[customer,setCustomer] = useState({Username:'',Email:'',
        Password:'',ConfirmPassword:'',Phone:'',  Addr:'',City:'',Pincode:''
    })
        const navigate=useNavigate();
        const p=useParams();
        console.log(p);
        

        const [token, setToken] = useState(localStorage.getItem("token_customer"));
        //to set defaults of axios header
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;


useEffect(()=>{
    getUser();
  },[])
  //delMealByCustId

  async function  deleteCartById()  {
    try {
       // console.log("rrrrrrrrr"+mealId);
            const response = await deleteOrderByCustAxios(p.id);
            console.log(response.data);
          // get();
          tokFun();
    }
    catch (err) {
            console.log(err);
    }
}

  const delMealByCustId=()=>
    {
            const y=prompt("do u want to leave type 1");
            console.log(y);
            if(y== "1")
                    {
                            deleteCartById() ;
                            
                    }
                   
                    
    }

  const  tokFun = () => {
        localStorage.removeItem("token_customer");
        localStorage.clear();
        navigate("/");
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

        return(
                <>
                
               <Container>

               <Row>
                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Row className="mb-4">
                <LinkContainer to={`/see-res-by-location/${customer.city}/${customer.id}`}> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>See Located Restaurnats</Button></NavLink>
                
                </LinkContainer>

                </Row>
              
                

                <Row className="mb-4">
               
    
    
  <Col lg={6}>
  <Button style={{backgroundColor:"#82E0AA "}} onClick={delMealByCustId}>Log Out</Button>
  </Col>
    
   

   

                </Row>
                       
                        </Col>

                        <Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                        
                        </Col>
                </Row>
               
               
               </Container>
     
                </>
        );
}