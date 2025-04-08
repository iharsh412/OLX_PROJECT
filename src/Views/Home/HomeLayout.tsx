import { Outlet } from 'react-router-dom';
import './homeLayout.css';
import Navbar from './Navbar';
import NavCategory from './NavCategory';
import Ads from "./AdsSection"
import Footer from './Footer';

export function HomeLayout() {
 
  return (
    <div className="AppWrapper">
      <Navbar />
      <NavCategory />

      <div className="AppOulet">
        <Outlet />
      </div>
       <Ads/>
      <Footer />
    </div>
  );
}
