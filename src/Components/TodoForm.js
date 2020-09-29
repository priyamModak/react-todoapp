import React, { useContext, useState } from "react";
import { Button, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { v4 } from "uuid";
import { ADD_TODO, REMOVE_TODO } from "../Context/action.types";
import { TodoContext } from "../Context/TodoContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todos from "./Todos";

const TodoForm = () => {

    const [todoString, setTodoString] = useState("");
    const {dispatch} = useContext(TodoContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(todoString == ""){
            return toast("Please enter a todo", {type: "error"})
        }

        const todo = {
            todoString,
            id: v4()
        }
        dispatch({
            type: ADD_TODO,
            payload: todo
        })
        setTodoString("");
    }

    return (
        <Container>
            <ToastContainer position="bottom-center"/>
            <Todos/>
            <Form onSubmit={handleSubmit}> 
                <FormGroup>
                    <InputGroup>
                        <Input type="text" name="todo" id="todo" placeholder="Your next Todo" value={todoString}
                        onChange={e => setTodoString(e.target.value)}/>
                        <InputGroupAddon addonType="prepend">
                            <Button color="success">Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default TodoForm;