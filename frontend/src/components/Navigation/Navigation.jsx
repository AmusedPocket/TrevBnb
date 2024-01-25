import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
<<<<<<< HEAD
=======
import navicon from './navicon.png'

>>>>>>> dev

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
<<<<<<< HEAD
      <li>
        <ProfileButton user={sessionUser} />
      </li>
=======
      <>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        <li>
          <NavLink to='/spots/new' className="create-new-spot hover-shadow">Create a New Spot</NavLink>
        </li>
      </>

>>>>>>> dev
    ) : (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          {/* <NavLink to="/login">Log In</NavLink> */}
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
        </li>
      </>
    );

  return (
    <ul>
<<<<<<< HEAD
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
=======
      <div className="nav-bar">
        <NavLink className="home-icon-assembly" to="/"><img className="home-icon" src={navicon} />TrevBnb</NavLink>
        <li className="nav-bar-right-side">
          {isLoaded && sessionLinks}
        </li>

      </div>
>>>>>>> dev
    </ul>
  );
}

export default Navigation;
