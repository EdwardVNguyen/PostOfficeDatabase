import './App.css';
import { Routes , Route } from 'react-router-dom';
import { Suspense, lazy } from "react";

import Home from './pages/Home';
import LoginOrSignUp from './pages/LogInOrSignUp';

const Shipping = lazy( () => import('./pages/Shipping'));
const Tracking = lazy( () => import('./pages/Tracking'));
const About = lazy( () => import('./pages/About'));
const Support = lazy( () => import('./pages/Support'));

import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <NavBar />
      
      <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/tracking" element={<Tracking/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/loginorsignup" element={<LoginOrSignUp/>} />
        </Routes>
      </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default App;
