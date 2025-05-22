import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Navigation({ handleReset }) {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/album-details">Album_Details</Nav.Link>
            <Nav.Link href="/artist-album-details">Artist_Album_Details</Nav.Link>
            <Nav.Link href="/artists">Artists</Nav.Link>
            <Nav.Link href="/genre-album-details">Genre_Album_Details</Nav.Link>
            <Nav.Link href="/genres">Genres</Nav.Link>
            <Nav.Link href="/inventory">Inventory</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className="justify-content-end">
              <Button onClick={handleReset} variant="warning">Reset Data</Button>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;