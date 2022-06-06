const host = "127.0.0.1:8000/filmKafe"

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function postData(apiurl,postdata){
    const csrftoken = getCookie('csrftoken');
    let result = await $.ajax({
        method: "POST",
        headers: {'X-CSRFToken': csrftoken},
        url: apiurl,
        data: postdata
      })
    return result
}

function onLoadSpinner(){
    let spinnerWrapper = document.querySelector('.spinner-wrapper');

    window.addEventListener('load', function () {
        
        spinnerWrapper.style.display = 'none';
    });
}
function setSpinner(){
    let spinnerWrapper = document.querySelector('.spinner-wrapper');
    spinnerWrapper.style.display = 'flex';
}
function resetSpinner(){
    let spinnerWrapper = document.querySelector('.spinner-wrapper');
    spinnerWrapper.style.display = 'none';
}
function validateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {

    //alert("Valid email address!");

    return true;

  } else {

    //alert("Invalid email address!");

    return false;

  }

}
function validatePhone(phone){
    if(phone.match(/[^a-zA-Z]/g) && phone.length>8){
        return true
    }return false
}
function passwordValidation(password)
        {
            // checking for a specific password pattern
			if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g)
                 && password.length >= 9)
            {
                return true;
            }
			else
            {
                return false;
            }

		}