
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  '../../../components/ui/customer/UpdateCustomerByIdComponent';

import { getAllCustomerAxios,deleteCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import { deleteResAxios, getAllResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";
import { getAllResByCityAxios } from "../../../services/restaurantService/restaurantCrusAxios";

export function GetAllResByCity() {
        const [rest, setRes] = useState([]);
        var[va,setVa]=useState(0);
        const [id, setId] = useState(0);
       const navigate=useNavigate();
const p=useParams();
console.log(p.city);
va=p.id;


const [token, setToken] = useState(localStorage.getItem("token_customer"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;


        useEffect(() => {
                fetchRestaurant();
        }, []);

        async function fetchRestaurant() {
                try {
                        const response = await getAllResByCityAxios(p.city);
                        console.log(response.data);
                        setRes(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteResById()  {
                try {
                        const response = await deleteResAxios(id);
                        console.log(response.data);
                       fetchRestaurant();
                }
                catch (err) {
                        console.log(err);
                }
        }
const editRes=()=>
{
        <UpdateCustomerByIdComponent/>
}
        const deleteRes=()=>
                {
                        const y=prompt("do u want to delete type yes else no");
                        console.log(y);
                        if(y=="yes")
                                {
                                        deleteResById() ;
                                        
                                }
                               
                }

               

        return (
                <>
<Container>
                <Row>
                <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Row className="mb-4">
                        <LinkContainer to={`/customer-page/${p.id}`}> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>
                
                </LinkContainer>
                       </Row>
              
                        </Col>

                        <Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                        <Container className="mb-3">
   <Container >
                    
     
   <Table striped bordered hover style={{backgroundColor:"#AED6F1",marginTop:"20px"}}>
                     
   <thead>
        <tr>
        
        <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Restaurant Image</th>
          <th>Menu</th>
         
          

        </tr>
      </thead>   
                                {
                             rest.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.name}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.description}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.location}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.restaurantImage}</td>

                <td style={{backgroundColor:"#EBF5FB"}}>
                
                
                
<LinkContainer to={`/view-meal-customer/${an.id}/${va}`}> 
<NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}} >View Menu</Button></NavLink>

</LinkContainer>

</td>

        </tr>
      </tbody>
                                              
                                                        
                                        );
                                })
                        }
                        </Table>
                               
                      
                      </Container>
                      </Container>
                        </Col>
                </Row>

            
           </Container> 
                </>
        );
}