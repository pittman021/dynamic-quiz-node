var userScore = [];
var count = 0;

$(document).ready(function() {

  getData();

  $('#Signup').on('click',getSignup);
  $('#submit-signup').on('click',saveUser);
  $('#btn-login').on('click', getLogin);
  $('#submit-login').on('click',loginUser);

 // Onclick handler for previous button //
  $('#prev').on('click', function() {

    storeChoice();
    count--;
    getData();

    if (count === 0) {
        $('#prev').addClass('hidden');
      }
  });

  // Onclick handler for next button //

  $('#next').on('click', function() {

    if ($('input:checked').val() === undefined) {
     $('.alert-warning').removeClass('hidden');
   }
    else {
    $('.alert-warning').addClass('hidden');

    storeChoice();
    if (count < 3) {
      count++;
      getData();
      // nextQuestion();
      if (count > 0) {
        $('#prev').removeClass('hidden');
      }
      }
    else {
      displayScore();
    }
    }
  });

});

// Gets answers JSON data and passes it into nextQuestion // Is that right?
function getData() {
  var url = "http://localhost/Dynamic%20Quiz/answers.json";
  var request = new XMLHttpRequest();
  request.onload = function () {
    if (request.status == 200 && count < 3) {
      nextQuestion(request.responseText);
    }
    else {
      displayScore(request.responseText);
    }
  };
  request.open('GET',url);
  request.send(null);
}


 // Stores choices each time next or previous question is sent
function storeChoice() { // must be redone for back button
  if ($('input:checked').val() === undefined) {
    return;
  }
  else {
  userScore[count] = ($('input:checked').val());
  }
}

// Grabs the next questions -- forward or backwards //
function nextQuestion(responseText) {
    const quiz = JSON.parse(responseText);
    const question = quiz[count].Question;

  // variable to pass into fade below
    var a = quiz[count].Choices.map(function(val) {
       return `<input type="radio" name="choice" id="radio" value="${val}"><label for="radio">${val}</label><br>`;
  });

 // fade out old form inputs fade in new
    $('.form-group').fadeOut(500,function() {
    $(this).html(a).fadeIn(200);
  })
  // fade out old form inputs fade in new
   $('.question').fadeOut(500,function() {
    $(this).text(question).fadeIn(200);
  })

 // retrieve previously checked item for navigation
$('input[value='+userScore[count]+']').prop('checked', true);
}

// Shows score when quiz is over
function displayScore(quiz) {
  $('.question').text('Your quiz results are below');
  $('#next').addClass('hidden');
  $('#prev').addClass('hidden');
  $('#start').removeClass('hidden');
  $('.form-group').html('');

  for (i=0; i < userScore.length; i++) {
     const correct =  quiz[i].correctAnswer;
     const choice = userScore[i];

    if (correct === choice) {
      $('.results').append(`<p value="Answer${i}">${choice}: Correct!</p>`);
    }
    else {
      $('.results').append(`<p value="Answer${i}">${choice}: False!</p>`);
    }
  }
}
// starts quiz over
$('#start').on('click',function() {
   userScore = [];
   count = 0;
   $(this).addClass('hidden');
   $('#next').removeClass('hidden');
   $('.results').html('');
   getData();
});

function getSignup() {
  $('.signup').removeClass('hidden');
  $('#btn-login').hide();
  $('#Signup').hide();
  $('#submit-signup').removeClass('hidden');
}

function saveUser() {
  const key = $('#signup-username').val();
  const value = $('#signup-password').val();
  const item = localStorage.getItem(key);
  console.log(item);

  if (key === '' || value === '') {
    $('.alert-warning').removeClass('hidden');
  }
  else if (item !=null) {
    $('.userAuth').append('<p class="alert-warning">Username already taken. Choose another.</p>');
  }
   else {
    localStorage.setItem(key,value);
    $('.userAuth').addClass('hidden');
    $('.quiz').removeClass('hidden');
    $('#welcome').html(`Welcome, ${username}`);
   }
    }

  function getLogin() {
    $('#btn-login').addClass('hidden');
    $('#Signup').hide();
    $('#submit-login').removeClass('hidden');
    $('.login').removeClass('hidden');

  }

  function loginUser() {
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    if (localStorage.getItem(username) === password) {
      $('.userAuth').hide();
      $('.quiz').removeClass('hidden');
      $('#welcome').html(`Welcome back, ${username}`);

    }
    else {
      $('.login').append('<p class="alert-warning">Password is incorrect</p>');
    }
  }
