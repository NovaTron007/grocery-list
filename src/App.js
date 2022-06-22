import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


  // get localStorage to set state
  const getLocalStorage = () => {
    // check if item
    let list = localStorage.getItem("grocerylist")
    if(list) {
      // parse to array
      return JSON.parse(localStorage.getItem("grocerylist"))
    }
    // set state list to empty array
    else {
      return []
    }
  }

function App() {

  // state
  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] =  useState({show: false, message: "", type: ""}) // object

  // form onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    // if empty
    if(!name) {
      // show alert pass values for it to  update state
      showAlert(true, "Please enter a value", "danger")
    } 
    // if editing
    else if(name && isEditing) {
      // map list objects
      setList(list.map((item) => {
        if(item.id === editId) {
          return { ...item, title: name} // copy current item, update value
        }
        return item
      }))
      // clear field and reset state
      setName("")
      setEditId(null)
      setIsEditing(false)
      showAlert(true, "Item updated!", "success")
    }
    // add item to list
    else {
      // create new object with name state
      const newItem = {id: new Date().getTime().toString(), title: name}
       // copy current state, add new item
      setList([...list, newItem])
      // clear name value
      setName("")
      // set alert
      setAlert({show: true, message: "Item added!", type: "success"})
    }
  }

  // show alert func to setAlert and can used for timer
  const showAlert = (show=false, message, type) => {
    // set state obj
    setAlert({show, message, type})
  }

  // clear button
  const clearList = () => {
    setList([]) // clear list
    showAlert(true, "Items deleted!","success") // showAlert
  }

  // remove items
  const removeItem = (id) => {
    showAlert(true, "item removed", "danger")
    setList(list.filter((item) => item.id !== id)) // filter items and return list w/o item with id
  }

  // edit item
  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(itemToEdit.title)
  }

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("grocerylist", JSON.stringify(list))
  }, [list]) // list changes set localStorage
  


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        
        {/* show alert */}
        { alert.show && <Alert {...alert} showAlertCb={showAlert} list={list} /> }
        <h3>Grocery List</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g bread" value={name} onChange={(e)=>setName(e.target.value)} />
          <button type="submit" className="submit-btn">{isEditing ? "edit" : "submit"}</button>
        </div>
      </form>
      <div className="grocery-container">
          <List list={list} removeItemCb={removeItem} editItemCb={editItem}/>
        </div>
      <button className="clear-btn" onClick={clearList}>Clear</button>

    </section>
  )
}

export default App
