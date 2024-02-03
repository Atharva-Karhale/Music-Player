import React, { useEffect, useState } from 'react'
import './App.css'
import Player from './Components/Player'
import songData from './Components/Songs.json';


function App() {
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
      // Save the file to localStorage
      const fileName = `user_upload_${Date.now()}`;
      localStorage.setItem(fileName, JSON.stringify(selectedFile));

      // Update the playlist with the new song
      const newSong = {
        title: selectedFile.name,
        artist: "User Upload",
        img_src: "path/to/default/image.jpg", // You can set a default image path
        src: URL.createObjectURL(selectedFile),
      };

      setSongs((prevSongs) => [...prevSongs, newSong]);

      // Reset the selected file after upload
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
          <div className=' h-[70px] bg-[#b9dce6] pl-2  py-4 border-2 border-[#013858]'>
            <input 
            className=' font-medium'
            type='file'
            onChange={addFile}
            />
            <button type='submit' onClick={handelSubmit} className='bg-[#3381ca] py-1 px-6 rounded-lg font-bold text-white hover:border-4  hover:border-[#002d48] hover:bg-white hover:text-[#002d48] hover:underline'>Submit</button>
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
