import {fetchDataFromUrl} from './dataFetcher.js'
import {createModalBox} from './modal.js'

export async function createCarouselItemFromUrl(url, carouselId) {
    let data = await fetchDataFromUrl(url)
    let node = document.createElement("li")
    let content = createModalBox(data)
    node.innerHTML = content
    document.getElementById(carouselId).appendChild(node)
}
