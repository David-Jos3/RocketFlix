import { API_KEY, BASE_URL, IMG_URL, language, } from './api';

const btnProcurarFilme = document.querySelector('#btn-encontrar-filme');

const getPopularMovieInfo = async () => {
    const page = Math.floor(Math.random() * 200);
    const url = `${BASE_URL}popular?api_key=${API_KEY}&${language}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        return data
    } catch (error) {
        console.error(error);
    };

};

const criarDivFilme = (filme) => {
    const areaFilme = document.querySelector('.area-filme');
    const imageUrl = `${IMG_URL}${filme.poster_path}`;
    areaFilme.innerHTML = `
        <div class="img-filme">
            <img src="${imageUrl}" alt="Imagem do Filme">
        </div>
        <div class="titulo-filme">
            <h2>${filme.title} (${filme.release_date.slice(0, 4)})</h2>
            <p>${filme.overview ? filme.overview : 'Sinopse não disponivel'}</p>
    </div>
    `
};

btnProcurarFilme.addEventListener('click', async () => {
    const movieData = await getPopularMovieInfo();
    const movieIndex = Math.floor(Math.random() * movieData.results.length);
    const filme = movieData.results[movieIndex];
    criarDivFilme(filme);
})