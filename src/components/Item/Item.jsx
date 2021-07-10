import React from 'react';
import './Item.css';

function Item({ id, title, handleDelete, handleUpdate  }) {


 
  return (
    <>
      {/* {update && (
        <div className="update-section">
          <input
            className="text-update"
            type="text"
           
            value={title}
          />
          <button className="update-btn">Update</button>
        </div>
      )} */}

     
        <div true className="item-data">
          <div className="text-view"> {title}</div>
          <div className="icon-view">
            <i onClick={() => handleUpdate(id)} className="far fa-edit"></i>
            <i
              onClick={() => handleDelete(id)}
              className="far fa-trash-alt"
            ></i>
          </div>
        </div>

    </>
  );
}

export default Item
