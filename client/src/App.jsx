import './App.css'
import Registration from './components/UserManagement/Registration/Registration'
import Login from './components/UserManagement/Login/Login'
import Create from './components/DataManagement/Wine/Create/Create'
import Delete from './components/DataManagement/Wine/Delete/Delete'
import Details from './components/DataManagement/Wine/Read/Details'
import Read from './components/DataManagement/Wine/Read/Read'
import Update from './components/DataManagement/Wine/Update/Update'
import { Routes, Route } from 'react-router-dom'
import ReadManufacturer from './components/DataManagement/Manufacturer/Read/ReadManufacturer'
import CreateManufacturer from './components/DataManagement/Manufacturer/Create/CreateManufacturer'
import UpdateManufacturer from './components/DataManagement/Manufacturer/Update/UpdateManufacturer'
import DeleteManufacturer from './components/DataManagement/Manufacturer/Delete/DeleteManufacturer'
import DetailsManufacturer from './components/DataManagement/Manufacturer/Read/DetailsManufacturer'
import { UserContextProvider } from '../context/userContext'
import Navigation from './components/Navigation/Navigation'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Logout from './components/UserManagement/Login/Logout'

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Navigation />
      <Toaster position="bottom-center" reverseOrder={false} toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Read />}/>
        <Route path='/register' element={<Registration />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/wines' element={<Read/>}/>
        <Route path='/wines/create' element={<Create/>}/>
        <Route path='/wines/details/:id' element={<Details/>}/>
        <Route path='/wines/edit/:id' element={<Update/>}/>
        <Route path='/wines/delete/:id' element={<Delete/>}/>
        <Route path='/manufacturers' element={<ReadManufacturer/>}/>
        <Route path='/manufacturers/details/:id' element={<DetailsManufacturer/>}/>
        <Route path='/manufacturers/create' element={<CreateManufacturer/>}/>
        <Route path='/manufacturers/edit/:id' element={<UpdateManufacturer/>}/>
        <Route path='/manufacturers/delete/:id' element={<DeleteManufacturer/>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
