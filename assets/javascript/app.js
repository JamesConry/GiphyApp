var array = ["Dog","Cat","Parrot","Rabbit","Gerbil","Fish"];

function createButtons() {

    $("#buttons-here").empty();
    for(var i = 0; i<array.length;i++){
        var button = $("<button>");
        button.attr("data-thing", array[i]);
        button.addClass("gif-button");
        button.text(array[i]);
        $("#buttons-here").append(button);
    }
}
createButtons();


function getGifs() {
    $("#gifs-here").html("");
    var thing = $(this).attr("data-thing");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      thing + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          gifDiv.addClass("inline-block");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var image = $("<img>");
          image.attr("data-animate", results[i].images.fixed_height.url);
          image.attr("data-still", results[i].images.fixed_height_still.url);
          image.attr("data-state", "data-still");
          image.attr("src", results[i].images.fixed_height_still.url);
          image.attr("class", "pic");

          gifDiv.prepend(image);
          gifDiv.prepend(p);

          $("#gifs-here").append(gifDiv);
        }

        


      });
  }

  
$(document).on("click",".pic", function() {
    var state = $(this).attr("data-state");
    
    if(state === "data-still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", 'animate');
        }
    if(state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", 'data-still');
        }
});

$(document).on("click", "#add", function() {
    event.preventDefault();
    var input = $("#input-text").val().trim();
    $("#input-text").val("");
    array.push(input);
    createButtons();
});

$(document).on("click", ".gif-button", getGifs);