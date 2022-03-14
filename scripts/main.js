const bestImdbScoreFilterUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const genreListUrl = "http://localhost:8000/api/v1/genres/"
const genreList = []
const urlListOfTopSevenBestMovies = []


async function fetchDataFromUrl(url) {
    let response = await fetch(url)
    let data = await response.json()

    return data
}


async function getTheBestMovieUrl() {
    let listOfBestMovies = await getListOfBestMovies()
    if (listOfBestMovies.length === 1){
        let theBestMovieUrl = listOfBestMovies[0].url

        return theBestMovieUrl
    }
    else {
        let theBestMovieUrl = getTheBestMovieByVotes(listOfBestMovies)

        return theBestMovieUrl
    }
}


async function getListOfBestMovies(){
    let data = await fetchDataFromUrl(bestImdbScoreFilterUrl)
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


async function manageTopSevenBestMovies() {
    let data = await fetchDataFromUrl(bestImdbScoreFilterUrl)

    let urlListOfTopSevenBestMovies = await getUrlListOfTopSevenBestMovies(data)
    for (let pas = 0; pas < 7; pas++){
        let data = await fetchDataFromUrl(urlListOfTopSevenBestMovies[pas])

        createCarouselItem(data)

}


function createCarouselItem(data) {
    let node = document.createElement("li")
    let imageNode = document.createElement("img")
    imageNode.src = data.image_url
    imageNode.className = "carousel-item"
    imageNode.addEventListener("click", function(){
        console.log(data.url)
    })
    node.appendChild(imageNode)
    document.getElementById("carousel-items-other-best-movies").appendChild(node)
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
    let theBestMovieUrl = await getTheBestMovieUrl()
    let BestMovieIndex = urlListOfTopSevenBestMovies.indexOf(theBestMovieUrl)
    if (BestMovieIndex !== -1){
        urlListOfTopSevenBestMovies.splice(BestMovieIndex, 1)
    }

    return urlListOfTopSevenBestMovies
}


async function getNextPageOfGenreList(url) {
    let data = await fetchDataFromUrl(url)
    
    if (data.next){
        await getAllGenreNameOfThePage(data.next)
        await getNextPageOfGenreList(data.next)
    }
}


async function getAllGenreNameOfThePage(url){
    let data = await fetchDataFromUrl(url)

    for (let pas = 0; pas < data.results.length; pas++){
        genreList.push(data.results[pas].name)
    }
}


function appendAllGenreInCategorieList(){
    for (let pas = 0; pas < genreList.length; pas++){
        let node = document.createElement("li")
        let textNode = document.createTextNode(genreList[pas])
        node.appendChild(textNode)
        document.getElementById("header-genres-list").appendChild(node)
    }
}

async function main(){
    let theBestMovieUrl = await getTheBestMovieUrl()
    displayBestMovieInformation(theBestMovieUrl)
    await getAllGenreNameOfThePage(genreListUrl)
    await getNextPageOfGenreList(genreListUrl)
    appendAllGenreInCategorieList()
    await manageTopSevenBestMovies()
}


main()
