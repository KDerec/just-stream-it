import {fetchDataFromUrl} from './dataFetcher.js';
import {createCarouselItemFromUrl} from './carousel.js';


export async function manageTheBestMovie(id) {
    let theBestMovieUrl = await getTheBestMovieUrl();
    createTheBestMovieInHtml(theBestMovieUrl, id);
}


export async function getTheBestMovieUrl() {
    let bestImdbScoreMovieUrlPage = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
    let UrlArrayBestMovies = await getUrlArrayOfPage(bestImdbScoreMovieUrlPage);
    UrlArrayBestMovies = await getUrlArrayOfBestMoviesByImdbScore(UrlArrayBestMovies);
    if (UrlArrayBestMovies.length === 1){
        let theBestMovieUrl = UrlArrayBestMovies[0].url;

        return theBestMovieUrl;
    }
    else {
        UrlArrayBestMovies = await getUrlArrayOfBestMovieByAvgVote(UrlArrayBestMovies);
        if (UrlArrayBestMovies.length === 1){
            let theBestMovieUrl = UrlArrayBestMovies[0];

            return theBestMovieUrl;
    
        } else {
            UrlArrayBestMovies = await getUrlArrayOfBestMovieByVotes(UrlArrayBestMovies);
            if (UrlArrayBestMovies.length === 1){
                let theBestMovieUrl = UrlArrayBestMovies[0];
        
                return theBestMovieUrl;
        
            } else {
                let rand = Math.floor(Math.random()*UrlArrayBestMovies.length);
                let theBestMovieUrl = UrlArrayBestMovies[rand];
        
                return theBestMovieUrl;
            }
        } 
    }
}


async function getUrlArrayOfPage(url){
    let UrlArrayBestMovies = [];
    let data = await fetchDataFromUrl(url);
    for(let pas = 0; pas < data.results.length; pas++){
        UrlArrayBestMovies.push(data.results[pas].url);
    }
    return UrlArrayBestMovies;
}


async function getUrlArrayOfBestMoviesByImdbScore(UrlArrayBestMovies){
    let maxImdbScore = -1;
    let arrayOfBestMoviesByImdb = [];
    for (let pas = 0; pas < UrlArrayBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlArrayBestMovies[pas]);
        if (arrayOfBestMoviesByImdb.length === 0 & maxImdbScore === -1){
            arrayOfBestMoviesByImdb.push(data.url);
            maxImdbScore = data.imdb_score;
        }
        if (maxImdbScore < data.imdb_score){
            arrayOfBestMoviesByImdb = [];
            arrayOfBestMoviesByImdb.push(data.url);
            maxImdbScore = data.imdb_score;
        }
        if (maxImdbScore === data.imdb_score){
            arrayOfBestMoviesByImdb.push(data.url);
        }
    }

    arrayOfBestMoviesByImdb = [...new Set(arrayOfBestMoviesByImdb)];

    return arrayOfBestMoviesByImdb;
}


async function getUrlArrayOfBestMovieByAvgVote(UrlArrayBestMovies){
    let maxAvgVote = -1;
    let arrayOfBestMoviesByAvg = [];
    for (let pas = 0; pas < UrlArrayBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlArrayBestMovies[pas]);
        if (arrayOfBestMoviesByAvg.length === 0 & maxAvgVote === -1){
            arrayOfBestMoviesByAvg.push(data.url);
            maxAvgVote = data.avg_vote;
        }
        if (maxAvgVote < data.avg_vote){
            arrayOfBestMoviesByAvg = [];
            arrayOfBestMoviesByAvg.push(data.url);
            maxAvgVote = data.avg_vote;
        }
        if (maxAvgVote === data.avg_vote){
            arrayOfBestMoviesByAvg.push(data.url);
        }
    }

    arrayOfBestMoviesByAvg = [...new Set(arrayOfBestMoviesByAvg)];
    
    return arrayOfBestMoviesByAvg;
}


async function getUrlArrayOfBestMovieByVotes(UrlArrayBestMovies){
    let maxVotes = -1;
    let arrayOfBestMoviesByVotes = [];
    for (let pas = 0; pas < UrlArrayBestMovies.length; pas++){
        let data = await fetchDataFromUrl(UrlArrayBestMovies[pas]);
        if (arrayOfBestMoviesByVotes.length === 0 & maxVotes === -1){
            arrayOfBestMoviesByVotes.push(data.url);
            maxVotes = data.votes;
        }
        if (maxVotes < data.votes){
            arrayOfBestMoviesByVotes = [];
            arrayOfBestMoviesByVotes.push(data.url);
            maxVotes = data.votes;
        }
        if (maxVotes === data.votes){
            arrayOfBestMoviesByVotes.push(data.url);
        }
    }

    arrayOfBestMoviesByVotes = [...new Set(arrayOfBestMoviesByVotes)];

    return arrayOfBestMoviesByVotes;
}


async function createTheBestMovieInHtml(theBestMovieUrl, id){
    await createCarouselItemFromUrl(theBestMovieUrl, id);

    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0];
    let paragraph = document.createElement("p");
    let button = document.createElement("button");
    let data = await fetchDataFromUrl(theBestMovieUrl);

    bestMovieTitle.textContent = data.title;
    paragraph.textContent = data.description;
    button.className = "play-button";

    document.getElementById(id).appendChild(button);
    document.getElementById(id).appendChild(paragraph);
}
