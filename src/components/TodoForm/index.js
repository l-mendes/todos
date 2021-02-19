import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
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
  disableSubmit,
  errors,
  handleInputChange
}) {

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
            error={errors.name.length === 0 ? false : true }
            helperText={errors.name}
            onChange={(e) => { handleInputChange('name', e.currentTarget.value); setName(e.currentTarget.value)}}
            fullWidth
          />

          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            value={description}
            error={errors.description.length === 0 ? false : true }
            helperText={errors.description}
            onChange={(e) => { handleInputChange('description', e.currentTarget.value); setDescription(e.currentTarget.value)}}
            multiline={true}
            rows={3}
            rowsMax={6}
            fullWidth
          />

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
            onChange={(e) => {handleInputChange('dtTodo', e); handleDateChange(e);}}
            error={errors.dtTodo.length === 0 ? false : true }
            helperText={errors.dtTodo}
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
            onClick={handleFormSubmit}
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