import React from 'react'
import Card from './Card'

const CardList = () => {
    const posts = [
        {
            "nickname" : "ㅎㅇㅎㅇ",
            "post_img" : "https://img.catpre.com/web/catpre/event/popular_keyword_theme/22_pc_main_page_banner_0734.jpg",
            "post_content" : "하품하는 고먐미",
            "post_like" : 12,
            "upload_date" : "2022-2-19"
        },
        {
            "nickname" : "ㅎㅇㅎㅇ",
            "post_img" : "https://img.catpre.com/web/catpre/event/popular_keyword_theme/22_pc_main_page_banner_0734.jpg",
            "post_content" : "하품하는 고먐미",
            "post_like" : 12,
            "upload_date" : "2022-2-19"
        },
    ]
    return (
        <div className='card-list'>
            {posts.map((post, index) => (
                <Card 
                name={post.nickname} 
                image={post.post_img}
                desc={post.post_content}
                like={post.post_like}
                date={post.upload_date}
                key={index}
                />
            ))}
        </div>
    )
}

export default CardList