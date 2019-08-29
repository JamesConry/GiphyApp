var array = ["test","testing","a","b","c","d"];

for(var i = 0; i<array.length;i++){
    var button = $("<button>");
    button.attr("data-thing", array[i]);
    button.text(array[i]);
    $("#buttons-here").append(button);
}


$("button").on("click", function() {
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
        console.log(response);

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

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

          $("#gifs-here").prepend(gifDiv);
        }

        $(".pic").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);
            if(state === "data-still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", 'animate');
              }
              if(state === "animate"){
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", 'data-still');
              }
          });


      });
  });

  $("#submit").on("click", function() {
      var input = $("#input-text").val();
      $("#input-text").val("");
      
  });

