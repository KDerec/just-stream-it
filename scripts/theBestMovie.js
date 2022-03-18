import {fetchDataFromUrl} from './dataFetcher.js'
import {createCarouselItemFromUrl} from './carousel.js'


export async function manageTheBestMovie(id) {
    let theBestMovieUrl = await getTheBestMovieUrl()
    displayBestMovieInformation(theBestMovieUrl, id)
}


export async function getTheBestMovieUrl() {
    let bestOfAllMovieUrlPage = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
    let UrlListOfBestMovies = await getUrlListOfThePage(bestOfAllMovieUrlPage)
    UrlListOfBestMovies = await getUrlListOfBestMoviesByImdbScore(UrlListOfBestMovies)
    if (UrlListOfBestMovies.length == 1){
        let theBestMovieUrl = UrlListOfBestMovies[0].url

        return theBestMovieUrl
    }
    else {
        UrlListOfBestMovies = await getUrlListOfBestMovieByAvgVote(UrlListOfBestMovies)
        if (UrlListOfBestMovies.length == 1){
            let theBestMovieUrl = UrlListOfBestMovies[0]

            return theBestMovieUrl
    
        } else {
            UrlListOfBestMovies = await getUrlListOfBestMovieByVotes(UrlListOfBestMovies)
            if (UrlListOfBestMovies.length == 1){
                let theBestMovieUrl = UrlListOfBestMovies[0]
        
                return theBestMovieUrl
        
            } else {
                let rand = Math.floor(Math.random()*UrlListOfBestMovies.length);
                let theBestMovieUrl = UrlListOfBestMovies[rand]
        
                return theBestMovieUrl
            }
        } 
    }
}


async function getUrlListOfThePage(url){
    let UrlListOfBestMovies = []
    let data = await fetchDataFromUrl(url)
    for(let pas = 0; pas < data.results.length; pas++){
        UrlListOfBestMovies.push(data.results[pas].url)
    }
    return UrlListOfBestMovies
}


async function getUrlListOfBestMoviesByImdbScore(UrlListOfBestMovies){
    let maxImdbScore = -1
    let listOfBestMoviesByImdbScore = []
    for (let pas = 0; pas < UrlListOfBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlListOfBestMovies[pas])
        if (listOfBestMoviesByImdbScore.length == 0 & maxImdbScore == -1){
            listOfBestMoviesByImdbScore.push(data.url)
            maxImdbScore = data.imdb_score
        }
        if (maxImdbScore < data.imdb_score){
            listOfBestMoviesByImdbScore = []
            listOfBestMoviesByImdbScore.push(data.url)
            maxImdbScore = data.imdb_score
        }
        if (maxImdbScore == data.imdb_score){
            listOfBestMoviesByImdbScore.push(data.url)
        }
    }

    listOfBestMoviesByImdbScore = [...new Set(listOfBestMoviesByImdbScore)]

    return listOfBestMoviesByImdbScore
}


async function getUrlListOfBestMovieByAvgVote(UrlListOfBestMovies){
    let maxAvgVote = -1
    let listOfBestMoviesByAvg = []
    for (let pas = 0; pas < UrlListOfBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlListOfBestMovies[pas])
        if (listOfBestMoviesByAvg.length == 0 & maxAvgVote == -1){
            listOfBestMoviesByAvg.push(data.url)
            maxAvgVote = data.avg_vote
        }
        if (maxAvgVote < data.avg_vote){
            listOfBestMoviesByAvg = []
            listOfBestMoviesByAvg.push(data.url)
            maxAvgVote = data.avg_vote
        }
        if (maxAvgVote == data.avg_vote){
            listOfBestMoviesByAvg.push(data.url)
        }
    }

    listOfBestMoviesByAvg = [...new Set(listOfBestMoviesByAvg)]
    
    return listOfBestMoviesByAvg
}


async function getUrlListOfBestMovieByVotes(UrlListOfBestMovies){
    let maxVotes = -1
    let listOfBestMoviesByVotes = []
    for (let pas = 0; pas < UrlListOfBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlListOfBestMovies[pas])
        if (listOfBestMoviesByVotes.length == 0 & maxVotes == -1){
            listOfBestMoviesByVotes.push(data.url)
            maxVotes = data.votes
        }
        if (maxVotes < data.votes){
            listOfBestMoviesByVotes = []
            listOfBestMoviesByVotes.push(data.url)
            maxVotes = data.votes
        }
        if (maxVotes == data.votes){
            listOfBestMoviesByVotes.push(data.url)
        }
    }

    listOfBestMoviesByVotes = [...new Set(listOfBestMoviesByVotes)]

    return listOfBestMoviesByVotes
}


async function displayBestMovieInformation(theBestMovieUrl, id){
    await createCarouselItemFromUrl(theBestMovieUrl, id)

    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0]
    let paragraph = document.createElement("p")
    let button = document.createElement("button")
    let data = await fetchDataFromUrl(theBestMovieUrl)

    bestMovieTitle.textContent = data.title
    button.className = "play-button"
    paragraph.textContent = data.description

    document.getElementById(id).appendChild(button)
    document.getElementById(id).appendChild(paragraph)
}
