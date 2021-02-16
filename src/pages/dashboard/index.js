import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { requirePageAuth } from '../../utils/middleware/auth/requirePageAuth';
import TodoCard from '../../components/TodoCard';
import TodoForm from '../../components/TodoForm';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddIcon from '@material-ui/icons/Add';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    addButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(2)
    }
  }
});

const Index = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doneTodos, setDoneTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [dtTodo, setDtTodo] = useState(new Date());
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    dtTodo: '',
  });

  const handleDateChange = (date) => {
    setDtTodo(date);
  };

  const handleClickOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setName('');
    setDescription('');
    setDtTodo(new Date());

    setOpenAddModal(false);
  };

  const handleFormAddSubmit = async () => {
    try {
      const newTodo = await axios({
        method: "POST",
        url: `${baseUrl}/api/todos/store`,
        data: {
          name,
          description,
          dt_todo: dtTodo,
        }
      });

      if(newTodo.data.success) {
        setPendingTodos([...pendingTodos, newTodo.data.data]);
        alert('Tarefa criada com sucesso!');
      }

    } catch(err) {
      console.error(err);
      alert('Não foi possível criar a tarefa!');
    }
    setOpenAddModal(false);
  };

  const handleDoneTodos = () => {
    return todos.filter((todo) => {
      return todo.done === true;
    });
  };

  const handlePendingTodos = () => {
    return todos.filter((todo) => {
      return todo.done === false;
    });
  }

  useEffect(async () => {
    try {
      const todosData = await axios.get(`${baseUrl}/api/todos`);
      setTodos(todosData.data);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setDoneTodos(handleDoneTodos);
    setPendingTodos(handlePendingTodos);
  }, [todos]);

  return (
    <div className={classes.root}>
      <div className={classes.addButton}>
        <Button color="primary" variant="outlined" startIcon={ <AddIcon /> } onClick={handleClickOpenAddModal}>
          Adicionar
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TodoCard title="Pendentes">
            {loading && <LoadingSpinner />}
            {pendingTodos.map((todo, index) => {
              let data = new Date(todo.dt_todo);
              let dia  = data.getDate().toString().padStart(2, '0');
              let mes  = (data.getMonth()+1).toString().padStart(2, '0');
              let ano  = data.getFullYear();
              return (
                <li key={`list_item_${index}`}>{todo.name} - ({`${dia}/${mes}/${ano}`})</li>
              );
            })}
          </TodoCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <TodoCard title="Realizados">
          {loading && <LoadingSpinner />}
            {doneTodos.map((todo, index) => {
              let data = new Date(todo.dt_todo);
              let dia  = data.getDate().toString().padStart(2, '0');
              let mes  = (data.getMonth()+1).toString().padStart(2, '0');
              let ano  = data.getFullYear();
              return (
                <li key={`list_item_${index}`}>{todo.name} - ({`${dia}/${mes}/${ano}`})</li>
              );
            })}
          </TodoCard>
        </Grid>
      </Grid>

      <TodoForm 
        open={openAddModal} 
        handleCloseModal={handleCloseAddModal} 
        handleFormSubmit={handleFormAddSubmit} 
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        dtTodo={dtTodo}
        handleDateChange={handleDateChange}
      />
    </div>
  );
}

export const getServerSideProps = requirePageAuth();

Index.Layout = Layout;

export default Index;
