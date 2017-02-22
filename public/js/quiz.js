var dynamicQuiz = [{
  "Question": "What is Tims Name?",
  "Choices": ["Tim", "Tony", "Travis"],
  "correctAnswer": "Tim"
}, {
  "Question": "Where is Tim From?",
  "Choices": ["Austin", "Manassas", "DC"],
  "correctAnswer": "Manassas"
}, {
  "Question": "What is Moo Moo's name?",
  "Choices": ["Moo", "Moo Moo", "Katharine"],
  "correctAnswer": "Moo Moo"
}];

// var userScore = [];
// var count = 0;

// window.onload = function() {
//   nextQuestion();
//   document.querySelector('#start').addEventListener('click',nextQuestion);
//   }
  
// function nextQuestion(data) {
//   var question = quiz[count].Question;
//   var questionClass = document.querySelector('.question');
//   var txtNode = document.createTextNode(question);
//   questionClass.appendChild(txtNode);
  
//   quiz[count].Choices.map(function(val) {
//     var input = document.createElement('input');
//     input.setAttribute('type', 'radio');
//     input.setAttribute('name', 'choice');
//     input.setAttribute('id', 'radio');
//     input.setAttribute('value', `${val}`);
//     input.value = val.Choices;
//   });
// }

var userScore = [];
var count = 0;

$(document).ready(function() {
  
  $('#choice1').on('keyup', function() {
    var a = $(this).val();
    $('#inlineRadio1').val(a);
});

 $('#choice2').on('keyup', function() {
    var a = $(this).val();
    $('#inlineRadio2').val(a);
});

 $('#choice3').on('keyup', function() {
    var a = $(this).val();
    $('#inlineRadio3').val(a);
});

  getData();

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
    if (count < 3) {
      nextQuestion(dynamicQuiz);
    }
    else {
      displayScore(dynamicQuiz);
    }
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
function nextQuestion(data) {
    const question = data[count].Question;

  // variable to pass into fade below
    var a = data[count].Choices.map(function(val) {
       return `<input type="radio" name="choice" id="radio" value="${val}"><label for="radio">${val}</label><br>`;
  });

 // fade out old form inputs fade in new
    $('.choices').fadeOut(500,function() {
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
function displayScore(dynamicQuiz) {
  $('.question').text('Your quiz results are below');
  $('#next').addClass('hidden');
  $('#prev').addClass('hidden');
  $('#submit').removeClass('hidden');
  $('.choices').html('');

  for (i=0; i < userScore.length; i++) {
     const correct =  dynamicQuiz[i].correctAnswer;
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
$('#submit').on('click',function() {
  // send GET request to scores route // 
  var url = "https://tim-projects-pittman021.c9users.io/scores/new?score=" + userScore;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.readyState == 200) {
    }
  }
  request.open('POST', url);
  request.send();
  // reset stuff and update button visibility // 
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


