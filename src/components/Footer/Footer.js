import React from 'react';
import './Footer.css';

const Footer = () => {
  function menuOnClick() {
    document.getElementById('menu-bar').classList.toggle('change');
  }
  function addOnClick() {
    document.getElementById('add-bar').classList.toggle('change');
  }
  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <button onClick={menuOnClick}>
            <div id="menu-bar">
              <div id="bar1" className="bar"></div>
              <div id="bar2" className="bar"></div>
              <div id="bar3" className="bar"></div>
            </div>
          </button>
          <form className="search">
            <input type="text" placeholder="Search.." name="search2" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <button>
          <div id="add-bar" onClick={addOnClick}>
            <div id="bar4" className="bar"></div>
            <div id="bar5" className="bar"></div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Footer;
