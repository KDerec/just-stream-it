export function createImgAndModalBox(data) {
    let boxOfficeResult = data.worldwide_gross_income;
    if(boxOfficeResult === null){
        boxOfficeResult = "Le résultat est inconnu.";
    } else {
        boxOfficeResult = new Intl.NumberFormat('en-US', 
        { style: 'currency', currency: 'USD' }).format(boxOfficeResult);
    }
    let content = `
        <img src="${data.image_url}" class="carousel-item", href="${'#x' + data.id}">
        <div id=${'x' + data.id} class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>${data.title}</h2>
                </div>
                <div class="modal-body">
                    <img src="${data.image_url}">
                    <h4>Genre(s) :</h4>
                    <ul class="genres-list"></ul>
                    <h4>Date de sortie :</h4>
                    <p> ${data.date_published}</p>
                    <h4>Évaluation :</h4>
                    <p>${data.rated}</p>
                    <h4>Score Imdb :</h4>
                    <p>${data.imdb_score}</p>
                    <h4>Réalisateur(s) :</h4>
                    <ul class="directors-list"></ul>
                    <h4>Acteurs :</h4>
                    <ul class="actors-list"></ul>
                    <h4>Durée :</h4>
                    <p>${data.duration} min</p>
                    <h4>Pays :</h4>
                    <ul class="countries-list"></ul>
                    <h4>Résultat au Box Office :</h4>
                    <p>${boxOfficeResult}</p>
                    <h4>Résumé du film :</h4>
                    <p>${data.long_description}</p>
                </div>
            </div>
        </div>
        `;
    
    return content;
}

export async function manageModalBox() {
    var allCarouselItem = document.querySelectorAll(".carousel-item");
    var modals = document.querySelectorAll('.modal');
    var closeButton = document.getElementsByClassName("close");

    for (let pas = 0; pas < allCarouselItem.length; pas++) {
        allCarouselItem[pas].onclick = function(pointerEvent) {
            let modal = document.querySelector(pointerEvent.target.getAttribute("href"));
            modal.style.display = "block";
        };
    }
    for (let pas = 0; pas < closeButton.length; pas++) {
        closeButton[pas].onclick = function() {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined'){
                    modals[index].style.display = "none";
                }
            }   
        };
    }
    window.onclick = function(pointerEvent) {
        if (pointerEvent.target.classList.contains('modal')) {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined'){
                    modals[index].style.display = "none";
                }
            }
        }
    };
}