import { Outlet, useLocation } from 'react-router-dom';
import './home.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar';
import NavCategory from '../../Components/NavCategory';
import Ads from '../../Components/PromotedContent';
import Footer from '../../Components/Footer';
import { RootState } from '../../Store';
import { setLoading } from '../../Store/Loader';
import CLASSNAME from './constant';
import { setItem } from '../../Store/AreaItem';
import { COMMON_TEXT } from '../../Helper/constant';

export default function HomeLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  // path change remove toast and empty the serach  field
  useEffect(() => {
    dispatch(setItem(''));
    if (location?.pathname !== '/login') toast.dismiss();
  }, [location?.pathname]);

  // for session expired
  useEffect(() => {
    if (loader) {
      toast.error(COMMON_TEXT.SESSION_EXPIRED, {
        position: 'top-center',
        autoClose: 5000,
        closeOnClick: true,
      });
      dispatch(setLoading(false));
    }
  }, [loader]);

  return (
    <div className={CLASSNAME.WRAPPER}>
      {/* Navbar */}
      <Navbar />
      {/* Nav Category */}
      <NavCategory />
      {/* Outlet */}
      <div className={CLASSNAME.OUTLET}>
        <Outlet />
      </div>
      {/* add section */}
      <Ads />
      {/* Footer */}
      <Footer />
    </div>
  );
}
