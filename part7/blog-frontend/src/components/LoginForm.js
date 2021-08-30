import React from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {

    return <Form onSubmit={handleLogin}>

        <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={({ target }) => setUsername(target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={({ target }) => setPassword(target.value)}/>
        </Form.Group>
        
        <Button type="submit">login</Button>
    </Form>
}

export default LoginForm
