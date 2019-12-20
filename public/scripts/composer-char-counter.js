$(document).ready(function() {
  // --- our code goes here ---
  // console.log("Testing to see if loadedS");
  $(".tweet-text").keyup(function() {
    const maxCharacter = 140;
    const limit = $(this).val().length;
    let result = maxCharacter - limit;
    const $count = $(".counter");
    $count.text(result);
    if (result <0) {
      $count.addClass("red");
    } else {
      $count.removeClass("red");
    }
  });
});