import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { TextField, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


type AddItemFormPropsType = {
  addItem: (title: string) => void
}
function AddItemForm (props: AddItemFormPropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === 'Enter') {
      addTask();
    }
  }
  const addTask = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim());
      setTitle('')
    } else {
      setError('title is required')
    }
  }

  return <div>
          <TextField variant={'outlined'}
                  label={'Type value'}
                  value={title} 
                  onChange={onChangeHandler} 
                  onKeyDown={onKeyPressHandler}
                  error={ !!error }
                  helperText={error} 
                  />
          <IconButton onClick={addTask} color={'primary'}>
            <AddIcon />
          </IconButton>
          {/* { error && <div className='error-message'>{error}</div> } */}
        </div>
  
}
export default AddItemForm;
