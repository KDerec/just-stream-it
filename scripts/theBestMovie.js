import {fetchDataFromUrl} from './dataFetcher.js'


export async function manageTheBestMovie(url) {
    let theBestMovieUrl = await getTheBestMovieUrl(url)
    displayBestMovieInformation(theBestMovieUrl)
}


export async function getTheBestMovieUrl(url) {
    let listOfBestMovies = await getListOfBestMovies(url)
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
