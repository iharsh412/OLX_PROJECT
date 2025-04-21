import "./error.css"
import { CLASSNAME, TEXT } from "./constant"

export default function Error() {
    return (
        <div className={CLASSNAME.ERROR}>
            <h1>{TEXT.SOMETHING_WENT_WRONG}</h1>
        </div>

    )
}