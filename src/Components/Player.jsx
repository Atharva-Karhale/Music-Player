import React, { useEffect, useRef, useState } from 'react'
import Details from './Details';
import Controls from './Controls';
import songs from "../Components/Songs.json"
import "./Player.css"

function player(props) {
  const audioE1 = useRef(null)
  const [isPlaying, setIsPlaying] = useState (false)

  useEffect(() => {
    if(isPlaying) {
      audioE1.current.play()
    } else {
      audioE1.current.pause()
    }
  })

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length -1) {
          temp = 0;
        }

        return temp;
      })
    } else {
      props.setCurrentSongIndex (() => {
        let temp = props.currentSongIndex;
        temp--;

        if(temp < 0) {
          temp =props.songs.length -1;
        }

        return temp;
      })
    }
  }
  const handelSongEnd = () => {
    skipSong(true);
  };

  return (
    <div className=' text-center items-center flex flex-col'>
      <h1>Now Playing</h1>
      <Details
        song = {props.songs[props.currentSongIndex]}
      />
      <div className=' text-3xl'>
        <Controls
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          skipSong = {skipSong}
        />
      </div>
      <audio 
      className=' audio '
      src={props.songs[props.currentSongIndex].src}
      ref={audioE1}
      onEnded={handelSongEnd}
      controls 
      ></audio>
      <p className='font-bold'>Next Up: {" "}
        <span className='font-normal'>{props.songs[props.nextSongIndex].title} by {" "}
        {props.songs[props.nextSongIndex].artist}
        </span>
      </p>  
    </div>
  )
}

export default player;