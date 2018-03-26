// Variable that holds the initial list of topics that will be displayed in the buttons when the page is initially loaded
var wordsToGIF = ["Adventure Time", "Finn and Jake", "BMO", "Princess Bubblegum", "Marceline", "Ice King", "Lumpy Space Princess", "Tree Trunks", "Lady Rainicorn", "The Lich", "Flame Princess", "Lemongrab", "Peppermint Butler", "Prismo"];
console.log(wordsToGIF);

// Function that generates buttons from the list of topics held in the variable WordsToGIF
function createButtons() {

    $("#gifButtons").empty();

        for (var i = 0; i < wordsToGIF.length; i++) {

            var createButton = $("<button>");

            createButton.addClass("buttonTopic");

            createButton.attr("type", "button");
  
            createButton.attr("data-topics", wordsToGIF[i]);
 
            createButton.text(wordsToGIF[i]);
  
            $("#gifButtons").append(createButton);
        }
}

// Create an event listener for when the user adds a new topic. This topic will be added the array stored in the variable wordsToGIF and a generate a new button for it with the text of the user's input.
$("#addWord").on("click", function(event) {
        
    event.preventDefault();

    var userInfo = $("#userInfo").val().trim();
        
    wordsToGIF.push(userInfo);
    console.log(wordsToGIF);

    // Calling the createButtons function to re-generate all the buttons when a new topic and button has been added to the variable wordsToGIF.
    createButtons();
});

// Function that generates the GIFs when the topic button has been pressed
function displayGIFS (){
    
    // Variable that takes in the value of the data-topics attribute for the topic button that has been pressed
    var topics = $(this).attr("data-topics");
    console.log(topics);
    
    // This is the URL to the Giphy Search API. It inserts the value of the topics variable into the URL's search parameter to find GIFs based on that word.
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OoC5VcAkL1T29kv7CQ4vlqyQ2Mbtaih0&q=" + topics + "&limit=10&offset=0&lang=en";
    
    // Using the AJAX method, we request information back from the API URL stored in the queryURL variable.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //console.log(response);

        // Storing the resulting information from our AJAX method (which comes back in the JSON format) in a variable called results.
        var results = response.data;
            // ========================

        // Looping over our results...
        for (var i = 0; i < results.length; i++) {

            // Create a DIV to hold each GIF we are generating
            var gifsDisplayDiv = $("<div>").addClass("gifDIV");
            //console.log(gifsDisplayDiv);
            
            // Creating an image element to display each GIF generated and assigning it a class and several attributes that will help us create the start/stop effect on the GIF. The initial source of the image is a still image of the GIF, but we are also storing the moving GIFs as an attribute so that we use it later.
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url).addClass("generatedGIF").attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still");

            // Store the rating information from the results in a variable called rating
            var rating = results[i].rating;
            
            // Display the ratings information in a p element.
            var p = $("<p>").text("GIF Rating: " + rating).addClass("gifText");
            //console.log(p);
            
            // Adding the ratings text and the GIF image to individual DIVs
            gifsDisplayDiv.append(gifImage, p);
           
            // Adding all of the generated GIFs to an existing DIV called 'gifs-appear-here'
            $("#gifs-appear-here").prepend(gifsDisplayDiv);
            
        }

        // Creating an event listener to create the start/stop effect on the GIF.
        $(".generatedGIF").on("click", function() {
            console.log("You're clicking on a gif"); 
        
            var state = $(this).attr("data-state");
            console.log(state);

            //When a user clicks on a GIF that has the class of 'generatedGIF', it will also check to see what the state of image currently is. If it is still, clicking on the GIF will change it to the animated state (and vice versa).
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    });

};

//Clicking a generated button anywhere on the page with the class 'buttonTopic' will trigger the displayGIFS function
$(document).on("click", ".buttonTopic", displayGIFS);

//Calling the createButtons function so that buttons can be generated on the page
createButtons();