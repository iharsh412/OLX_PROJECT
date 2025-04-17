import './myAdsImage.css';
import { CLASSNAME, TEXT } from './constant';
import ICONS from '../../../../assets';
import { ImageProps } from '../../../../Interface/constant';
import { useEffect, useState } from 'react';
import Modal from '../../Modal';
import { toast } from 'react-toastify';
import { useLazyGetDeleteAdsQuery } from '../../../../Services/Api/module/imageApi';
import { useNavigate } from 'react-router-dom';
import EditAds from '../../EditAds';

const MyAds: React.FC<ImageProps> = ({ data, refetch }) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [editOpen, setEditOpen] = useState<boolean>(true);
  const [post] = useLazyGetDeleteAdsQuery();

  useEffect(() => {
    async function handleDelete() {
      if (text === TEXT.DELETE_TEXT && answer === 'yes') {
        try {
          await post({ id: data.id }).unwrap();
          toast.success('Ad deleted successfully');
          refetch?.();
        } catch (error) {
          toast.error('Error while deleting ad');
        }
      }
    }
    handleDelete();
  }, [post, answer, text, open]);
  const onClickImages = () => {
    navigate(`/product/${data.name}/${data.id}`);
  };
  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnswer('no');
    setEditOpen(true);
    setOpen(true);
    setText(TEXT.EDIT_TEXT);
  };
  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnswer('no');
    setOpen(true);
    setText(TEXT.DELETE_TEXT);
  };
  console.log(editOpen, 'editOpen');
  return (
    <>
      <div className={CLASSNAME.WRAPPER} onClick={onClickImages}>
        <div className={CLASSNAME.IMAGE}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${data.display_photo}`}
            alt={data.name}
            loading="lazy"
          />
        </div>
        <div className={CLASSNAME.CONTENT}>
          <span className={CLASSNAME.COST}>
            <img src={ICONS.rupees} alt="Rs" /> {data.price}
          </span>
          <span className={CLASSNAME.STATUS}>{data.status}</span>
          <span className={CLASSNAME.NAME}>{data.name}</span>
          <div className={CLASSNAME.PLACE_DATE}>
            <span className={CLASSNAME.LOCATION}>
              {data.state} {data.city}
            </span>
            <span className={CLASSNAME.DATE}>{data.created_at}</span>
          </div>
          <div className={CLASSNAME.EDIT_DELETE}>
            <button
              title="Edit"
              className={CLASSNAME.EDIT}
              onClick={(e) => handleClickEdit(e)}
            >
              {TEXT.EDIT}
            </button>
            <button
              title="Delete"
              className={CLASSNAME.DELETE}
              onClick={handleClickDelete}
            >
              {TEXT.DELETE}
            </button>
          </div>
        </div>
      </div>
      {open && <Modal setAnswer={setAnswer} setOpen={setOpen} text={text} />}
      {text === TEXT.EDIT_TEXT && answer === 'yes' && editOpen === true && (
        <EditAds setEditOpen={setEditOpen} data={data} refetch={refetch} />
      )}
    </>
  );
};
export default MyAds;
