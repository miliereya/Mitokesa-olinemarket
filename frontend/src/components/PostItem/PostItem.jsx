import React, {useState} from "react";
import {convertISODate} from "../../utils";
import s from './PostItem.module.css'

const baseUrl = 'http://localhost:5000/public/images/blog'

export const PostItem = ({slug, name, date, text}) => {
    const [showText, setShowText] = useState(false);

    const handleShowText = () => {
        setShowText(!showText)
    }

    return (
        <div className={s.post}>
            <div className={s.box}>
                <img className={s.img} src={`${baseUrl}/${slug}.png`} alt={name} />
                <span className={s.date}>{convertISODate(date)}</span>
            </div>
            <h4 className={s.name}>{name}</h4>
            <span className={`${s.text} ${s.hidden} ${showText && s.active}`}>{text}</span>
            <button className={s.button} onClick={handleShowText}>Read more <span>></span></button>
        </div>
    )
}
