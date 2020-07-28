import React from "react";
import { languagesArray } from "../constants/appConstants"

export const createLangOptions = () => {
    return (
        languagesArray.map((lang: string) => {
            return <option key={lang} value={lang}>{lang}</option>
        })
    )
}