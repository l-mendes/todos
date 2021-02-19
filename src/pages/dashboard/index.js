import { useEffect, useState } from 'react';
import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { requirePageAuth } from '../../utils/middleware/auth/requirePageAuth';
import { useToasts } from 'react-toast-notifications';
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
  const [done, setDone] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { addToast } = useToasts();

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
    setDone(false);
    setFormErrors({
      name: '',
      description: '',
      dtTodo: '',
    });

    setOpenAddModal(false);
  };

  const handleInputChange = (input, value) => {
    if (input === 'dtTodo') {
      if (checkIsDate(value)) {
        setFormErrors({...formErrors, [input]: ''});
      }
    } else {
      if (value) {
        setFormErrors({...formErrors, [input]: ''});
      }
    }
  };

  const checkIsDate = (date) => {
    if (!date) {
      return false;
    }
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  const handleFormValidate = () => {
    if(!name) {
      setFormErrors({...formErrors, name: 'O campo Nome é obrigatório!'});
      return false;
    }
    if(!description) {
      setFormErrors({...formErrors, description: 'O campo Descrição é obrigatório!'});
      return false;
    }

    if(!checkIsDate(dtTodo)) {
      setFormErrors({...formErrors, dtTodo: 'O campo Data da tarefa é obrigatório!'});
      return false;
    }

    return true;
  }

  const handleFormAddSubmit = async () => {
    const formValidate = handleFormValidate();
    if(!formValidate) {
      return;
    }

    setDisableSubmit(true);
    try {
      const newTodo = await axios({
        method: "POST",
        url: `${baseUrl}/api/todos/store`,
        data: {
          name,
          description,
          dt_todo: dtTodo,
          done,
        }
      });

      if(newTodo.data.success) {
        setTodos([...todos, newTodo.data.data]);
        addToast("Tarefa criada com sucesso!", {appearance: "success"});
      }

    } catch(err) {
      console.error(err);
      addToast("Não foi possível criar a tarefa!", {appearance: "error"});
    }
    handleCloseAddModal();
    setDisableSubmit(false);
  };

  const handleDoneTodos = () => {
    return todos.filter((todo) => {
      return todo.done === true;
    }).sort((a, b) => new Date(a.dt_todo) - new Date(b.dt_todo));
  };

  const handlePendingTodos = () => {
    return todos.filter((todo) => {
      return todo.done === false;
    }).sort((a, b) => new Date(a.dt_todo) - new Date(b.dt_todo));
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
          <TodoCard title="Realizadas">
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
        done={done}
        setDone={setDone}
        disableSubmit={disableSubmit}
        errors={formErrors}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export const getServerSideProps = requirePageAuth();

Index.Layout = Layout;

export default Index;
