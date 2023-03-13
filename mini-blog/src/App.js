import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NavBar from './components/navBar/NavBar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import useAuthContext from './hooks/useAuthContext';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const {user}=useAuthContext()

  function AuthenticatedPrivate({children}){

      if(user){
        return children
      }

      return <Navigate to='/Login'/>
  }

  function PrivateNotAuthenticated({children}){
    if(!user){
      return children
    }

    return <Navigate to='/'/>
  }

  return (
    <Router>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/Login' element={<PrivateNotAuthenticated><Login/></PrivateNotAuthenticated>}/>
          <Route path='/Register' element={<PrivateNotAuthenticated><Register/></PrivateNotAuthenticated>}/>
          <Route path='/Posts/Create' element={<AuthenticatedPrivate><CreatePost/></AuthenticatedPrivate>}/>
          <Route path='/Posts/:id' element={<AuthenticatedPrivate><Post/></AuthenticatedPrivate>}/>
          <Route path='/Posts/Edit/:id' element={<AuthenticatedPrivate><EditPost/></AuthenticatedPrivate>}/>
          <Route path='/Dashboard' element={<AuthenticatedPrivate><Dashboard/></AuthenticatedPrivate>}/>
          <Route path='/Search' element={<AuthenticatedPrivate><Search/></AuthenticatedPrivate>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
