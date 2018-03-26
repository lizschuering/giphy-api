# giphy-api
Working with the Giphy API

## What Does the App Do?

This is a single page application that pull GIFs from the Giphy API via its search URL. I chose one of my favorite shows, *Adventure Time*, as the theme for the search topics. 

When the page loads, the user is presented with a set of existing topics. The user can generate GIFs by clicking on an existing button or they can add their own topic by typing a new one in the text box and adding it to the existing topics. Once the GIFs have been generated on the page, the user can play or pause each GIF by clicking on the image.

## How Did You Make the App?

The app was made with HTML, CSS (including Flexbox for the layout and Google Fonts to style the text), and the jQuery library for Javascript to dynamically generate the buttons and GIF content based on click events on the page.

## What Challenges Did you Encounter?

The play/pause functionality only works on the 10 most recently generated GIFs work and needs troubleshooting. I'm having trouble understanding why as the play/pause functionality is linked to a class on each individual gif (including ones that were not recently generated).

## What's Next?

Troubleshoot the play/pause functionality for the GIFs beyond the 10 most recently generated ones. I'd also like to add functionality for the rating to read 'none' when the rating that is returned from the Giphy API is blank. I may add a bit more styling to the page (though I like the simplicity of the current layout).