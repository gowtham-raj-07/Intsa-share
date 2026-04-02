import React from 'react'
import Post from '../Posts/Post';
import Carousel from '../Carousel/Carousel';
import Header from '../Header/Header';
const Home = () => {
   
        
  return (
    <>

     <Header home={true} />
      <Carousel/>
      <Post/>
      
    </>
  )
}

export default Home
