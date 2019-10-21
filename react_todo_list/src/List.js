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

    const currentDate = new Date() 

    const dueDateDiff = (currentDate, dueDate) => {
        let dt1 = new Date(currentDate);
        let dt2 = new Date(dueDate);
        const remainingDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        if (remainingDays === 0) {
            return "Today!"
        } else if (remainingDays < 0) {
            return (remainingDays*-1) + " " + "day(s) ago"
        } else {
            return "in" + " " + remainingDays + " " + "day(s)"
        }   
    }

    const itemElements = listItems.map((item, i) => 
        <React.Fragment>
                <li key={i} id={item.title} onClick={checkOffItem}>
                    <span className="item-title">{item.title}</span><br/><i>{item.description}</i><br />Date: {item.dueDate}| Due: <span className="due-date-number">{dueDateDiff(currentDate,item.dueDate)}</span>.
                </li>
        </React.Fragment>  
        )
    
    const caption = (listItems.length === 0) ? <div className="caption">Add a task to your To Do List!</div> : <div className="caption">You have <span className="caption-number">{listItems.length}</span> task(s) remaining.</div>

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