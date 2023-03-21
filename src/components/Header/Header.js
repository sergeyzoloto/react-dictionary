import { Link } from 'react-router-dom';
import './Header.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
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
    return sideBarIsOpen ? 'pushed' : '';
  }, [sideBarIsOpen]);

  const addButtonClassToggle = useMemo(() => {
    return newWindowIsOpen ? 'pushed' : '';
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
      <div className="header-container">
        <div className="header-left">
          <div className="header-button-container">
            <button onClick={menuOnClick} className="header-button">
              <div id="menu-bar" className={menuButtonClassToggle}>
                <div id="bar1" className="bar"></div>
                <div id="bar2" className="bar"></div>
                <div id="bar3" className="bar"></div>
              </div>
            </button>
          </div>
          <Link to={'/'} className="header-link">
            Words
          </Link>
        </div>
        <div className="header-button-container">
          <button className="header-button">
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
      </div>
    </>
  );
};

export default Header;
