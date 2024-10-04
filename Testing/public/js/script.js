
$(document).ready(function () {
    
$('#clickMeButton').click(() => {

var formId = 'dynamicForm' ;
  
var newCard = `
 <div class="col s12 m6">
 <div class="card">
 <div class="card-content">
 <span class="card-title">Submit Your Information</span>
 <form id="${formId}">
 <div class="input-field">
 <input id="name-${formId}" type="text" class="validate" required>
 <label for="name-${formId}">Name</label>
 </div>
 <div class="input-field">
 <input id="email-${formId}" type="email" class="validate" required>
 <label for="email-${formId}">Email</label>
 </div>
 <button class="btn waves-effect waves-light" type="submit" name="action">Submit
 <i class="material-icons right">send</i>
 </button>
 </form>
 <div id="-${formId}" class="thank-you-message" style="display: none;">
 </div>
 </div>
 </div>
 </div>`;
  
$('#card-container').append(newCard);
  
$(`#${formId}`).on('submit', function(event) {
    event.preventDefault();
        
    $.ajax({
    type: 'POST',
    data: {
    name: $(`#name-${formId}`).val(),
    email: $(`#email-${formId}`).val()
    },
          
});
});
});
});