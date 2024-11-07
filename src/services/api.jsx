import axios from 'axios';

//url da api: https://api.themoviedb.org/3/
//movie/550?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
