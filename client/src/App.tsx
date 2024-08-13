import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ChatWindow from './components/ChatWindow'

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/chat' element={<ChatWindow />} errorElement={<LoginForm />} />
        </Routes>
     </Router>
    </>
  )
}

export default App
