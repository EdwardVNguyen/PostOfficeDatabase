import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Shipping from './pages/Shipping';
import Tracking from './pages/Tracking';
import About from './pages/About';
import Support from './pages/Support';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar' ;

const App = () => {
  return (
    <>
      <header id="header">
        <NavBar />
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/tracking" element={<Tracking/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/signIn" element={<SignIn/>} />
          <Route path="/signUp" element={<SignUp/>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
