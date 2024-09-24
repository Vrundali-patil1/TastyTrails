
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  '../customer/UpdateCustomerByIdComponent';
import { LinkContainer } from "react-router-bootstrap";
import {NavLink} from "react-bootstrap";
import {getAllMealAxios ,deleteMealAxios, getMealByIdAxios, getResByMealIdAxios, GetMealByResIdAxios} from "../../../services/mealService/mealCrudAxios";
import { deleteResAxios, getAllResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { getMenuByResIdAxios } from "../../../services/menuService/menuCrudAxios";
import { deleteOrderAxios, deleteOrderByCustAxios, getOrderByIdAxios, saveOrderAxios, updateOrderAxios } from "../../../services/orderService/orderCrudAxios";
import { Image} from "react-bootstrap";
import upi from "../../../imgs/upi.jpeg";

export function GetMealByResId() {
        const [meal, setMeal] = useState([]);
        const [oo, setOo] = useState([]);
        const [oobill, setOoBill] = useState([]);
        const [order,setOrder] = useState({
            PaymentType:'',Quantity:'',Delivery:'',TransactionId:'',Customer_Id:'',Meal_Id:''
        });

        const [token, setToken] = useState(localStorage.getItem("token_customer"));
        //to set defaults of axios header
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        
        var a=0;

        const [id, setId] = useState(0);
        const [mealId, setMealId] = useState(0);
       const navigate=useNavigate();
const p=useParams();
console.log(p);


        useEffect(() => {
                fetchMeal();
                get();
        }, []);

        async function fetchMeal() {
                try {
                        const response = await getMenuByResIdAxios(p.id);
                        console.log(response.data[0].id);
                        fun(response.data[0].id);
                       // setMeal(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function saveedit() {
            try {
                    const response = await updateOrderAxios(order);
                    console.log("saaaav"+response.data);
                   get();
                
            }
            catch (err) {
                    console.log(err);
            }
    }

        async function save() {
            try {
                console.log("saaaa jjj");
              
                    const response = await saveOrderAxios(order);
                    console.log("saaaav"+response.data);
                   get();
                
            }
            catch (err) {
                    console.log(err);
            }
    }
    async function get() {
        try {
                const response = await getOrderByIdAxios(p.cust);
                console.log(response.data);
             setOo(response.data);
            
        }
        catch (err) {
                console.log(err);
        }
}


        async function fun(id) {
                try {
                        const response = await getMealByIdAxios(id);
                        console.log(response.data);
                      setMeal(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

      

        async function  deleteOrderById()  {
                try {
                    console.log("rrrrrrrrr"+mealId);
                        const response = await deleteOrderAxios(mealId);
                        console.log(response.data);
                       get();
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteCartById()  {
            try {
                console.log("rrrrrrrrr"+mealId);
                console.log("rrrrrrrrr uuu"+p.cust);
                    const response = await deleteOrderByCustAxios(p.cust);
                    console.log(response.data);
                   get();
                   setB(0);
                   setV(0);
                   console(v);
            }
            catch (err) {
                    console.log(err);
            }
    }
const editRes=()=>
{
        <UpdateCustomerByIdComponent/>
}

function handleForm(e)
{
    console.log();
    setOrder({
        
        ...order,
            Customer_Id:p.cust,
        Meal_Id:a,
            Delivery:true,
            TransactionId:0,
            PaymentType:"online",
            Quantity:prompt("add quantity")
          
    });
    save();
}

function handleFormEdit(e)
{
    console.log();

    saveedit();
}


        const deleteOrder=()=>
                {
                        const y=prompt("do u want to delete type 1");
                        console.log(y);
                        if(y== "1")
                                {
                                        deleteOrderById() ;
                                        
                                }
                               
                }
                const emptyCart=()=>
                    {
                            const y=prompt("do u want to delete type 1");
                            console.log(y);
                            if(y== "1")
                                    {
                                            deleteCartById() ;
                                            
                                    }
                                   
                    }
                    var total = 0; 
function bill()
{
setOoBill(0);
billG();
}
const [mealBill,setMealBill]=useState(0);   
const [b,setB]=useState(0);   
async function billG() {
        try {
                const response = await getOrderByIdAxios(p.cust);


                console.log(response.data);
             setOoBill(response.data);

             const res = await getAllMealAxios();
             console.log(res.data);
             setMealBill(res.data);



            oobill.map((v)=>{
                var x=0;
                x=parseInt(v.quantity);
                var y=0;
                if(v.meal_Id)
                {
                        mealBill.map((k)=>{
                                        if(v.meal_Id==k.id)
                                        {
                                                y=k.price;
                                               // console.log(y);
                                        }
                                        return 1;
                        })
                }
                var z = parseInt(y);
                total=total+x*z;
              //  console.log(v.quantity);
                console.log(total);
                setB(total);
                return total;
            })
            
        }
        catch (err) {
                console.log(err);
        }
}

const[v,setV]=useState(0);

function payOnline()
{
setV(1);
}
         

        return (
                <>
<Container>
                <Row>

                    <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <Row className="mb-4">
                     <Col lg={6}>
                     <LinkContainer to={`/customer-page/${p.cust}`}> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Go Back</Button></NavLink>
                
                </LinkContainer>
                     </Col>
                <Col lg={4}>
        
       
                <h6>Bill : {b}</h6>
                </Col>
                       </Row>
                <Row className="mb-4">
              <Col lg={6}>
              <Button 
                 className="bg-danger"
                onClick={
                     
                emptyCart
                } >Empty Entire Cart</Button>
              </Col>
              <Col lg={4}>
              <Button 
                 className="bg-warning"
                onClick={
                     
               payOnline
                } onMouseEnter={bill}>Pay Online</Button>
              </Col>

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
          
         
          <th>Add To Cart</th>
                

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

           
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
              onClick={
              handleForm
           
              }
                onMouseEnter={()=>{a=an.id}}>Add To Cart</Button></td>


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
                <Row>
                <Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                        <Container className="mb-3">
   <Container >
                    
     
   <Table striped bordered hover style={{backgroundColor:"#AED6F1",marginTop:"20px"}}>
                     
   <thead>
        <tr>
        
        <th>Id</th>
          <th>PaymentType</th>
          <th>Quantity</th>
          <th>Delivery</th>
          <th>Customer_Id</th>
          <th>Meal_Id</th>
         
          <th>Edit</th>
          <th>Remove From Cart</th>

        </tr>
      </thead>   
                                {
                             oo.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.paymentType}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.quantity}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.delivery}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.customer_Id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.meal_Id}</td>
               

                <td style={{backgroundColor:"#EBF5FB"}}><Button value={an.meal_Id}
                 className="bg-danger"
                 onClick={()=>{
                    setOrder({
                        Id:an.id,
                        Customer_Id:an.customer_Id,
                        Meal_Id:an.meal_Id,
                            Delivery:true,
                            TransactionId:0,
                            PaymentType:"online",
                            Quantity:prompt("add quantity")  
                    });
                    a=an.id;
                    console.log(a);
                  handleFormEdit();
               
                  }} >Edit</Button></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setMealId(an.id);
                deleteOrder();
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
                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
        {v==1?                <img
            className="d-block w-100 custom-carousel-image"
            src={upi}
            alt="First slide"
            ></img>:""}
                        
               </Col>


                </Row>

            
           </Container> 
                </>
        );
}