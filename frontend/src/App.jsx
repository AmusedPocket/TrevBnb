import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';

function Layout() {
=======
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import SpotPage from './components/SpotPage';
import EditSpot from './components/EditSpot';
import LandingPage from './components/LandingPage';
import ManageSpots from './components/ManageSpots';
import CreateASpotForm from './components/CreateSpotForm';


function App() {
>>>>>>> dev
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
=======
    isLoaded && (<>
      <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/spots/:spotId' element={<SpotPage />}/>
          <Route path='/spots/:spotId/edit' element={<EditSpot />}/>
          <Route path='/spots/new' element={<CreateASpotForm/>}/>
          <Route path='/spots/current' element={<ManageSpots/>}/>
      </Routes>
      </BrowserRouter>
    </>)
  );
}

>>>>>>> dev

export default App;
