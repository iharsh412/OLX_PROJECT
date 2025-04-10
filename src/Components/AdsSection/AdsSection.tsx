import "./adsSection.css";
import { CLASSNAME, CONTENTS, TEXT } from "./constant"
import { COMMON_TEXT } from "../../Interface/constant";


export default function AdsSection() {
    return (<>

        <div className={CLASSNAME.WRAPPER}>
            <h4>{TEXT.TITLE}</h4>
            <div className={CLASSNAME.CONTENT}>
                {
                    CONTENTS.map((data) => (
                        <div key={data.id} className={CLASSNAME.CONTAINER}>
                            {data.type === "video" ? (<><video src={data.src} autoPlay loop muted></video>
                                <span>{data.label}</span></>) :
                                (<><img src={data.src} alt={COMMON_TEXT.IMG} />
                                    <span>{data.label}</span></>)

                            }
                        </div>
                    ))
                }
            </div>

        </div>
    </>
    )

}