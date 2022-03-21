export async function managePlayButton() {
    let playButton = document.getElementsByClassName("play-button")[0];
    let playButtonClasses = playButton.classList;
    playButton.onclick = function () {
        playButtonClasses.toggle("paused");
    };
}


export async function manageCarouselButtons(){
    let buttonLeftOthersBestMovies = document.getElementById('slideLeftOthersBestMovies');
    let buttonRightOthersBestMovies = document.getElementById('slideRightOthersBestMovies');
    let buttonLeftCategoryOne = document.getElementById('slideLeftCategoryOne');
    let buttonRightCategoryOne = document.getElementById('slideRightCategoryOne');
    let buttonLeftCategoryTwo = document.getElementById('slideLeftCategoryTwo');
    let buttonRightCategoryTwo = document.getElementById('slideRightCategoryTwo');
    let buttonLeftCategoryThree = document.getElementById('slideLeftCategoryThree');
    let buttonRightCategoryThree = document.getElementById('slideRightCategoryThree');

    buttonRightOthersBestMovies.onclick = function () {
        document.getElementById('carousel-items-other-best-movies').scrollLeft += 200;
    };
    
    
    buttonLeftOthersBestMovies.onclick = function () {
        document.getElementById('carousel-items-other-best-movies').scrollLeft -= 200;
    };
    
    
    buttonRightCategoryOne.onclick = function () {
        document.getElementById('carousel-items-category-one').scrollLeft += 200;
    };
    
    
    buttonLeftCategoryOne.onclick = function () {
        document.getElementById('carousel-items-category-one').scrollLeft -= 200;
    };
    
    
    buttonRightCategoryTwo.onclick = function () {
        document.getElementById('carousel-items-category-two').scrollLeft += 200;
    };
    
    
    buttonLeftCategoryTwo.onclick = function () {
        document.getElementById('carousel-items-category-two').scrollLeft -= 200;
    };
    
    
    buttonRightCategoryThree.onclick = function () {
        document.getElementById('carousel-items-category-three').scrollLeft += 200;
    };
    
    
    buttonLeftCategoryThree.onclick = function () {
        document.getElementById('carousel-items-category-three').scrollLeft -= 200;
    };
}
