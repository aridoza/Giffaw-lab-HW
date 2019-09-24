document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = document.querySelectorAll('input')[1].value;

    // submit button
    const submitBtn = document.querySelector('#submit-btn');

    // user input field
    const mainInput = document.querySelector('#main-search');

    // use to load more gifs sequentially
    let startingOffset = 0;


    // create a 'load more' button and append after images
    const addLoadMoreBtn = () => {
        let loadMoreBtn = document.createElement('button');
        loadMoreBtn.innerText = 'Load More';
        loadMoreBtn.className = 'btn btn-primary';
        loadMoreBtn.style.width = '40vw';
        loadMoreBtn.style.margin = '10px 10px';

        // load 10 more gifs
        loadMoreBtn.addEventListener('click', (e) => {
            // send another get request, but first 
            // increment the startingOffset value by 10
            // and pass it into the url
            e.preventDefault();

            // remove the previous 'load more' button
            loadMoreBtn.style.display = 'none';

            getGifs(mainInput.value);
        })

        document.querySelector('.gif-gallery').appendChild(loadMoreBtn);
    };

    // show the gifs to the user
    const showGifs = (gifs) => {
        const gifsDiv = document.querySelector('.gif-gallery');
        
        // use .map to add images to DOM
        gifs.map(gif => {

            let imageDiv = document.createElement('img');
            imageDiv.className = "img-thumbnail";
            imageDiv.src = `https://media.giphy.com/media/${gif.id}/giphy.gif`
            gifsDiv.appendChild(imageDiv);
            
        });
        
        addLoadMoreBtn();

        // gif url format: 'https://media.giphy.com/media/${data.data[i].id}/giphy.gif'
    };

    const getGifs = async (term) => {
        // use offset to change starting point of search so the 
        // 'load more' button gets the next set of gifs

        let response = await  fetch(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${API_KEY}&limit=10&offset=${startingOffset}`, {
            method: "GET"
        });
        let data = await response.json();

        // increment the starting offset for the next call
        startingOffset+=10;

        return showGifs(data.data);
    };

    submitBtn.addEventListener('click', (e) => {
        // prevent the form from submitting
        e.preventDefault();

        // call the function to send a request to the API
        // using the search term the user entered
        getGifs(mainInput.value);
    });
})
