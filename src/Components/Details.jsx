import React from 'react'
import songData from '../Components/Songs.json';

function Details(props) {
  return (
    <div>
        <h3 className=' pb-2 font-bold text-4xl w-[30rem]'>{props.song.title}</h3>
        <img className=' size-[30rem] rounded-t-lg w-full ' src={props.song.img_src} alt='' />
        <h3 className='bg-[#2d2c2c] text-white p-1 text-2xl'>{props.song.artist}</h3>
    </div>
  )
}

export default Details