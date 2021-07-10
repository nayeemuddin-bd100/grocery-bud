import React from 'react';
import './Item.css';

function Item({ id, title, handleDelete, handleUpdate  }) {


 
  return (
    <>
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
