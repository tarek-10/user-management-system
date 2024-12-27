import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './component/AuthLayout/AuthLayout'
import Login from './component/Logiin/Login'
import NotFound from './component/NotFound/NotFound'
import MasterLayout from './component/MasterLayout/MasterLayout'
import Home from './component/Home/Home'
import AddUser from './component/AddUser/AddUser'
import Profile from './component/Profile/Profile'
import UserList from './component/UserList/UserList'
import { ToastContainer} from 'react-toastify';

function App() {
   const routes = createBrowserRouter([{
    path:"/",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true , element:<Login/>},
      {path:"login" , element:<Login/>},
    ]
   },
   {
    path:"dashboard" ,
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true , element:<Home/>},
      {path:"home" , element:<Home/>},
      {path:"add-user" , element:<AddUser/>},
      {path:"user-list" , element:<UserList/>},
      {path:"profile" , element:<Profile/>},
    ]
    }
  ])

  return (
    <>
     <ToastContainer />
     <RouterProvider router={routes}></RouterProvider>  
    </>
  )
}

export default App
