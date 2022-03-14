
import {createCarouselItemFromUrl} from './carousel.js'
import {getTheBestMovieUrl} from './theBestMovie.js'
import {fetchDataFromUrl} from './dataFetcher.js'


const urlListOfTopSevenBestMovies = []


export async function manageTopSevenBestMovies(url) {
    let data = await fetchDataFromUrl(url)

    await getUrlListOfTopSevenBestMovies(data)
    await deleteTheBestMovieFromTopSevenBestMovies(url)

    for (let pas = 0; pas < 7; pas++){
        createCarouselItemFromUrl(urlListOfTopSevenBestMovies[pas])
    }
}


async function getUrlListOfTopSevenBestMovies(data) {
    for (let pas = 0; pas < data.results.length; pas++){
        urlListOfTopSevenBestMovies.push(data.results[pas].url)
    }
    if (urlListOfTopSevenBestMovies.length < 7){
        let next_page_data = await fetchDataFromUrl(data.next)
        getUrlListOfTopSevenBestMovies(next_page_data)
    }
}


async function deleteTheBestMovieFromTopSevenBestMovies(url) {
    let theBestMovieUrl = await getTheBestMovieUrl(url)
    let BestMovieIndex = urlListOfTopSevenBestMovies.indexOf(theBestMovieUrl)
    if (BestMovieIndex !== -1){
        urlListOfTopSevenBestMovies.splice(BestMovieIndex, 1)
    }
}
