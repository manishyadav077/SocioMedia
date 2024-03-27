import React, {useEffect, useState} from 'react'
import PostForm from './PostForm'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/service"


const EditPost = () => {
  const [post, setPosts] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()
 

  useEffect(()=>{
    if(id){
      appwriteService.getPost(id).then((post)=>{
        if(post){
          setPosts(post)
        }
      })

    }else{
      navigate('/')
    }
  },[id, navigate])

  return post?(
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start 
        gap-3 justify-start w-full'>
          <img src="/edit.svg" width={36} height={36} alt="add" />
          <h2 className='h3-bold md:h2-bold text-left 
          w-full'>Edit Post</h2>
        </div>
        <PostForm post={post}/>
      </div>
    </div>
  ): null
}

export default EditPost
