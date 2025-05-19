import './usersAdsImage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { CLASSNAME } from './constant';
import ICONS from '../../../../assets';
import { COMMON_TEXT } from '../../../../Helper/constant';
import { ImageProps } from '../../../../Helper/interface';
import Modal from '../../Modal';
import { useLazyGetDeleteAdsQuery } from '../../../../Services/Api/module/imageApi';
import EditAds from '../../EditAds';
import { getDaysFromNow } from '../../../../Helper/function';

export default function MyAdsImage({ data, refetch }: Readonly<ImageProps>) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [editOpen, setEditOpen] = useState<boolean>(true);
  const [post] = useLazyGetDeleteAdsQuery();

  useEffect(() => {
    async function handleDelete() {
      if (text === COMMON_TEXT.DELETE_TEXT && answer === 'yes') {
        try {
          await post({ id: data.id }).unwrap();
          toast.success(COMMON_TEXT.SUCCESS);
          refetch?.();
        } catch (error) {
          toast.error(COMMON_TEXT.ERROR_IN_DELETING);
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
    setText(COMMON_TEXT.EDIT_TEXT);
  };
  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnswer('no');
    setOpen(true);
    setText(COMMON_TEXT.DELETE_TEXT);
  };

  return (
    <>
      <button
        className={CLASSNAME.WRAPPER}
        onClick={onClickImages}
        type="button"
        tabIndex={0}
      >
        <div className={CLASSNAME.IMAGE}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${data.display_photo}`}
            alt={data.name}
            loading="lazy"
          />
        </div>
        <div className={CLASSNAME.CONTENT}>
          <span className={CLASSNAME.COST}>
            <img src={ICONS.rupees} alt={COMMON_TEXT.IMG} /> {data.price}
          </span>
          <span className={CLASSNAME.NAME}>{data.name}</span>
          <div className={CLASSNAME.PLACE_DATE}>
            <span className={CLASSNAME.LOCATION}>
              {data.city} , {data.state}
            </span>
            <span className={CLASSNAME.DATE}>
              {typeof data?.created_at === 'string'
                ? getDaysFromNow(data.created_at)
                : ''}
            </span>
          </div>
          <div className={CLASSNAME.EDIT_DELETE}>
            <button
              title={COMMON_TEXT.EDIT}
              type="button"
              className={CLASSNAME.EDIT}
              onClick={(e) => handleClickEdit(e)}
            >
              {COMMON_TEXT.EDIT}
            </button>
            <button
              title={COMMON_TEXT.DELETE}
              type="button"
              className={CLASSNAME.DELETE}
              onClick={handleClickDelete}
            >
              {COMMON_TEXT.DELETE}
            </button>
          </div>
        </div>
      </button>
      {open && <Modal setAnswer={setAnswer} setOpen={setOpen} text={text} />}
      {text === COMMON_TEXT.EDIT_TEXT &&
        answer === 'yes' &&
        editOpen === true && (
          <EditAds setEditOpen={setEditOpen} data={data} refetch={refetch} />
        )}
    </>
  );
}
