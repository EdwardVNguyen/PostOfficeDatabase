import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from "react";

import Home from './pages/Home';
import LoginOrSignUp from './pages/LogInOrSignUp';
import CustomerPage from './pages/CustomerPage'

const Shipping = lazy( () => import('./pages/Shipping'));
const Tracking = lazy( () => import('./pages/Tracking'));
const About = lazy( () => import('./pages/About'));
const Support = lazy( () => import('./pages/Support'));

import NavBar from './components/NavBar';
import AuthNavBar from './components/AuthNavBar';
import Footer from './components/Footer';
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {
  const [auth, setAuth] = useState( () => localStorage.getItem("auth") === "true");

  // authentication persists unless user explicity signs out
  useEffect( () => {
    localStorage.setItem("auth", auth) 
  }, [auth] );

  return (
    <>
      {auth ? <AuthNavBar /> : <NavBar />}
      
      <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* non-protected routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/tracking" element={<Tracking/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/support" element={<Support/>} />

          {/* login / signup page can set authentication status */}
          <Route path="/loginorsignup" element={<LoginOrSignUp setAuth={setAuth}/>} /> 

          {/* protected routes */}
          <Route element={<PrivateRoutes auth={auth} />}>
            <Route path='/customerPage' element={<CustomerPage/>} />
          </Route>
    
        </Routes>
      </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default App;
