import {fetchDataFromUrl} from './dataFetcher.js'


export async function manageTheBestMovie() {
    let theBestMovieUrl = await getTheBestMovieUrl()
    displayBestMovieInformation(theBestMovieUrl)
}


export async function getTheBestMovieUrl() {
    let bestOfAllMovieUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
    let listOfBestMovies = await getListOfBestMovies(bestOfAllMovieUrl)
    if (listOfBestMovies.length === 1){
        let theBestMovieUrl = listOfBestMovies[0].url

        return theBestMovieUrl
    }
    else {
        let theBestMovieUrl = getTheBestMovieByVotes(listOfBestMovies)

        return theBestMovieUrl
    }
}


async function getListOfBestMovies(url){
    let data = await fetchDataFromUrl(url)
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


function getTheBestMovieByVotes(listOfBestMovies){
    let maxVotes = -1
    for (let pas = 0; pas < listOfBestMovies.length; pas++){
        let votes = listOfBestMovies[pas].votes
        if (maxVotes <= votes){
            maxVotes = votes
            var theBestMovieUrl = listOfBestMovies[pas].url
        }
    }
    return theBestMovieUrl
}


async function displayBestMovieInformation(theBestMovieUrl){
    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0]
    let bestMovieResume = document.getElementById("the-best-movie").getElementsByTagName("p")[0]
    let bestMovieImg = document.getElementById("the-best-movie-img")

    let data = await fetchDataFromUrl(theBestMovieUrl)

    bestMovieTitle.innerHTML = data.title
    bestMovieResume.innerHTML = data.description
    bestMovieImg.src = data.image_url  
}
