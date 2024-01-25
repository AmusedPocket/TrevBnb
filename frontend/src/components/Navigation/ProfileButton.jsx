import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
<<<<<<< HEAD
=======
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';

>>>>>>> dev

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
<<<<<<< HEAD

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
=======
  const navigate = useNavigate();
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
>>>>>>> dev
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

<<<<<<< HEAD
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

=======
  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const manageSpots = (e) => {
    e.preventDefault();
    navigate('/spots/current');
    closeMenu();
  }

>>>>>>> dev
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
<<<<<<< HEAD
=======
    <div className="log-in-menu">
>>>>>>> dev
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
<<<<<<< HEAD
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
=======
        {user ? (
          <>
            <li>Hello {user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li><button onClick={manageSpots}>Manage Spots</button></li>
            <li><button onClick={logout}>Log Out</button></li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      </div>
>>>>>>> dev
    </>
  );
}

export default ProfileButton;
<<<<<<< HEAD

=======
>>>>>>> dev
