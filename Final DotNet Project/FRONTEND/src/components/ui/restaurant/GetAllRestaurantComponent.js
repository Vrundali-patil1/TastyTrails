
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  '../../../components/ui/customer/UpdateCustomerByIdComponent';

import { getAllCustomerAxios,deleteCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import { deleteResAxios, getAllResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";

export function GetAllRestaurantComponent() {
        const [rest, setRes] = useState([]);
        const [id, setId] = useState(0);


        const [token, setToken] = useState(localStorage.getItem("token_admin"));
        //to set defaults of axios header
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        
       const navigate=useNavigate();

        useEffect(() => {
                fetchRestaurant();
        }, []);

        async function fetchRestaurant() {
                try {
                        const response = await getAllResAxios()
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
                        const y=prompt("do u want to delete type 1");
                        console.log(y);
                        if(y=="1")
                                {
                                        console.log(id);
                                        deleteResById() ;
                                        
                                }
                               
                }

               

        return (
                <>
<Container>
                <Row>
                <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Row className="mb-4">
                       <LinkContainer to="/admin-page"> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>
                
                </LinkContainer>
                       </Row>
                <Row className="mb-4">
                <LinkContainer to="/add-restaurant"> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Add Restaurant</Button></NavLink>
                
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
         
          <th>Edit</th>
          <th>Delete</th>

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

                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-info"
                onClick={()=>{
                        setId(an.id);
                      // addMenu();
                navigate(`add-menu/${an.id}`);
                }} >Go For Menu </Button></td>

                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                       editRes();
               navigate(`update-restaurant/${an.id}`);
                }} >Edit</Button></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                deleteRes();
                }} >Delete</Button></td>
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