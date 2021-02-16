import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { requirePageAuth } from '../../utils/middleware/auth/requirePageAuth';
import Layout from '../../components/Layout';

const useStyles = makeStyles((theme) => {
  return {
    input: {
      width: 500,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
    },
    submit: {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2),
        marginTop: 12
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginTop: theme.spacing(2),
      },
    }
  };
});

const Index = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [todoErrorMessage, setTodoErrorMessage] = useState('');

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if(todo.length <= 0) {
      setTodoErrorMessage('Informe o nome da tarefa');
      return;
    }

    setTodos([...todos, todo]);
    setTodo('');
  };


  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="todo"
            variant="standard"
            placeholder="Insira uma nova tarefa"
            label="Tarefa"
            onChange={(e) => {setTodo(e.currentTarget.value)}}
            value={todo}
          />
          {todoErrorMessage}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={todo === ''}
            className={classes.submit}
            onClick={handleCreateTodo}
          >
            Adicionar
          </Button>
        </Grid>

        {todos.length > 0 && 
          (
            <>
              <Typography style={{marginTop: 10}}>
                Lista de tarefas:
              </Typography>
              <Grid item xs={12} style={{ marginBottom: 10}}>
                <ul>
                  {todos.map((todo, index) => {
                    return (
                      <li>{todo}</li>
                    );
                  })}
                </ul>
              </Grid>
            </>
          )
        }

      </Grid>
    </>
  );
}

export const getServerSideProps = requirePageAuth();

Index.Layout = Layout;

export default Index;
