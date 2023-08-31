const form = document.getElementById('form');
// form.addEventListener('submit', function (event) {
//     event.preventDefault();

// )}


form.addEventListener('submit',function(event){
    event.preventDefault();
    history.back();
})