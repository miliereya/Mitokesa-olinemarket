import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsAPI } from "../../api";
import { convertISODate } from "../../utils";
import s from './blog.module.css'

const baseUrl = 'http://localhost:5000/public/images/blog'

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isTextHidden, setIsTextHidden] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await postsAPI.getPosts()
            setPosts(data)
        }

        fetchData()
    }, [])

    const showText = () => {
        setIsTextHidden(!isTextHidden)
    }

    return (
        <>
            <h3 className={s.title}>Explore our latest posts</h3>
            <div className={s.posts}>
                {posts.map(({slug, name, date, text}) => {
                    return (
                        <div className={s.post} key={name}>
                            <div className={s.box}>
                                <Link to={slug}>
                                    <img className={s.img} src={`${baseUrl}/${slug}.png`} alt={name} />
                                </Link>

                                <span className={s.date}>{convertISODate(date)}</span>
                            </div>
                            <h4 className={s.name}>
                                <Link className={s.link} to={slug}>{name}</Link>
                            </h4>
                            <span className={`${s.text} ${isTextHidden && s.hidden}`}>{text}</span>
                            <button className={s.button} onClick={showText}>Read more <span>></span></button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
