import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { RegisterPage } from './Register/RegisterPage'
import { SignIn } from './SignIn/SignIn'
import { HomePage } from './HomePage/Home/HomePage'
import './App.scss'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<RegisterPage />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='/homepage' element={<HomePage />}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
