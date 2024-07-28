import './App.css'
import Create from './components/DataManagement/Wine/Create/Create'
import Delete from './components/DataManagement/Wine/Delete/Delete'
import Read from './components/DataManagement/Wine/Read/Read'
import Update from './components/DataManagement/Wine/Update/Update'
import MainMenu from './components/MainMenu/MainMenu'
import { Routes } from 'react-router-dom'

function App() {

  return (
    <>

      <Routes>
        <Route path='/wines' elements={<Read/>}/>
        <Route path='/wines/create' elements={<Create/>}/>
        <Route path='/wines/edit/:id' elements={<Update/>}/>
        <Route path='/wines/delete/:id' elements={<Delete/>}/>
      </Routes>
      <MainMenu />
      
    </>
  )
}

export default App
