import './promotedContent.css';
import { CLASSNAME, CONTENTS, TEXT } from './constant';
import { COMMON_TEXT } from '../../Helper/constant';

export default function PromotedContent() {
  return (
    <div className={CLASSNAME.WRAPPER}>
      <h4>{TEXT.TITLE}</h4>
      <div className={CLASSNAME.CONTENT}>
        {CONTENTS.map((data) => (
          <button
            type="button"
            key={data.id}
            className={CLASSNAME.CONTAINER}
            onClick={() => window.open(data.link || '')}
          >
            {data?.type === 'youtube' && (
              <>
                <iframe
                  src={data.src}
                  title={data.label || 'Video content'}
                  allow="autoplay; encrypted-media"
                />
                <span className={CLASSNAME.LABEL}>{data.label}</span>
              </>
            )}
            {data.type === 'image' && (
              <>
                <img src={data.src} alt={COMMON_TEXT.IMG} />
                <span className={CLASSNAME.LABEL}>{data.label}</span>
              </>
            )}
            {data?.type === 'video' && (
              <>
                <video src={data.src} autoPlay muted loop />
                <span>{data.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
