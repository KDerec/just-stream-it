let bestMovieImg = document.getElementById("best-movie-img")

function foundBestMovieByImbdScore() {
    
}

fetch("http://localhost:8000/api/v1/titles/")
    .then(response => response.json())
    .then(data => console.log(data))


fetch("http://localhost:8000/api/v1/titles/9")
    .then(response => {
        if (response.ok){
            response.json().then(data => {
                bestMovieImg.src = data.image_url
            })
        } else {
            console.log("ERROR")
        }
    })