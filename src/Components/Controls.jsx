import React from 'react'
import { IoPlaySkipForwardSharp, IoPlaySharp, IoPlaySkipBack, IoPauseSharp } from "react-icons/io5";

function Controls(props) {
  return (
    <div className=' flex m-2 gap-4 text-[#2d2c2c]'>
        <button onClick={() => props.skipSong(false) }><IoPlaySkipBack/></button>
        <button onClick={() => props.setIsPlaying(!props.isPlaying)}><div> {props.isPlaying ? <IoPauseSharp className=' text-[#2c93e1] bg-white text-6xl rounded-full p-3' /> : <IoPlaySharp className='   text-[#2c93e1] bg-white text-6xl rounded-full p-3' />} </div></button>
        <button onClick={() => props.skipSong()}><IoPlaySkipForwardSharp/></button>
    </div>
  )
}

export default Controls