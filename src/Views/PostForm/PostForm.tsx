import { Navigate, useLocation } from 'react-router-dom';
import Form from '../../Components/CustomComponents/Post/PostForm';
import './postForm.css';
import { CLASSNAME, TEXT } from './constant';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { capitalizeFirstLetter } from '../../Helper/function';

export default function PostForm() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to={ROUTES_CONFIG.SELL.path} />;
  }
  return (
    // sell form section
    <div className={CLASSNAME.WRAPPER}>
      {/* header */}
      <div className={CLASSNAME.SELECTED_CATEGORY}>
        {/* selected category text */}
        <span className={CLASSNAME.SELECTED_CATEGORY_TITLE}>
          {TEXT.SELECTED_CATEGORY}
        </span>
        <span className={CLASSNAME.SELECTED_CATEGORY_NAME}>
          {capitalizeFirstLetter(location.state.categoryId)} /{' '}
          {location.state.subcategory}
        </span>
      </div>
      <div className={CLASSNAME.POST_DETAIL}>
        <Form />
      </div>
    </div>
  );
}
