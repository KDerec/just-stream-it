import {fetchDataFromUrl} from './dataFetcher.js';
import {createModalBox} from './modal.js';

export async function createCarouselItemFromUrl(url, carouselId) {
    let data = await fetchDataFromUrl(url);
    let node = document.createElement("li");
    let content = createModalBox(data);

    node.innerHTML = content;

    for (let pas = 0; pas < data.genres.length; pas++){
        let genre = document.createElement("li");
        genre.textContent = data.genres[pas];
        node.getElementsByClassName("genres-list")[0].appendChild(genre);
    }

    for (let pas = 0; pas < data.directors.length; pas++){
        let director = document.createElement("li");
        director.textContent = data.directors[pas];
        node.getElementsByClassName("directors-list")[0].appendChild(director);
    }

    for (let pas = 0; pas < data.actors.length; pas++){
        let actor = document.createElement("li");
        actor.textContent = data.actors[pas];
        node.getElementsByClassName("actors-list")[0].appendChild(actor);
    }

    for (let pas = 0; pas < data.countries.length; pas++){
        let country = document.createElement("li");
        country.textContent = data.countries[pas];
        node.getElementsByClassName("countries-list")[0].appendChild(country);
    }

    document.getElementById(carouselId).appendChild(node);
}
