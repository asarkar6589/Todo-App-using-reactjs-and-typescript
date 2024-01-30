import { Delete, Edit } from '@mui/icons-material';
import { Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type PropsType = {
    todo: TodoItemType,
    deleteHandeler: (id: TodoItemType["id"]) => void,
    completeHandeler: (id: TodoItemType["id"]) => void,
    editHandeler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void,
}

const TodoItems = ({ todo, deleteHandeler, completeHandeler, editHandeler }: PropsType) => {
    // edit functionality
    const [edit, setEdit] = useState<TodoItemType["isCompleted"]>(false);
    const [text, setText] = useState<TodoItemType["title"]>(todo.title);
    return (
        <Paper variant='elevation' sx={{
            padding: "1rem"
        }}>
            <Stack direction={"row"} alignItems={"center"}>
                {
                    edit ? <TextField value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter" && text !== "") {
                            // we have to also save this, that's why we have to create another function.
                            editHandeler(todo.id, text);
                            setEdit(false); // because now we have to show the title.
                        }
                    }} /> : <Typography marginRight={"auto"}>
                        {todo.title}
                    </Typography>
                }

                <Checkbox checked={todo.isCompleted} onChange={() => completeHandeler(todo.id)} />
                <Button onClick={() => deleteHandeler(todo.id)} sx={{ opacity: 0.5 }}><Delete /></Button>
                <Button onClick={() => setEdit(prev => !prev)} sx={{ fontWeight: "600" }}>
                    {
                        edit ? <Button onClick={() => {
                            editHandeler(todo.id, text);
                        }}>
                            Save
                        </Button> : <Edit />
                    }
                </Button>
            </Stack>
        </Paper>
    )
}

export default TodoItems;
