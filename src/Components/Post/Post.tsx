import { useLocation } from 'react-router-dom';
import SellerDetail from '../Atom/Post/SellerDetail/SellerDetail';
import './post.css';
import { CLASSNAME } from './constant';

export default function Post() {
  const location = useLocation();

  return (
    <div className={CLASSNAME.WRAPPER}>
      <div className={CLASSNAME.SELECTED_CATEGORY}>
        <span className={CLASSNAME.SELECTED_CATEGORY_TITLE}>
          SELECTED CATEGORY
        </span>
        <span className={CLASSNAME.SELECTED_CATEGORY_NAME}>
          {location.state.categoryId} / {location.state.subcategory}
        </span>
      </div>
      <div className={CLASSNAME.POST_DETAIL}>
        <SellerDetail />
      </div>
    </div>
  );
}
