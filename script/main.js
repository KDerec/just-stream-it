const bestImdbScoreFilterUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const genreListUrl = "http://localhost:8000/api/v1/genres/"
const genreList = []
const urlListOfTopSevenBestMovies = []


async function fetchDataFromUrl(url) {
    let response = await fetch(url)
    let data = await response.json()

    return data
}


async function getBestMovieUrl() {
    let listOfBestMovies = await getListOfBestMovies()
    if (listOfBestMovies.length === 1){
        let bestMovieUrl = listOfBestMovies[0].url
    }
    else {
        let bestMovieUrl = getTheBestMovieByVotes(listOfBestMovies)
    }

    return bestMovieUrl
}


async function getListOfBestMovies(){
    data = await fetchDataFromUrl(bestImdbScoreFilterUrl)
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
            bestMovieUrl = listOfBestMovies[pas].url
        }
    }
    return bestMovieUrl
}


async function displayBestMovieInformation(bestMovieUrl){
    let bestMovieTitle = document.getElementById("the-best-movie").getElementsByTagName("h1")[0]
    let bestMovieResume = document.getElementById("the-best-movie").getElementsByTagName("p")[0]
    let bestMovieImg = document.getElementById("best-movie-img")

    data = await fetchDataFromUrl(bestMovieUrl)

    bestMovieTitle.innerHTML = data.title
    bestMovieResume.innerHTML = data.description
    bestMovieImg.src = data.image_url  
}


async function manageTopSevenBestMovies() {
    data = await fetchDataFromUrl(bestImdbScoreFilterUrl)

    let urlListOfTopSevenBestMovies = await getUrlListOfTopSevenBestMovies(data)
    for (pas = 0; pas < 7; pas++){
        data = await fetchDataFromUrl(urlListOfTopSevenBestMovies[pas])

        await displayTopSevenBestMovies(data.image_url)

}


async function displayTopSevenBestMovies(image_url) {
    let node = document.createElement("li")
    let imageNode = document.createElement("img")
    imageNode.src = image_url
    imageNode.className = "carousel-item"
    node.appendChild(imageNode)
    document.getElementById("carousel-items").appendChild(node)
    }
}


async function getUrlListOfTopSevenBestMovies(data) {
    for (let pas = 0; pas < data.results.length; pas++){
        urlListOfTopSevenBestMovies.push(data.results[pas].url)
    }
    if (urlListOfTopSevenBestMovies.length < 7){
        next_page_data = await fetchDataFromUrl(data.next)
        getUrlListOfTopSevenBestMovies(next_page_data)
    }
    return urlListOfTopSevenBestMovies
}


async function getNextPageOfGenreList(url) {
    data = await fetchDataFromUrl(url)
    
    if (data.next){
        await getAllGenreNameOfThePage(data.next)
        await getNextPageOfGenreList(data.next)
    }
}


async function getAllGenreNameOfThePage(url){
    data = await fetchDataFromUrl(url)

    for (pas = 0; pas < data.results.length; pas++){
        genreList.push(data.results[pas].name)
    }
}


function appendAllGenreInCategorieList(){
    for (pas = 0; pas < genreList.length; pas++){
        let node = document.createElement("li")
        let textNode = document.createTextNode(genreList[pas])
        node.appendChild(textNode)
        document.getElementById("genre-list").appendChild(node)
    }
}

async function main(){
    bestMovieUrl = await getBestMovieUrl()
    displayBestMovieInformation(bestMovieUrl)
    await getAllGenreNameOfThePage(genreListUrl)
    await getNextPageOfGenreList(genreListUrl)
    appendAllGenreInCategorieList()
    await manageTopSevenBestMovies()
}

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
  document.getElementById('carousel-items').scrollLeft += 200;
};
buttonLeft.onclick = function () {
  document.getElementById('carousel-items').scrollLeft -= 200;
};


main()
