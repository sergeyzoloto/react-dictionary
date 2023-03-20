import React, { useEffect, useMemo, useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';
import './Footer.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const context = useWordsContext();
  const {
    sideBarIsOpen,
    setSideBarIsOpen,
    newWindowIsOpen,
    setNewWindowIsOpen,
  } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const [storedLocation, setStoredLocation] = useState(location);

  const menuButtonClassToggle = useMemo(() => {
    return sideBarIsOpen ? 'open' : '';
  }, [sideBarIsOpen]);

  const addButtonClassToggle = useMemo(() => {
    return newWindowIsOpen ? 'open' : '';
  }, [newWindowIsOpen]);

  function menuOnClick() {
    setSideBarIsOpen((prevState) => {
      return !prevState;
    });
  }

  function addOnClick() {
    if (newWindowIsOpen) {
      setNewWindowIsOpen(false);
      if (storedLocation.pathname === '/add') {
        navigate('/');
      } else {
        navigate(storedLocation);
      }
    } else {
      setNewWindowIsOpen(true);
      setStoredLocation(location);
      navigate('/add');
    }
  }

  useEffect(() => {
    if (location.pathname === '/add') {
      setNewWindowIsOpen(true);
    } else {
      setNewWindowIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <button onClick={menuOnClick}>
            <div id="menu-bar" className={menuButtonClassToggle}>
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
          <div
            id="add-bar"
            className={addButtonClassToggle}
            onClick={addOnClick}
          >
            <div id="bar4" className="bar"></div>
            <div id="bar5" className="bar"></div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Footer;
