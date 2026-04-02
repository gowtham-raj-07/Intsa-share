import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router'
import './post.css'

function Post() {
    const [modifiedobject,setmodifiedobject] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const navigate= useNavigate()

    useEffect(() => {
        const fun = async () =>{
            const jwtToken = Cookies.get('jwt_token')
            const url="https://apis.ccbp.in/insta-share/posts";
            const options={
                method:"GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const response = await fetch(url,options);
            const data = await response.json();
            if (response.ok){
                const result=data.posts.map(each =>({
                        id:each.post_id,
                        userID:each.user_id,
                        name:each.user_name,
                        profilePic:each.profile_pic,
                        imageUrl:each.post_details.image_url,
                        caption:each.post_details.caption,
                        likesCount:each.likes_count,
                        comments:each.comments.map(j=>({
                            username: j.user_name,
                            userId : j.user_id,
                            comment: j.comment
                        })),
                        createdAt:each.created_at
                }))
                setmodifiedobject(result)
            }
        }
        fun()
    },[])

    const toggleLike = async (id, isCurrentlyLiked) => {
        // Optimistic UI update
        setLikedPosts(prev => 
            prev.includes(id) ? prev.filter(postId => postId !== id) : [...prev, id]
        )

        try {
            const jwtToken = Cookies.get('jwt_token')
            const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`;
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ like_status: !isCurrentlyLiked })
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                // Revert update if the request fails
                setLikedPosts(prev => 
                    isCurrentlyLiked ? [...prev, id] : prev.filter(postId => postId !== id)
                )
            }
        } catch (error) {
            // Revert update if there's a network error
            setLikedPosts(prev => 
                isCurrentlyLiked ? [...prev, id] : prev.filter(postId => postId !== id)
            )
        }
    }

  return (
    <>
        <div className='main-post-container'>
            {modifiedobject.map((i)=>{
                const isPostLiked = likedPosts.includes(i.id);
                return (
                <div className='post-container' key={i.id}>
                    <div className='post-header' onClick={()=>{navigate(`/profile/${i.userID}`)}}>
                        <img src={i.profilePic} alt="profile-img" className='post-profile-pic'/>
                        <h1 className='post-username'>{i.name}</h1>
                    </div>
                    <div className='post-image-container'>
                        <img src={i.imageUrl} alt="post-img" className='post-image'/>
                    </div>
                    <div className='post-actions-section'>
                        <div className='post-icons'>
                            <button className='icon-button' onClick={() => toggleLike(i.id, isPostLiked)}>
                                <i className={`bxr ${isPostLiked ? 'bxs-heart liked' : 'bx-heart'}`}></i>
                            </button>
                            <button className='icon-button'>
                                <i className={`bx bx-message-bubble`}></i>
                            </button>
                            <button className='icon-button'>
                                <i className={`bxr bx-share`}></i>
                            </button>
                        </div>
                        <p className='post-likes-count'>{i.likesCount + (isPostLiked ? 1 : 0)} likes</p>
                    </div>
                    
                    <div className='post-bio-section'>
                        <p className='caption-container'>
                            <span className='caption-username'>{i.name}</span>
                            <span className='caption'>{i.caption}</span>
                        </p>
                        {i.comments.map((item,ind) => {
                            return (
                                <div className='comment-row' key={ind}>
                                  <span className='comment-username'>{item.username}</span>
                                  <span className='comment-text'>{item.comment}</span>
                                </div>
                            )
                        })}
                        <p className='created-at'>{i.createdAt}</p>
                    </div>
                </div>
            )})}
        </div>
    </>
  )
}

export default Post
