import {fetchDataFromUrl} from './dataFetcher.js'


export async function createCarouselItemFromUrl(url) {
    let data = await fetchDataFromUrl(url)
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