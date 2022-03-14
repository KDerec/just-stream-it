import {fetchDataFromUrl} from './dataFetcher.js'


const genreList = []


export async function manageCategory(url) {
    await getAllGenreNameOfThePage(url)
    await getNextPageOfGenreList(url)
    appendAllGenreInCategorieList()
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