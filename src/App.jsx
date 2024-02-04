import React, { useEffect, useState } from 'react'
import './App.css'
import Player from './Components/Player'
//import songData from './Components/Songs.json';
import { FaFilePdf, FaGithub, FaLinkedin, FaMousePointer, FaAngleDown } from "react-icons/fa";
import { IoLogoBehance } from "react-icons/io5";
import one from "./Assets/Images/Tu-hai-kahan.jpg"
import oneOne from "./Assets/Songs/Tu-Hai-Kahan-reply-version.mp3"
import two from "./Assets/Images/WithYou.jpg"
import twoTwo from "./Assets/Songs/With You.mp3"
import three from "./Assets/Images/DeadAndCold.jpg"
import threeThree from "./Assets/Songs/Dead And Cold.mp3"
import four from "./Assets/Images/LoveIsADrug.jpg"
import fourFour from "./Assets/Songs/Love_Is_a_Drug[DodoConverter.com].mp3"
import five from "./Assets/Images/Perfect.png"
import fiveFive from "./Assets/Songs/Logic_feat_Lil_Wayne_A_AP_Ferg_-_Perfect_Remix__Connectloaded.com.mp3"
import six from "./Assets/Images/Your Eyes.png"
import sixSix from "./Assets/Songs/Your-Eyes-Got-My-Heart-Barney-Sku(PagalWorld).mp3"

function App() {
  const [songData] = useState([
    {
      "title": "Tu Hai Kahan Reply Version",
      "artist": "Aadil Rizvi, Shuddhi",
      "img_src": one,
      "src": oneOne
  },
  {
      "title": "With You",
      "artist": "AP Dhillon",
      "img_src": two,
      "src": twoTwo
  },
  {
      "title": "Dead and Cold",
      "artist": "SadBoyProfilic",
      "img_src": three,
      "src": threeThree
  },
  {
      "title": "Love is a Drug",
      "artist": "Papithbk",
      "img_src": four,
      "src": fourFour
  },
  {
      "title": "Perfect",
      "artist": "Logic",
      "img_src": five,
      "src": fiveFive
  },
  {
      "title": "Your Eyes",
      "artist": "Barney Sku, Taqiya Zaman",
      "img_src": six,
      "src": sixSix
  }
  ])
  const [count, setCount] = useState(0)
  const [songs, setSongs] = useState(songData);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [selectedFile, setSelectedFile] =useState (null);

  useEffect(() => {
      setNextSongIndex(() => {
          if (currentSongIndex + 1 > songs.length - 1) {
              return 0;
          } else {
              return currentSongIndex + 1;
          }
      });
  }, [currentSongIndex, songs]);

  const addFile = (event) =>{
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handelSubmit = () => {
    if (selectedFile) {
      
      const fileName = `user_upload_${Date.now()}`;
      localStorage.setItem(fileName, JSON.stringify(selectedFile));

      
      const newSong = {
        title: selectedFile.name,
        artist: "User Upload",
        img_src: "src/Assets/Images/HD-wallpaper-question-mark-question-mark-pattern-amoled-dark-pure-black-thumbnail (2).jpg", 
        src: URL.createObjectURL(selectedFile),
      };

      setSongs((prevSongs) => [...prevSongs, newSong]);

      
      setSelectedFile(null);
    } else {
      console.log("No file selected");
    }
  };


  return (
    <div className=' grid grid-cols-[1fr_3fr]'>
      <div className=' bg-slate-600 h-full grid grid-rows-[1fr_10fr]'>
        <div className=' bg-[#2a2a2a] text-white font-bold text-4xl text-center p-4 '>Playlist</div>
        <div>{songs.map((song, index) => (
          <div className=' cursor-pointer flex justify-center bg-slate-400 border-black border hover:border-white hover:bg-slate-900 hover:text-white border-3 px-8 py-4 ' key={index} onClick={() => {setCurrentSongIndex(index);}}>
            {song.title} - {song.artist}
          </div>))}
          <div className=' h-[70px] bg-[#b9dce6] border-2 border-[#013858]'>
            <input 
            className=' pl-2 py-4 font-medium file:m-1 file:mr-2 file:bg-[#272727] file:rounded file:text-white file:underline '
            type='file'
            onChange={addFile}
            />
            <button type='submit' onClick={handelSubmit} className='bg-[#3381ca]  py-1 px-6 rounded-lg font-bold text-white hover:border-4  hover:border-[#002d48] hover:bg-[#c4dce4] hover:text-[#002d48] hover:underline'>Submit</button>
          </div>
          <div>
          <div className='mt-44 text-center font-bold text-sm'> - SOCIALS - </div>
            <ul className=' flex text-3xl justify-between p-4 '>
                <li title='Github' className=' rounded-full border-4 border-[#ffffff] p-2 border-opacity-25 hover:border-[#b5d3e2] '><a href='https://github.com/Atharva-Karhale'><FaGithub className='text-theme1-gray' /></a></li>
                <li title='LinkedIn' className='rounded-full border-4 border-[#ffffff] p-2 border-opacity-25 hover:border-[#b5d3e2]'><a href='https://www.linkedin.com/in/atharva-karhale/'><FaLinkedin className='text-theme1-gray' /></a></li>
                <li title='Download CV in PDF format' className='rounded-full border-4 border-[#ffffff] p-2 border-opacity-25 hover:border-[#b5d3e2]'><a href='https://drive.google.com/file/d/1SWpz9SmIiAgliZbgGUqFd-yo9hPrjTxJ/view?usp=sharing'><FaFilePdf  className='text-theme1-gray' /></a></li>
                <li title='Download CV in PDF format' className='rounded-full border-4 border-[#ffffff] p-2 border-opacity-25 hover:border-[#b5d3e2]'><a href='https://www.behance.net/askmodink'><IoLogoBehance className='text-theme1-gray' /></a></li>
            </ul>
            
          </div>
        </div>
      </div>
      <div className=' bg-[#bad4e5]'>
        <Player
          currentSongIndex = {currentSongIndex}
          setCurrentSongIndex = {setCurrentSongIndex}
          nextSongIndex = {nextSongIndex}
          songs = {songs}
        />
      </div>
    </div>
  )
}

export default App
