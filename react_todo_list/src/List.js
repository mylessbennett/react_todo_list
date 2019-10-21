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
        setlistItems([...listItems, {title: title, description: description, dueDate: dueDate}])
    }

    const itemElements = listItems.map((item, i) => 
        <React.Fragment>
            <li key={i} id={item.title}>{item.title} | {item.description} | {item.dueDate} <button>Delete</button></li>
        </React.Fragment> 
        )

    return (
        <React.Fragment>
            <ul>
                { itemElements }
            </ul>
            <NewItemForm addItem={addItem} />
        </React.Fragment>

    )
}


export default List;