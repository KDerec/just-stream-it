import {fetchDataFromUrl} from './dataFetcher.js';


const genreArray = [];


export async function manageGenre(url){
    let data = await fetchDataFromUrl(url);

    pushAllGenreNameOfPageInArray(data);

    if (nextUrlPageExist(data)){
        await manageGenre(data.next);
    } else {
        createGenreListElementInHtml();
    }
}


function pushAllGenreNameOfPageInArray(data){
    for (let pas = 0; pas < data.results.length; pas++){
        genreArray.push(data.results[pas].name);
    }
}

function nextUrlPageExist(data){
    if (data.next){
        return true;
    }
}


function createGenreListElementInHtml(){
    for (let pas = 0; pas < genreArray.length; pas++){
        let node = document.createElement("li");
        let textNode = document.createTextNode(genreArray[pas]);
        node.appendChild(textNode);
        document.getElementById("header-genres-list").appendChild(node);
    }
}