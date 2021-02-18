import Button from '@material-ui/core/Button';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import LoadingButton from '../LoadingButton';

export default function TodoForm({
  open, handleFormSubmit, handleCloseModal,
  name, setName, 
  description, setDescription, 
  dtTodo, handleDateChange,
  done, setDone,
  disableSubmit
}) {
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    dtTodo: '',
  });

  const handleInputChange = (input, value) => {
    if(value) {
      setErrors({...errors, [input]: ''});
    }
    if(dtTodo && errors.dtTodo) {
      setErrors({...errors, [dtTodo]: ''});
    }
  };

  const validateFormSubmit = (e) => {
    if(!name) {
      setErrors({...errors, name: 'O campo Nome é obrigatório!'});
      return;
    }
    if(!description) {
      setErrors({...errors, description: 'O campo Descrição é obrigatório!'});
      return;
    }
    if(!dtTodo) {
      setErrors({...errors, dtTodo: 'O campo Data da tarefa é obrigatório!'});
      return;
    }

    handleFormSubmit();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-modal-add-todo">
        <DialogTitle id="form-modal-add-todo">Nova Tarefa</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => { handleInputChange('name', e.currentTarget.value); setName(e.currentTarget.value)}}
            fullWidth
          />
          {errors.name}

          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            value={description}
            onChange={(e) => { handleInputChange('description', e.currentTarget.value); setDescription(e.currentTarget.value)}}
            multiline={true}
            rows={3}
            rowsMax={6}
            fullWidth
          />
          {errors.description}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data da tarefa"
            value={dtTodo}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={done}
              value={done}
              onChange={() => { setDone(!done) }}
              name="done"
            />
          }
          style={{marginTop: '10px'}}
          label="Tarefa realizada?"
        />
        {errors.dtTodo}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseModal} 
            color="secondary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <LoadingButton
            onClick={validateFormSubmit}
            color="primary"
            disabled={disableSubmit}
            loading={disableSubmit}
            variant="outlined"
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}