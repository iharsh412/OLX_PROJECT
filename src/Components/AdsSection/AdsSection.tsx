import './adsSection.css';
import { CLASSNAME, CONTENTS, TEXT } from './constant';
import { COMMON_TEXT } from '../../Interface/constant';

export default function AdsSection() {
  return (
    <>
      <div className={CLASSNAME.WRAPPER}>
        <h4>{TEXT.TITLE}</h4>
        <div className={CLASSNAME.CONTENT}>
          {CONTENTS.map((data) => (
            <div
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
                  ></iframe>
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
                  <video src={data.src} autoPlay muted loop></video>
                  <span>{data.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
