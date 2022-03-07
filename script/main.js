// let bestMovieImg = document.getElementById("best-movie-img")
const best_imdb_score_filter_url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="


function getBestMovieUrl() {
    return fetch(best_imdb_score_filter_url)
        .then(response => response.json())
        .then(data => {
            let list_of_best_movies = getListOfBestMovie(data)
            if (list_of_best_movies.length === 0){
                let best_movie_url = list_of_best_movies[0].url
            }
            else {
                let best_movie_url = getBestMovieByVotes(list_of_best_movies)
            }
            return best_movie_url
        })
}


function getListOfBestMovie(data){
    let list_of_best_movies = []
    let max_imbd_score = -1
    for (let pas = 0; pas < data.results.length; pas++){
        let imdb_score = data.results[pas].imdb_score
        if (max_imbd_score <= imdb_score){
            max_imbd_score = imdb_score
            list_of_best_movies.push(data.results[pas])
        }
    }
    return list_of_best_movies
}


function getBestMovieByVotes(list_of_best_movies){
    let max_votes = -1
    for (let pas = 0; pas < list_of_best_movies.length; pas++){
        let votes = list_of_best_movies[pas].votes
        if (max_votes <= votes){
            max_votes = votes
            best_movie_url = list_of_best_movies[pas].url
        }
    }
    return best_movie_url
}


let best_movie_url = getBestMovieUrl()
best_movie_url.then(result => console.log(result))