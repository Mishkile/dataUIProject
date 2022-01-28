import React, { useState, useContext, useEffect } from "react";
import Context from "../context";
import addSymbol from "../assets/image/add-symbol.png";

export default function NavBar({modalActive , setModalActive,setChoosedUser}) {
  const { search } = useContext(Context);

  const [querry, setQuerry] = useState("");

  //option with search after enter
  const makeSearch = e => {
    if (e.key === 'Enter') {
      const data = querry.toLocaleLowerCase();
      setQuerry("");
      search(data);
    }
  }
  
  //option with live strean search
  useEffect(() => {
    search(querry.toLocaleLowerCase())
  }, [querry]);

  function resetSearch() {
    setQuerry("");
    search("");
    setChoosedUser(0)
  }

  return (
    <nav className="mynavbar">
      <div className="nav-title">
        <button className="btn-border-less not-select" onClick={resetSearch.bind(null)}>
          Show All
        </button>
      </div>
      <div className="nav-search">
        <input
          className="nav-search-input"
          type="text"
          value={querry}
          placeholder="Search for someone..."
          maxLength="22"
          onChange={(e) => setQuerry(e.target.value)}
          onKeyPress={makeSearch}
        />
      </div>
      <div className="add-new">
        
        <button className="btn-border-less not-select" onClick={()=> setModalActive(!modalActive)}><img src={addSymbol} alt="Add New" className="add-new-img" style={{marginRight:'5px', marginBottom:'5px'}} />Add New</button>
      </div>
    </nav>
  );
}
