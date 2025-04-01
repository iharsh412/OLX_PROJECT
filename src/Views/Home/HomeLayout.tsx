import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NavCategory from './NavCategory';
import Footer from './Footer';
import './homeLayout.css';
// import  ImageDetail from "../ImageDetail"
export function HomeLayout() {
  return (
    <div className="AppWrapper">
      <Navbar />
      <NavCategory />

      <div className="AppOulet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
