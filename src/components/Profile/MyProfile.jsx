import React from 'react'
import { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import './Profile.css'
import Header from '../Header/Header'


const Profile=()=> {
  const [formatteddata,setformatteddata] = useState(null);

  useEffect(()=>{
    const fun = async () => {
      const url = `https://apis.ccbp.in/insta-share/my-profile`;
      const jwtToken = Cookies.get('jwt_token')      
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
      const response = await fetch(url,options);
      const res =  await response.json();
      const data=res.profile
      if (response.ok===true){
        const result = {
          id: data.id,
          userId: data.user_id,
          profilePic: data.profile_pic,
          userName: data.user_name,
          followersCount: data.followers_count,
          followingCount: data.following_count,
          Bio: data.user_bio,
          postsCount: data.posts_count,
          stories: data.stories.map(j=>({
            storiesId:j.id,
            storiesImage:j.image
          })),
          posts: data.posts.map(j=>({
            postsId : j.id,
            postsImage: j.image
          }))
        }
        setformatteddata(result);
        console.log(result)
      }
    }
    fun();
  },[])


  return (
    <>
    <Header profile={true} search={false}/>
    {formatteddata && 
      <div className='profile-container'>
              <div className='user-bio-section'>
                <div>
                    <img src={formatteddata.profilePic} alt="user-pic" className='user-profile-pic'/>
                </div>
                <div className='user-details'>
                    <h1 className='username'>{formatteddata.userName}</h1>
                    <div className='socialmedia-count-container'>
                      <p>{formatteddata.postsCount} posts</p>
                      <p>{formatteddata.followersCount} followers</p>
                      <p>{formatteddata.followingCount} following</p>
                    </div>
                    <p className='user-insta-id'>{formatteddata.userId}</p>
                    <p className='user-bio'>{formatteddata.Bio}</p>
                </div>
              </div>
              <div className='highlight-container'>
              {formatteddata.stories.map((each, idx)=> (
                        <div key={each.storiesId || idx}><img src={each.storiesImage} alt="highlight-pic" className='highlight-pic'/></div>
                )
              )}
              </div>
              <hr className='horizontal-line'/>
              <div className='posts-container'>
                  <div className='post-heading'>posts</div>
                  <div className='post-images-container'>
                  {formatteddata.posts.map((each, idx) => (
                          <img key={each.postsId || idx} src={each.postsImage} alt='post-pic' className='post-pic'/>
                  ))}
                  </div>
                  
              </div>
        
      </div>}
    </>
  )
}

export default Profile
