import {manageTheBestMovie} from "./theBestMovie.js";
import {manageGenre} from "./genres.js";
import {manageTopOfBestMovies} from "./topSevenBestMovies.js";
import {manageModalBox} from "./modal.js";
import {manageCarouselButtons, managePlayButton} from "./buttons.js";


var bestOfAllMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
var genreUrl = "http://localhost:8000/api/v1/genres/";
var bestAnimationMoviesUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
var bestAdventureMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Adventure&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
var bestThrillerMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Thriller&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
var theBestMovieArticleId = "the-best-movie";
var bestOfAllMoviesCarouselId = "carousel-items-other-best-movies";
var bestOfCategoryOneMoviesCarouselId = "carousel-items-category-one";
var bestOfCategoryTwoMoviesCarouselId = "carousel-items-category-two";
var bestOfCategoryThreeMoviesCarouselId = "carousel-items-category-three";


async function main(){
    await manageGenre(genreUrl);
    await manageTheBestMovie(theBestMovieArticleId);
    await manageTopOfBestMovies(bestOfAllMovieUrl, bestOfAllMoviesCarouselId);
    await manageTopOfBestMovies(bestAnimationMoviesUrl, bestOfCategoryOneMoviesCarouselId);
    await manageTopOfBestMovies(bestAdventureMovieUrl, bestOfCategoryTwoMoviesCarouselId);
    await manageTopOfBestMovies(bestThrillerMovieUrl, bestOfCategoryThreeMoviesCarouselId);
    await manageModalBox();
    await managePlayButton();
    await manageCarouselButtons();
}


main();
