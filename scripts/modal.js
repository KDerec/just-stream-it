export function createModalBox(data) {
    content = `
        <img src="${data.image_url}" class="carousel-item", href="${'#x' + data.id}">
        <div id=${'x' + data.id} class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">×</span>
                    <h2>${data.title}</h2>
                </div>
                <div class="modal-body">
                    <p>${data.description}</p>
                </div>
            </div>
        </div>
        `
    
    return content
}

export async function manageModalBox() {
    var btn = document.querySelectorAll(".carousel-item");
    var modals = document.querySelectorAll('.modal');
    var spans = document.getElementsByClassName("close");
    for (var i = 0; i < btn.length; i++) {
        btn[i].onclick = function(e) {
            e.preventDefault();

            let modal = document.querySelector(e.target.getAttribute("href"));
            modal.style.display = "block";
        }
    }
    for (var i = 0; i < spans.length; i++) {
        spans[i].onclick = function() {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
            }
        }
    }
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
            }
        }
    }
}