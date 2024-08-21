import './App.css'
import Create from './components/DataManagement/Wine/Create/Create'
import Delete from './components/DataManagement/Wine/Delete/Delete'
import Details from './components/DataManagement/Wine/Read/Details'
import Read from './components/DataManagement/Wine/Read/Read'
import Update from './components/DataManagement/Wine/Update/Update'
import MainMenu from './components/MainMenu/MainMenu'
import { Routes, Route } from 'react-router-dom'
import ReadManufacturer from './components/DataManagement/Manufacturer/Read/ReadManufacturer'
import CreateManufacturer from './components/DataManagement/Manufacturer/Create/CreateManufacturer'
import UpdateManufacturer from './components/DataManagement/Manufacturer/Update/UpdateManufacturer'
import DeleteManufacturer from './components/DataManagement/Manufacturer/Delete/DeleteManufacturer'
import DetailsManufacturer from './components/DataManagement/Manufacturer/Read/DetailsManufacturer'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Read />}/>
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
     
    </>
  )
}

export default App
