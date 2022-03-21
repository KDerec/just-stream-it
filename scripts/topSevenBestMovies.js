import {createCarouselItemFromUrl} from './carousel.js';
import {getTheBestMovieUrl} from './theBestMovie.js';
import {fetchDataFromUrl} from './dataFetcher.js';


export async function manageTopOfBestMovies(url, carouselId) {
    var urlArrayOfTopSevenBestMovies = [];
    let data = await fetchDataFromUrl(url);

    urlArrayOfTopSevenBestMovies = await getUrlArrayOfTopBestMovies(data, urlArrayOfTopSevenBestMovies);
    urlArrayOfTopSevenBestMovies = await deleteTheBestMovieFromTopBestMovies(urlArrayOfTopSevenBestMovies);
    if (urlArrayOfTopSevenBestMovies.length >= 7){
        for (let pas = 0; pas < 7; pas++){
            await createCarouselItemFromUrl(urlArrayOfTopSevenBestMovies[pas], carouselId);
        }
    }
    else {
        for (let pas = 0; pas < urlArrayOfTopSevenBestMovies.length; pas++){
            await createCarouselItemFromUrl(urlArrayOfTopSevenBestMovies[pas], carouselId);
        }
    }
}


async function getUrlArrayOfTopBestMovies(data, urlArrayOfTopSevenBestMovies) {
    for (let pas = 0; pas < data.results.length; pas++){
        urlArrayOfTopSevenBestMovies.push(data.results[pas].url);
    }
    
    if (data.next !== null){
        await checkIfUrlArrayIsBigEnough(data, urlArrayOfTopSevenBestMovies);
    }

    return urlArrayOfTopSevenBestMovies;
}


async function checkIfUrlArrayIsBigEnough(data, urlArrayOfTopSevenBestMovies) {
    if (urlArrayOfTopSevenBestMovies.length < 7){
        let next_page_data = await fetchDataFromUrl(data.next);
        await getUrlArrayOfTopBestMovies(next_page_data, urlArrayOfTopSevenBestMovies);
    }
}


async function deleteTheBestMovieFromTopBestMovies(urlArrayOfTopSevenBestMovies) {
    let theBestMovieUrl = await getTheBestMovieUrl();
    let theBestMovieIndex = urlArrayOfTopSevenBestMovies.indexOf(theBestMovieUrl);
    if (theBestMovieIndex !== -1){
        urlArrayOfTopSevenBestMovies.splice(theBestMovieIndex, 1);
    }

    return urlArrayOfTopSevenBestMovies;
}
