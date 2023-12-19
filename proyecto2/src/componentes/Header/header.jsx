import './header.css'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';

function Header() {

  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = '2a91d76fc5e37e78e76691612a9b9866'
  const IMGAGE_PATH = 'https://image.tmdb.org/t/p/original'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchkey] = useState("")
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies"});
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async(searchKey) =>{
    const type = searchKey ? "search" : "discover"
    const {data: { results },
  } = await axios.get(`${API_URL}/${type}/movie`, {
    params:{
      api_key: API_KEY,
      query: searchKey,
    },
  });

  setMovies(results)
  setMovie(results[0])

    if(results.length){
      await fetchMovie(results[0].id)
    }
  }

  const fetchMovie = async(id)=>{

    const {data} = await axios.get(`${API_URL}/movie/${id}`,{
      params:{
        api_key: API_KEY,
        append_to_response: "videos"
      }
    })

    if(data.videos && data.videos.results){
      const trailer = data.videos.results.find(
        (vid) = vid.name === "oficial Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0])
    }
    setMovie(data)
  }

  const selectMovie = async(movie)=>{
    fetchMovie(movie.id)
    setMovie(movie)
    window.scrollTo(0,0)
  }

  const searchMovies = (e)=> {
    e.preventDefault();
    fetchMovies(searchKey)
  }

  useEffect(()=>{
    fetchMovies();
  },[])
    
    return (
      <>
      <div className='main'>
    <div className="containe ">
      <h2 className='centrado'>Trailer Movies</h2> 
       <form onSubmit={searchMovies}>
        <input type="text"  placeholder='Buscar pelicula' onChange={(e)=> setSearchkey(e.target.value)}/>
         <button>Buscar</button> 
      
      {/* <main>
        {movie ? (
          <div className='vertrailer' style={{backgroundImage: `url("${IMGAGE_PATH}${movie.backdrop.path}")`,}}>

            {playing ? (
              <>
              <YouTube
                video.id={trailer.key}>
              </YouTube>
              </>
            )}


          </div>
        )}
      </main> */}

      </form>
      <div className="pelis ">
        {movies.map((movie)=>(
          <div key={movie.id} className="img">
            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={500} width="300px"/>
            <h4 className="centrado">{movie.title}</h4>
            {/* <p className='centrado'>{movie.overview}</p> */}
          </div>
        ))}
      </div>
      </div>
    </div>
    
      </>
    );
  
    }

    export default Header