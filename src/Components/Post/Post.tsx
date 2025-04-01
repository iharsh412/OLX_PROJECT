import { useLocation } from 'react-router-dom';
import  SellerDetail from "../Atom/Post/SellerDetail/SellerDetail"
import './post.css';

export default function Post() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="post-wrapper">

      <div className="postSelectedCategory">
        <span className="postSelectedCategoryTitle">SELECTED CATEGORY</span>
        <span className='postSelectedCategoryName'>
          {location.state.categoryId} / {location.state.subcategory}
        </span>
      </div>
      <div className="postSellerDetail">
        <SellerDetail/>
      </div>
    </div>
  );
}
