

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';
const API_BASEURL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
  const res = await fetch(`${API_BASEURL}/genre/movie/list?api_key=${API_KEY}`);
  return res.json();
};

export const fetchMovies = async (category) => {
  const res = await fetch(`${API_BASEURL}/movie/${category}?api_key=${API_KEY}`);
  return res.json();
};

export const searchMedia = async (query, mediaType) => {
  let endpoint = '';
  switch (mediaType) {
    case 'movie':
      endpoint = 'search/movie';
      break;
    case 'tv':
      endpoint = 'search/tv';
      break;
    case 'person':
      endpoint = 'search/person';
      break;
    default:
      throw new Error(`Unsupported media type: ${mediaType}`);
  }

  const res = await fetch(`${API_BASEURL}/${endpoint}?api_key=${API_KEY}&query=${query}`);
  return res.json();
};

export const fetchPopularActors = async () => {
  const res = await fetch(`${API_BASEURL}/person/popular?api_key=${API_KEY}`);
  return res.json();
};

export const fetchMovieDetails = async (movieId) => {
  const res = await fetch(`${API_BASEURL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,similar`);
  return res.json();
};

export const fetchActorDetails = async (actorId) => {
  const res = await fetch(`${API_BASEURL}/person/${actorId}?api_key=${API_KEY}`);
  return res.json();
};
