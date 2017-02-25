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
});