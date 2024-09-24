import { Carousel, Image,Container,Row,Col} from "react-bootstrap";

import {Login} from "./Login";

export function Home()
{
        return(
                <>
               
      <Container className="mb-3">
      
     
    
        <Row className="mb-3">
         <Login/>
        </Row>
        <Row className="m-4">
       
        </Row>
        <Row >
        <Col lg={12}>
        <Carousel>
      <Carousel.Item interval={1000} >
      <Image style={{width:"100%",height:"600px" ,marginTop:"20px"}} src="./1.jpg" />
      
      </Carousel.Item>

    
     
       <Carousel.Item interval={1000}>
      <Image style={{width:"100%",height:"600px" ,marginTop:"20px" }}   src="./1.jpg"/>
      </Carousel.Item>
  
   
     
      
    </Carousel>
        </Col>
       
        </Row>

      </Container>
                </>
        );
}