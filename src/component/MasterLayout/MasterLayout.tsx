import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/Navbar'


export default function MasterLayout() {
  return (
    <>
    
       <div className=" d-flex ">
         <div >
           <SideBar/>
         </div>
         <div className="w-100">
            <NavBar/>
            <Outlet/>
         </div>
       </div>    
  
    </>
  )
}
