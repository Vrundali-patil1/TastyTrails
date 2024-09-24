
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  './UpdateCustomerByIdComponent';
import { LinkContainer } from "react-router-bootstrap";
import { Nav,NavLink} from "react-bootstrap";
import { getAllCustomerAxios,deleteCustomerAxios } from "../../../services/customerService/customerCrudAxios";



export function GetAllCustomerComponent() {
        const [customer, setCustomer] = useState([]);
        const [id, setId] = useState(0);
       const navigate=useNavigate();

       //set token from session storage
  const [token, setToken] = useState(localStorage.getItem("token_admin"));
  //to set default header in axios
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  let header = {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      };
      
        useEffect(() => {
                fetchCustomer();
        }, []);

        async function  fetchCustomer() {
                try {
                        const response = await getAllCustomerAxios();
                        console.log(response.data);
                        setCustomer(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteCustomerById()  {
                try {
                        const response = await deleteCustomerAxios(id);
                        console.log(response.data);
                       fetchCustomer();
                }
                catch (err) {
                        console.log(err);
                }
        }
const editUser=()=>
{
        <UpdateCustomerByIdComponent/>
}
        const deleteUser=()=>
                {
                        const y=prompt("do u want to delete type 1 ");
                        console.log(y);
                        if(y=="1")
                                {
                                        console.log(id);
                                        deleteCustomerById() ;
                                        
                                }
                               
                }



        return(
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
                <LinkContainer to="/add-customer"> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Add Customer</Button></NavLink>
                
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
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>ConfirmPassword</th>
          <th>Phone</th>
          <th>Address</th>
          <th>City</th>
          <th>Pincode</th>
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>   
                                {
                              customer.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.username}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.email}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.password}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.confirmPassword}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.phone}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.addr}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.city}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.pincode}</td>
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                      // editUser();
               navigate(`edit-customer/${an.id}`);
                }} >Edit</Button></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                deleteUser();
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