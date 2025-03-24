import Navbar from "./Navbar"
import NavCategory from "./NavCategory"
import { Outlet } from "react-router-dom" 
import "./homeLayout.css"
export function HomeLayout()
{
    return (
        <div className="AppWrapper">
               <Navbar/>
               <NavCategory/>
               <div className="AppOulet">
               <Outlet/>
               </div>
        </div>
    )
}