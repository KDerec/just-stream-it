import {manageTheBestMovie} from './theBestMovie.js';
import {manageGenre} from './genres.js'
import {manageTopOfBestMovies} from './topSevenBestMovies.js'


const bestOfAllMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const genreListUrl = "http://localhost:8000/api/v1/genres/"
const bestAnimationMoviesUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const bestAdventureMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Adventure&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const bestThrillerMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Thriller&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const bestOfAllMoviesCarouselId = "carousel-items-other-best-movies"
const bestOfCategoryOneMoviesCarouselId = "carousel-items-category-one"
const bestOfCategoryTwoMoviesCarouselId = "carousel-items-category-two"
const bestOfCategoryThreeMoviesCarouselId = "carousel-items-category-three"


async function main(){
    manageGenre(genreListUrl)
    manageTheBestMovie()
    manageTopOfBestMovies(bestOfAllMovieUrl, bestOfAllMoviesCarouselId)
    manageTopOfBestMovies(bestAnimationMoviesUrl, bestOfCategoryOneMoviesCarouselId)
    manageTopOfBestMovies(bestAdventureMovieUrl, bestOfCategoryTwoMoviesCarouselId)
    manageTopOfBestMovies(bestThrillerMovieUrl, bestOfCategoryThreeMoviesCarouselId)
}


main()
