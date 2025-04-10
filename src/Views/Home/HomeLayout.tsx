import { Outlet } from 'react-router-dom';
import './homeLayout.css';
import Navbar from '../../Components/Navbar';
import NavCategory from '../../Components/NavCategory';
import Ads from '../../Components/AdsSection';
import Footer from '../../Components/Footer';
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useEffect } from 'react';
import { setLoading } from '../../Store/Loader';

export function HomeLayout() {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);
   console.log(loader,"loader")
  useEffect(() => {
    if (loader) {
      toast.error('!! Session Expired, Please Login Again', {
        position: 'top-center',
        autoClose: 5000,
        closeOnClick: true,
      });
      dispatch(setLoading(false));
    }
  }, [loader]);
  return (
    <>
      <div className="AppWrapper">
        
        <Navbar />
        <NavCategory />

        <div className="AppOulet">
          <Outlet />
        </div>
        <Ads />
        <Footer />
      </div>
    </>
  );
}
