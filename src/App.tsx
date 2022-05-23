import { useState } from 'react';
import './App.css';
// import TodoItems from './components/TodoItems';

interface TodoItemsProp {
  id: string,
  name: string,
  status: string
}

const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItemsProp[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);  
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  const handleAddTodo = () => {
    let name = inputValue;
    let status = "in progress";
      if(name !== ""){
        const id:string = name + Math.random();
        setTodoItems([{id, name, status}, ...todoItems ]);
        setInputValue("");
        //show success message
      }
  }

  const handleInProgressStatusChange = (val: string) => {
    for(let i=0; i<todoItems.length; i++){ 
      if(todoItems[i].id === val && todoItems[i].status === "completed"){
        //mutate object value in array
        let allItems = [...todoItems];
        let specificItem = {...allItems[i], status: "in progress"}
        allItems[i] = specificItem;
        setTodoItems(allItems);
      }
    }
  }

  const handleCompletedStatusChange = (val: string) => { 
    for(let i=0; i<todoItems.length; i++){ 
      if(todoItems[i].id === val && todoItems[i].status === "in progress"){
        //mutate object value in array
        let allItems = [...todoItems];
        let specificItem = {...allItems[i], status: "completed"}
        allItems[i] = specificItem;
        setTodoItems(allItems);
      }
    }
  }

  const handleDelete = (val: string) => {
    setTodoItems(todoItems.filter(todoItem => todoItem.id !== val ))
  }

  const showEditPopup = (val: string) => {
    setShowPopup(true);
    setEditId(val);
  }

  const handleEditValueChange = (e: any) => {
    e.preventDefault();
    setEditValue(e.target.value);
  }
  
  const closeEditPopup = () => {
    setEditValue("");
    setShowPopup(false);
  }

  const handleItemEdit = () => {
    for(let i=0; i<todoItems.length; i++){
      if(editId !== "" && editValue !== "" && todoItems[i].id === editId){
        let allItems = [...todoItems];
        let specificItem = {...allItems[i], name: editValue}
        allItems[i] = specificItem;
        setTodoItems(allItems);
      }
    }
    setEditValue("");
    setShowPopup(false);
  }

  return (
    <>
      <div className='todo-wrapper'>
        <div className='textbox-btn-wrapper'>
          <input type="text" 
            placeholder="Add Todo..." 
            onChange={handleInputChange} 
            value={inputValue} 
            maxLength={20}
            className='add-todo__input' />
          <button onClick={handleAddTodo} className='add-todo__button'>Add to List</button>
        </div>        
        <div className='max-length'><label>Maximum 20 characters*</label></div>
        <div className='todo-list__container'>
          {todoItems.length !== 0 ?
            <ul>
              {todoItems.map((item: any) => (
                item.name !== "" ?
                  <li key={item.id}>
                    <div className='item-name'>
                          <p>{item.name}</p>
                      </div>
                      <div>
                          <div className='in-progress__checkbox'>                
                              <input type="checkbox" id={item.name} key={item.id} checked={item.status === "in progress" ? true : false} onClick={() => handleInProgressStatusChange(item.id)} />
                              <label htmlFor={item.name}>In Progress</label>
                          </div>
                          <div className='completed__checkbox'>
                              <input type="checkbox" id={item.name+'.'} key={item.id} checked={item.status === "completed" ? true : false} onClick={() => handleCompletedStatusChange(item.id)} />
                              <label htmlFor={item.name+'.'}>Completed</label>
                          </div>
                      </div>                    
                      <div className='checked-status-btns'>
                      { item.status === "in progress" ?
                          <div className='in-progress-btns'>
                              <button className='edit' onClick={() => showEditPopup(item.id)}>Edit</button>
                              <button className='delete' onClick={() => handleDelete(item.id)}>Delete</button>
                          </div> : 
                          <div className='completed-btns'>
                              <button className='delete' onClick={() => handleDelete(item.id)}>Delete</button>
                          </div>
                      }                    
                      </div>
                  </li>
                : null
              ))}
            </ul>
          : <p className='populate-list__text'>Populate your list, add todo tasks</p>
          }
        </div>
      </div>    
        { showPopup ?
          <EditPopup 
            handleValueChange={handleEditValueChange} 
            handleEdit={handleItemEdit} 
            handleEditCancel={closeEditPopup} 
            editValue={editValue} />
          : null
        }
    </>
  );
}

export default App;

const EditPopup = (props: any) => {
  const { handleValueChange, handleEdit, handleEditCancel, editValue } = props;
  return(
    <div className="edit-popup__container">
      <input type="text" onChange={handleValueChange} value={editValue} />
      <div className='popup-edit-btns'>
        <button onClick={handleEdit}>Confirm Edit</button>
        <button onClick={handleEditCancel}>Cancel</button>
      </div>
    </div>
  )
}
 