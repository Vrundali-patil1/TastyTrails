
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  '../customer/UpdateCustomerByIdComponent';
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";
import {getAllMealAxios ,deleteMealAxios, getMealByIdAxios, getResByMealIdAxios} from "../../../services/mealService/mealCrudAxios";
import { deleteResAxios, getAllResAxios } from "../../../services/restaurantService/restaurantCrusAxios";

export function GetAllMealComponent() {
        const [meal, setMeal] = useState([]);
        const [id, setId] = useState(0);
        const [mealId, setMealId] = useState(0);
       const navigate=useNavigate();
const p=useParams();

const [token, setToken] = useState(localStorage.getItem("token_admin"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        useEffect(() => {
                fetchMeal();
        }, []);

        async function fetchMeal() {
                try {
                        const response = await getMealByIdAxios(p.id);
                        console.log(response.data);
                        setMeal(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function fun() {
                try {
                        const response = await getResByMealIdAxios(meal[0].id);
                        console.log(response.data);
                    //    setMeal(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteMealById()  {
                try {
                        const response = await deleteMealAxios(mealId);
                        console.log(response.data);
                       fetchMeal();
                }
                catch (err) {
                        console.log(err);
                }
        }
const editRes=()=>
{
        <UpdateCustomerByIdComponent/>
}
        const deleteMeal=()=>
                {
                        const y=prompt("do u want to delete type 1");
                        console.log(y);
                        if(y=="1")
                                {
                                        console.log(mealId);
                                        deleteMealById() ;
                                        
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
                <LinkContainer to={`/add-meal/${p.id}`}> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}} onClick={()=>{
                        fun();
                }}>Add Meal</Button></NavLink>
                
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
          <th>MealName</th>
          <th>Price</th>
          <th>MealDescription</th>
          <th>MealImage</th>
          
         
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>   
                                {
                             meal.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.mealName}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.price}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.mealDescription}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.mealImage}</td>

               

                <td style={{backgroundColor:"#EBF5FB"}}>
                 <LinkContainer to={`/update-meal/${an.id}`}> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}} onClick={()=>{
                        fun();
                }}>Edit Meal</Button></NavLink>
                
                </LinkContainer></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setMealId(an.id);
                deleteMeal();
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