// SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import Header from '../Header/Header.jsx';
import Cookies from 'js-cookie';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query') || "";
  const [fetchedData, setFetchedData] = useState([])
  const token = Cookies.get("jwt_token");

  const search = () => {
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchTerm}`;
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };

    const fn = async () => {
      const response = await fetch(url, options);
      const data = await response.json(); 
      if (response.ok){
        const result = data.posts.map((each)=>({
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
        setFetchedData(result)
      }
    };
    fn();
  };

  useEffect(() => {
    let timeoutId;
    if (searchTerm !== undefined) {
      timeoutId = setTimeout(() => {
        search();
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <>
      <Header />

      <div className='search-page-main-container'>
        {fetchedData.map(i=>(
          <div className='post-img' key={i.id}>
            <img src={i.imageUrl || i.profilePic} alt="Search Result" className='post-img1'/>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchPage;
