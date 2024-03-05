// Selecting elements using jQuery and storing them in variables
const $gifArea = $("#gif-area");    // The container where GIFs will be displayed
const $searchInput = $("#search");  // Input field for the search term

// Function to add a random GIF to the GIF area
function addGif(res) {
  let numResults = res.data.length;

  // Checking if there are any results
  if (numResults) {
    // Generating a random index to pick a random GIF from the results
    let randomIdx = Math.floor(Math.random() * numResults);

    // Creating a new column and image elements using jQuery
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });

    // Appending the new image to the new column, and then appending the column to the GIF area
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

// Event listener for the form submission
$("form").on("submit", async function(evt) {
  evt.preventDefault();

  // Extracting the search term from the input field and clearing the input field
  let searchTerm = $searchInput.val();
  $searchInput.val("");

  // Making an asynchronous request to the Giphy API using Axios
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });

  // Calling the addGif function with the API response data
  addGif(response.data);
});

// Event listener for the "Remove" button click, clearing the GIF area
$("#remove").on("click", function() {
  $gifArea.empty();  // Removing all child elements from the GIF area
});
