
import {createCarouselItemFromUrl} from './carousel.js'
import {getTheBestMovieUrl} from './theBestMovie.js'
import {fetchDataFromUrl} from './dataFetcher.js'


export async function manageTopOfBestMovies(url, carouselId) {
    var urlListOfTopSevenBestMovies = []
    let data = await fetchDataFromUrl(url)

    urlListOfTopSevenBestMovies = await getUrlListOfTopOfBestMovies(data, urlListOfTopSevenBestMovies)
    urlListOfTopSevenBestMovies = await deleteTheBestMovieFromTopOfBestMovies(urlListOfTopSevenBestMovies)
    
    for (let pas = 0; pas < 7; pas++){
        createCarouselItemFromUrl(urlListOfTopSevenBestMovies[pas], carouselId)
    }
}


async function getUrlListOfTopOfBestMovies(data, urlListOfTopSevenBestMovies) {
    for (let pas = 0; pas < data.results.length; pas++){
        urlListOfTopSevenBestMovies.push(data.results[pas].url)
    }
    await checkIfUrlListIsBigEnough(data, urlListOfTopSevenBestMovies)

    return urlListOfTopSevenBestMovies
}


async function checkIfUrlListIsBigEnough(data, urlListOfTopSevenBestMovies) {
    if (urlListOfTopSevenBestMovies.length < 7){
        let next_page_data = await fetchDataFromUrl(data.next)
        await getUrlListOfTopOfBestMovies(next_page_data, urlListOfTopSevenBestMovies)
    }
}


async function deleteTheBestMovieFromTopOfBestMovies(urlListOfTopSevenBestMovies) {
    let theBestMovieUrl = await getTheBestMovieUrl()
    let BestMovieIndex = urlListOfTopSevenBestMovies.indexOf(theBestMovieUrl)
    if (BestMovieIndex !== -1){
        urlListOfTopSevenBestMovies.splice(BestMovieIndex, 1)
    }

    return urlListOfTopSevenBestMovies
}
