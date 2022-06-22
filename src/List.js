import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'


const List = ({list, removeItemCb, editItemCb}) => {
  return (
    <div className="grocery-list">
      {list.map((item, index) => {
        // destructure current item obj
        const { id, title } = item
        // return the content
        return <article key={id} className="grocery-item">
          <p className="title">{title}</p>
          { list.length > 0 && 
                <div className="button-container">
                <button className="edit-btn" onClick={() => editItemCb(id)}><FaEdit /></button>
                <button className="delete-btn" onClick={() => removeItemCb(id)}><FaTrash /></button>
              </div>    
          }

        </article>
      })}
    </div>
  )
}

export default List
