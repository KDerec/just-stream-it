const bestImdbScoreFilterUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="


async function manageBestMovie() {
    const response = await fetch(bestImdbScoreFilterUrl)
    const data = await response.json()
    
    let listOfBestMovies = getListOfBestMovie(data)
    if (listOfBestMovies.length === 1){
        let bestMovieUrl = listOfBestMovies[0].url
        displayBestMovieInformation(bestMovieUrl)
    }
    else {
        let bestMovieUrl = getBestMovieByVotes(listOfBestMovies)
        displayBestMovieInformation(bestMovieUrl)
    }
}


function getListOfBestMovie(data){
    let listOfBestMovies = []
    let maxImdbScore = -1
    for (let pas = 0; pas < data.results.length; pas++){
        let imdbScore = data.results[pas].imdb_score
        if (maxImdbScore <= imdbScore){
            maxImdbScore = imdbScore
            listOfBestMovies.push(data.results[pas])
        }
    }
    return listOfBestMovies
}


function getBestMovieByVotes(listOfBestMovies){
    let maxVotes = -1
    for (let pas = 0; pas < listOfBestMovies.length; pas++){
        let votes = listOfBestMovies[pas].votes
        if (maxVotes <= votes){
            maxVotes = votes
            bestMovieUrl = listOfBestMovies[pas].url
        }
    }
    return bestMovieUrl
}


async function displayBestMovieInformation(bestMovieUrl){
    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0]
    let bestMovieResume = document.getElementById("the-best-movie").getElementsByTagName("p")[0]
    let bestMovieImg = document.getElementById("best-movie-img")

    const response = await fetch(bestMovieUrl)
    const data = await response.json()
    bestMovieTitle.innerHTML = data.title
    bestMovieResume.innerHTML = data.description
    bestMovieImg.src = data.image_url  
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

async function main(){
    await manageBestMovie()
}


main()
