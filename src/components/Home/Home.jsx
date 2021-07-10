import React, { useEffect, useState } from "react";
import shortid from "shortid";
import Item from "../Item/Item";
import "./Home.css";

function Home() {

  const initialData = [
    { title: "Egg", id: "42453", update: false },
    { title: "Bread", id: "5241", update: false },
    { title: "Meat and Seafood", id: "4241234", update: false }
  ];


  const [data, setData] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
      return localData.length === 0 ? initialData : localData;
  });

  const [value, setValue] = useState({
    title: "",
    id: "",
    update: false,
  });


  // local storage
  /*
    If we didn't use any initialData , than we can use localStorage simply look like that - 
    const [data, setData] = useState([]);

    useEffect(() => {
      const raw = localStorage.getItem("data");
      setData(JSON.parse(raw));
    }, []);
  */

useEffect(() => {
  localStorage.setItem("data", JSON.stringify(data));
}, [data]);

  // Control input box
  const handleChange = (e) => {
    setValue({
      title: e.target.value,
      id: value.id || shortid.generate(),
      update: value.update,
    });
  };

  // Control Submit and update button
  const handleSubmit = () => {
    let newData = [...data, value];
    if (value.title) {
      setData(newData);
    }
    setValue({ title: "", id: "", update: false });
  };

  //  Update text
  const updateText = () => {
    let temp = data;
    let index = temp.findIndex((v) => v.id === value.id);

    if (temp[index]) {
      temp[index].title = value.title;
      setData([...temp]);
    } else {
      setData([...temp, value]);
    }

    setValue({ title: "", id: "", update: false });
  };

  // Handle Edit item for update data
  const handleUpdate = (id) => {
    let temp = data;
    let editableData = temp.find((v) => v.id === id);
    editableData.update = true;
    setValue(editableData);
  };

  //   Delete specefic item
  const handleDelete = (id) => {
    const filterData = data.filter((v) => v.id !== id);
    setData(filterData);
  };

  //  Clear data
  const handleClear = () => {
    setData([]);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2>Grocery Bud</h2>

          <div className="edit-bar">
            <Input handleChange={handleChange} title={value.title} />

            <SubmitBtn
              update={value.update}
              updateText={updateText}
              handleSubmit={handleSubmit}
            />
          </div>

          <ItemSection
            data={data}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />

          <ClearItems handleClear={handleClear} />
        </div>
      </div>
    </div>
  );
}


export default Home;


/* ================ Controller ===============  */

const SubmitBtn = ({ update, updateText, handleSubmit }) => {
  return update ? (
    <button className="submit-btn" onClick={() => updateText()}>
      Update
    </button>
  ) : (
    <button className="submit-btn" onClick={() => handleSubmit()}>
      Submit
    </button>
  );
};



const ItemSection = ({ data, handleDelete, handleUpdate }) => {
  return (
    <div className="item-section">
      {data.map((v) => (
        <Item {...v} key={v.id} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      ))}
    </div>
  );
};

const ClearItems = ({ handleClear }) => {
  return (
    <p onClick={() => handleClear()} className="clear-items">
      Clear Items
    </p>
  );
};


const Input = ({ handleChange, title }) => {
  return (
    <input
      type="text"
      placeholder="e.g eggs"
      onChange={(e) => handleChange(e)}
      value={title}
    />
  );
};



