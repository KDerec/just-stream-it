const bestImdbScoreFilterUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const genreListUrl = "http://localhost:8000/api/v1/genres/"
const genreList = []


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


async function getNextPageOfGenreList(url){
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.next){
        await getAllGenreOfThePage(data.next)
        await getNextPageOfGenreList(data.next)
    }
}


async function getAllGenreOfThePage(url){
    const response = await fetch(url)
    const data = await response.json()
    for (pas = 0; pas < data.results.length; pas++){
        genreList.push(data.results[pas].name)
    }
}


function createGenreList(){
    for (pas = 0; pas < genreList.length; pas++){
        let node = document.createElement("li")
        let textNode = document.createTextNode(genreList[pas])
        node.appendChild(textNode)
        document.getElementById("genre-list").appendChild(node)
    }
}

async function main(){
    await manageBestMovie()
    await getAllGenreOfThePage(genreListUrl)
    await getNextPageOfGenreList(genreListUrl)
    createGenreList()
}

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
  document.getElementById('carousel-items').scrollLeft += 400;
};
buttonLeft.onclick = function () {
  document.getElementById('carousel-items').scrollLeft -= 400;
};

main()
