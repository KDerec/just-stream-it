import {fetchDataFromUrl} from './dataFetcher.js'
import {createCarouselItemFromUrl} from './carousel.js'

export async function manageTheBestMovie(id) {
    let theBestMovieUrl = await getTheBestMovieUrl()
    displayBestMovieInformation(theBestMovieUrl, id)
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


async function displayBestMovieInformation(theBestMovieUrl, id){
    await createCarouselItemFromUrl(theBestMovieUrl, id)

    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0]
    let paragraph = document.createElement("p")
    let button = document.createElement("button")
    let data = await fetchDataFromUrl(theBestMovieUrl)

    bestMovieTitle.textContent = data.title
    button.name = "play"
    button.textContent = "Play"
    paragraph.textContent = data.description

    document.getElementById(id).appendChild(button)
    document.getElementById(id).appendChild(paragraph)
}
