import { useEffect, useState } from "react"
import "./languageSelector.css"
import ICONS from "../../../assets";

import { RootState } from "../../../Store";
import {setLanguage} from "../../../Store/Language"
import { useDispatch, useSelector } from "react-redux";

export default function LanguageSelector() {
    const language = useSelector((state:RootState)=>state?.language?.language)
    const [languageDropdown, setLanguageDropdown] = useState(false);
    const [selectedLanguage,setSelectedLanguage] = useState(language);
  
    const dispatch =useDispatch();

  
    useEffect(() => {
         dispatch(setLanguage(selectedLanguage))
       

    }, [selectedLanguage,dispatch]);




   

    function toggleLanguageDropdown() {
        setLanguageDropdown(!languageDropdown);
    }

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        setLanguageDropdown(false); 
    }

    return (
        <div
            className="home_nav_language_Dropdown_Parent">
            <span className="home_nav_language">{selectedLanguage}</span>
            <span className="home_nav_language_dropdown" onClick={toggleLanguageDropdown}>
                <img
                    src={ICONS.upDown}
                    alt="upDown"
                    className={`home_nav_language_dropdown_img ${languageDropdown ? "home_nav_language_dropdown_rotate" : "home_nav_language_dropdown_notrotate"}`}
                />
            </span>
            {languageDropdown && (
                <div className="languageDropdown-list">
                    <div className="languageDropdown-item" onClick={() => handleLanguageChange('ENGLISH')}>
                        ENGLISH
                    </div>
                    <div className="languageDropdown-item" onClick={() => handleLanguageChange('HINDI')}>
                        HINDI
                    </div>
                   
                </div>
            )}

        </div>

    )
}
