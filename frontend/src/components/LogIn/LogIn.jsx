import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LogIn.css";

export const LogIn = () => {
  return (
    <div className="container">
      <h1 className="my-5 text-center">Log in to SoundStream</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        <div className="d-grid gap-2">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>
    </div>
  );
};
