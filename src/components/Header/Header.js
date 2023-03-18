import React from 'react';

const Header = () => {
  function menuOnClick() {
    document.getElementById('menu-bar').classList.toggle('change');
  }
  return (
    <>
      <p>Header</p>
      <button onClick={menuOnClick}>
        <div id="menu-bar">
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
      </button>
    </>
  );
};

export default Header;
