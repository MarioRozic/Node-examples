

var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('input[type=button]');
var msg = document.querySelector('.response');


textField.addEventListener('keyup', function(e) {
    if((e.keyCode || e.charCode) === 13) send();
},false);

button.addEventListener('click', send, false);


function send() {
    var number = numberField.value.replace(/\D/g,'');
    var text = textField.value;

    fetch('/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(function(res) { console.log(res) })
    .catch(function(err) { console.log(err) });
}
