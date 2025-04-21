import { Link } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../Services/Api/module/imageApi';
import { CLASSNAME, TEXT } from './constant';
import './profileSection.css';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import ICONS from '../../assets';
import { COMMON_TEXT } from '../../Interface/constant';
import Loader from "../../Components/Atom/Loader"
import Error from "../../Components/Atom/Error"

export default function ProfileSection() {
  const { data, isLoading, isError } = useGetUserInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading)
    return <Loader />
  if (isError)
    return <Error />;
  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <div className={CLASSNAME.PROFILE_TEXT_WRAPPER}>
          <Link className={CLASSNAME.CROSS} to={ROUTES_CONFIG.HOMEPAGE.path}>
            <img src={ICONS.cross} alt={COMMON_TEXT.IMG} />
          </Link>
          <h3 className={CLASSNAME.PROFILE_TEXT}>{TEXT.PROFILE}</h3>
          <Link className={CLASSNAME.EDIT} to={ROUTES_CONFIG.EDIT_PROFILE.path}>
            <img src={ICONS.edit} alt={COMMON_TEXT.IMG} />
          </Link>
        </div>
        <div className={CLASSNAME.CONTENT}>
          <div className={CLASSNAME.PROFILE_INITIAL}>{data?.username?.[0]}</div>
          <div className={CLASSNAME.USERNAME}>{data?.username}</div>
          <div className={CLASSNAME.EMAIL}>{data?.email}</div>
          <div className={CLASSNAME.PHONE}>{data?.phonenumber}</div>
          <div className={CLASSNAME.BIO}>{data?.['about me']}</div>
          <div className={CLASSNAME.ADS}>
            <Link to={ROUTES_CONFIG.MYADS.path} className={CLASSNAME.ADS_TEXT}>
              {TEXT.MYADS}
            </Link>
            <span className={CLASSNAME.ADS_COUNT}>{data?.ads_count}</span>
          </div>
        </div>
      </div>
    </>
  );
}
