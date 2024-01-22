import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import SpotPage from './components/SpotPage';
import EditSpot from './components/EditSpot';
import LandingPage from './components/LandingPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    isLoaded && (<>
      <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/spots/:spotId' element={<SpotPage />}/>
          <Route path='/spots/:spotId/edit' element={<EditSpot />}/>
      </Routes>
      </BrowserRouter>
    </>)
  );
}


export default App;
