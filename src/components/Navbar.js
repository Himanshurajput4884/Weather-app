import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" >
            Weather
          </Navbar.Brand>
        </Container>
      </Navbar>

    </>
  );
}

export default ColorSchemesExample;