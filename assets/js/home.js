const todoList = document.querySelector('ul');
var ul = document.getElementById("list");
var listItems = ul.getElementsByTagName("li");
var completedTone=new Audio();   ///audio object
completedTone.src="/sound/completed.mp3";   //audio source added

// adding completed beep on marking task as completed
function completedBeep()
{
console.log(completedTone);
completedTone.play();
// completedTone.onplay=function(){
//   console.log('tone is playing');                  // these commented commands check whether the audio is working or not
// }
}


// function to show TOOLTIP text over icons
$( function() {
  $( document ).tooltip();
} );

// // Keydown eventistener for form submit at Enter keypress
// document.addEventListener("keydown", function (event) {
//     var keyValue = event.key;
//     if(keyValue=="Enter")
//         this.forms.submit();
// });


// Filters the list and show all completed tasks
function show_complete()
{
  $('#checked').click(function() {
    $('.default').hide();
    $('.check').show();
  });
}
// Filters the list and show all tasks
function show_all()
{
  $('#all').click(function() {
    $('.default').show();
    $('.check').show();
  });
}

// Filters the list and show all incompleted tasks
function show_incomplete()
{
  $('#unchecked').click(function() {
    $('.default').show();
    $('.check').hide();
  });
}
