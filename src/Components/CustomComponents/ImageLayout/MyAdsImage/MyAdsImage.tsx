import './myAdsImage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { CLASSNAME, TEXT } from './constant';
import ICONS from '../../../../assets';
import { COMMON_TEXT, ImageProps } from '../../../../Helper/constant';
import Modal from '../../Modal';
import { useLazyGetDeleteAdsQuery } from '../../../../Services/Api/module/imageApi';
import EditAds from '../../EditAds';
import { getDaysFromNow } from '../../../../Helper/function';

export default function MyAdsImage({ data, refetch }: ImageProps) {
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
          toast.success(TEXT.SUCCESS);
          refetch?.();
        } catch (error) {
          toast.error(TEXT.ERROR);
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

  return (
    <>
      <div
        className={CLASSNAME.WRAPPER}
        onClick={onClickImages}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClickImages();
          }
        }}
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
              title={TEXT.EDIT}
              type="button"
              className={CLASSNAME.EDIT}
              onClick={(e) => handleClickEdit(e)}
            >
              {TEXT.EDIT}
            </button>
            <button
              title={TEXT.DELETE}
              type="button"
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
}
