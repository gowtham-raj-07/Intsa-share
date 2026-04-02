import React from "react";
import Slider from "react-slick";
import { useEffect,useState } from "react";
import  Cookies  from "js-cookie";

import "./Carousel.css"

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

const Carousel = () => {
    const [formateddata,setformateddata] = useState(null);
    
    useEffect(()=>{
        const fun = async () =>{
            const url = "https://apis.ccbp.in/insta-share/stories";
            const jwtToken = Cookies.get('jwt_token')
            const options = {
                method:"GET",
                headers: {
                    Authorization:`Bearer ${jwtToken}`
                }
            }
            const response = await fetch(url,options);
            const data = await response.json();
            if (response.ok === true){
                const result = data.users_stories.map(each => ({
                    userId:each.user_id,
                    userName:each.user_name,
                    storyUrl:each.story_url
                }))
            setformateddata(result);
            }
        }
        fun();
    },[]);

  return (
    <>
        {formateddata && 
        <div className="main-container">
       <div className="slick-container">
        <Slider {...settings} >
          {formateddata.map((each, idx) =>(
            <div className="slick-item" key={each.userId || idx}>
                <img src={each.storyUrl} alt="story-image" className="story-image"/>
                <p className="story-username">{each.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    }
    </>
  );
};

export default Carousel;
