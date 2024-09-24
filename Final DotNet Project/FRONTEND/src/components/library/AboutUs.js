
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Card} from "react-bootstrap";
import { Alert,Row ,Col,Container} from "react-bootstrap";


export const AboutUs = () => {



  return (
  
         <Container>
      <Row>

      <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1",border:"1px solid white",borderRadius:"20px "}}>
          <h2> TastyTrails </h2></Alert>
      </Row>
      <Row>
      <Col lg={4} className="mt-5">
        <Card border="primary" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Hemant Shirsath</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">240340320000</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">
        <SiGmail />
        </Card.Link>
        <Card.Link href="#"> <FaInstagram /> </Card.Link>
      </Card.Body>
    </Card>
        </Col>

        <Col lg={4} className="mt-5">
        <Card border="primary" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Anuj Shrivastava</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">240340320000</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">
        <SiGmail />
        </Card.Link>
        <Card.Link href="#"> <FaInstagram /> </Card.Link>
      </Card.Body>
    </Card>
        </Col>

        <Col lg={4} className="mt-5">
        <Card border="primary" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Purva Salvi</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">240340320002</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">
        <SiGmail />
        </Card.Link>
        <Card.Link href="#"> <FaInstagram /> </Card.Link>
      </Card.Body>
    </Card>
        </Col>

       

        

        <Col lg={4} className="mt-5">
        <Card border="primary" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Vrundali Patil</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">240340320002</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">
        <SiGmail />
        </Card.Link>
        <Card.Link href="#"> <FaInstagram /> </Card.Link>
      </Card.Body>
    </Card>
        </Col>



        <Col lg={4} className="mt-5">
        <Card border="primary" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Aishwarya Mundhe</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">240340320002</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">
        <SiGmail />
        </Card.Link>
        <Card.Link href="#"> <FaInstagram /> </Card.Link>
      </Card.Body>
    </Card>
        </Col>
        </Row>
         </Container>


   
  );
};