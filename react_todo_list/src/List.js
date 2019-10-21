import React, {useState, useEffect} from 'react';
import NewItemForm from './NewItemForm'


function List () {

    const initialState = () => JSON.parse(window.localStorage.getItem('localListItems')) || [];

    const [listItems, setlistItems] = useState(initialState, () => {
        const localData = window.localStorage.getItem('localListItems');
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() => {
        localStorage.setItem('localListItems', JSON.stringify(listItems))
    }, [listItems])

    const addItem = (title, description, dueDate) => {
        setlistItems([...listItems, {title: title, description: description, dueDate: dueDate, completed: false}])
    }
    
    const checkOffItem = (e) => {
        setlistItems(listItems.filter((item) => item.title !== e.target.getAttribute('id')))
    }

    const itemElements = listItems.map((item, i) => 
        <React.Fragment>
                <li key={i} id={item.title} onClick={checkOffItem}>{item.title} | {item.description} | {item.dueDate}</li>
        </React.Fragment>  
        )

    const caption = (listItems.length === 0) ? <p>Add a task to you To Do List!</p> : <p>You have <span className="caption-number">{listItems.length}</span> task(s) remaining.</p>

    return (
        <React.Fragment>
            { caption }
            <ul>
                { itemElements }
            </ul>
            <NewItemForm addItem={addItem} />
        </React.Fragment>

    )
}


export default List;