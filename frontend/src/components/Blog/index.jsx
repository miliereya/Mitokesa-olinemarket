import React, { useEffect, useState } from "react";
import { postsAPI } from "../../api";
import {PostItem} from "../PostItem/PostItem";
import s from './blog.module.css'

export const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await postsAPI.getPosts()
            setPosts(data)
        }

        fetchData()
    }, [])

    return (
        <>
            <h3 className={s.title}>Explore our latest posts</h3>
            <div className={s.posts}>
                {posts.map((post) => {
                    return <PostItem {...post} key={post.name} />
                })}
            </div>
        </>
    )
}
