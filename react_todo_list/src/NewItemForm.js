import React, {useState} from 'react';


const NewItemForm = ({ addItem }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(title, description, dueDate);
        setDescription('');
        setTitle('');
        setDueDate('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" required value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" required value={description} placeholder="Description" onChange={(e)=> setDescription(e.target.value)}/>    
            <input type="text" required value= {dueDate} placeholder="Due Date (MM/DD/YY)" onChange={(e)=> setDueDate(e.target.value)}/>
            <input type="submit" value="Add List Item"/>
        </form>
    );
}

export default NewItemForm;