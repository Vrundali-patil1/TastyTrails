import { Container,Row,Col } from "react-bootstrap";


import { AdminNavbar } from "./AdminNavbar";

export function AdminPage()
{
        return(<>
           <Container >
                <Row>
                        <Col lg={3} style={{backgroundColor:"#AED6F1",marginTop:"20px",paddingTop:"80px",border:"1px solid white",borderRadius:"20px "}}>
                        <AdminNavbar/> 
                       
                        </Col>

                        <Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                        
                        </Col>
                </Row>
           </Container>  
        </>)
}