import React from 'react'
import{createBrowserRouter, RouterProvider}from 'react-router-dom'
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import Home from './components/Home';
import ViewPaste from './components/ViewPaste';
const router = createBrowserRouter(
 [
  {
    path:"/",
    element:
     <div>
     <Navbar/>
     <Home/>
     </div>
  },
  {
     path:"/pastes",
    element:
    <div>
     <Navbar/>
     <Paste/>
    </div>
  },
  {
     path:"/pastes/:id",
    element:
    <div>
      <Navbar/>
      <ViewPaste/>
    </div>
  }
 ]
);
const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
