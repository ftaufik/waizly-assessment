import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTodos, editTodos, getTodos, toggleComplete } from "../redux/todoSlice";
import UpdateTodoForm from "./UpdateTodoForm";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import { SearchInput } from "./SearchInput";

export default function Box() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.data);
    const userId = localStorage.getItem('userId');
    const [isEditing, setIsEditing] = useState(false);
    const [updateField, setUpdateField] = useState({
        id: "",
        todo: ""
    });
    const [query, setQuery] = useState("");

    function handleChangeUpdate(e) {
        setUpdateField((prevState) => ({...prevState, todo: e.target.value }));
    }

    function handleComplete(id, e) {
        e.preventDefault();
        dispatch(toggleComplete(id));
    }

    function handleDelete(id, e) {
        e.preventDefault();
        dispatch(deleteTodos(id));
    }

    function handleUpdateForm(value, id) {
        setIsEditing(!isEditing);
        setUpdateField((prevState) => ({...prevState, id: id, todo: value }));
    }

    function handleSaveUpdate(e) {
        e.preventDefault();
        dispatch(editTodos({id: updateField.id, todo: updateField.todo}));
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        dispatch(getTodos(userId));

    }, [dispatch, userId])


    return (
        <div className="w-1/2 h-3/4 min-h-max bg-amber-100 shadow-2xl rounded-lg p-2 flex flex-col items-center space-y-10 justify-between">
            <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
                <h1 className="text-3xl font-semibold underline">My Todo List</h1>
                <div className="w-3/4">
                    <SearchInput query={query} setQuery={setQuery}/>
                    {isEditing ? <UpdateTodoForm handleChangeUpdate={handleChangeUpdate} handleSaveUpdate={handleSaveUpdate} updateField={updateField}/> : <AddTodoForm/> }
                </div>
                <div className="w-3/4">
                    <ul className="w-full max-h-72 overflow-y-scroll">
                        {
                            todos.filter((todo) => 
                                todo.todo.toLowerCase().includes(query)
                            ).map((todo) => (
                                <li key={todo.id}  className="mb-2">
                                    <TodoItem isComplete={todo.isComplete} isEditing={isEditing} id={todo.id} handleUpdateForm={handleUpdateForm} handleComplete={handleComplete} handleDelete={handleDelete} todo={todo.todo}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}