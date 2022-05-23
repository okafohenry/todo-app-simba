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
  const [editValue, setEditValue] = useState('')

  const handleInputChange = (e: any) => {
    e.preventDefault();
    if(e.target.value !== ""){
      setInputValue(e.target.value);
    }
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
    //show Edit Popup
  }
  
  const closeEditPopup = () => setShowPopup(false);

  const handleItemEdit = () => {
    for(let i=0; i<todoItems.length; i++){
      if(editId !== "" && editValue !== "" && todoItems[i].id === editId){
        let allItems = [...todoItems];
        let specificItem = {...allItems[i], name: editValue}
        allItems[i] = specificItem;
        setTodoItems(allItems);
      }
    }
  }

  return (
    <div>
      <input type="text" placeholder="Add Todo" onChange={handleInputChange} value={inputValue}/>
      <button onClick={handleAddTodo}>Add to list</button>
      <div>
        {todoItems.length !== 0 ?
          <ul>
            {todoItems.map((item: any) => (
              item.name !== "" ?
                <li key={item.id}>
                   <div>
                        <p>{item.name}</p>
                    </div>
                    <div>
                        <div>                
                            <input type="checkbox" id={item.name} key={item.id} checked={item.status === "in progress" ? true : false} onClick={() => handleInProgressStatusChange(item.id)} />
                            <label htmlFor={item.name}>In Progress</label>
                        </div>
                        <div>
                            <input type="checkbox" id={item.name+'.'} key={item.id} checked={item.status === "completed" ? true : false} onClick={() => handleCompletedStatusChange(item.id)} />
                            <label htmlFor={item.name+'.'}>Completed</label>
                        </div>
                    </div>
                    { item.status === "in progress" ?
                      <div>
                          <button onClick={() => showEditPopup(item.id)}>Edit</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                      </div> : 
                      <div>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                      </div>
                    }
                </li>
              : null
            ))}
          </ul>
        : <p>Populate your list, add todo tasks</p>
        }
      </div>
    </div>
  );
}

export default App;
 