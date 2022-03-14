const bestImdbScoreFilterUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const genreListUrl = "http://localhost:8000/api/v1/genres/"


import {manageTheBestMovie} from './theBestMovie.js';
import {manageCategory} from './category.js'
import {manageTopSevenBestMovies} from './topSevenBestMovies.js'



async function main(){
    manageCategory(genreListUrl)
    manageTheBestMovie(bestImdbScoreFilterUrl)
    manageTopSevenBestMovies(bestImdbScoreFilterUrl)
}


main()
