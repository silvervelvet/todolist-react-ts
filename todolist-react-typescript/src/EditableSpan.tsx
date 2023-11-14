import React, { ChangeEvent, useState } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';

type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');


  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? <input value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus></input> 
                  : <span onDoubleClick={activateEditMode}>{props.title}</span> 
}
