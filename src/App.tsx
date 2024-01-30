import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TodoItems from './components/TodoItems';
import { getTodos, saveLocal } from './utils/features';

const App = () => {
  const [todo, setTodo] = useState<TodoItemType[]>(getTodos());
  const [Title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandeler = (id: TodoItemType["id"]): void => {
    const selectedTodo: TodoItemType[] = todo.map((ele) => {
      if (ele.id === id) {
        ele.isCompleted = !ele.isCompleted
      }

      return ele;
    })!;
    setTodo(selectedTodo);
  }

  const deleteHandeler = (id: TodoItemType["id"]): void => {
    const selectedTodo: TodoItemType[] = todo.filter((ele) => id !== ele.id)!;
    setTodo(selectedTodo);
  }

  const submitHandeler = (): void => {
    const newTodo: TodoItemType = {
      title: Title,
      isCompleted: false,
      id: String(Math.random() * 1000)
    }
    setTodo((prev) => [...prev, newTodo]);
    setTitle("");
  }

  const editHandeler = (id: TodoItemType["id"], newTitle: TodoItemType["title"]): void => {
    const thatTodo: TodoItemType[] = todo.map((ele) => {
      if (ele.id === id) {
        ele.title = newTitle;
      }

      return ele;
    });

    setTodo(thatTodo);
  }

  useEffect(() => {
    saveLocal(todo);
  }, [todo]);

  return (
    <Container maxWidth="sm" sx={{
      height: "100vh"
    }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {
          todo.map((item) => {
            return <TodoItems editHandeler={editHandeler} completeHandeler={completeHandeler} deleteHandeler={deleteHandeler} todo={item} key={item.id} />
          })
        }
      </Stack>

      <TextField fullWidth label={"New Task"} value={Title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => {
        if (e.key === "Enter" && Title !== "") {
          submitHandeler()
        }
      }} />

      <Button disabled={Title === ""} fullWidth variant='contained' sx={{
        margin: "1rem 0"
      }} onClick={submitHandeler}>Add</Button>
    </Container>
  )
}

export default App;
