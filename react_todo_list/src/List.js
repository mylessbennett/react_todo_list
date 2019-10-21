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
                <li key={i} id={item.title} onClick={checkOffItem}>
                    <span className="item-title">{item.title}</span><br/><i>{item.description}</i> | {item.dueDate}
                </li>
        </React.Fragment>  
        )

    const caption = (listItems.length === 0) ? <div className="caption">Add a task to you To Do List!</div> : <div className="caption">You have <span className="caption-number">{listItems.length}</span> task(s) remaining.</div>

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