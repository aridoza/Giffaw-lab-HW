document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = document.querySelectorAll('input')[1].value;

    // submit button
    const submitBtn = document.querySelector('#submit-btn');

    // user input field
    const mainInput = document.querySelector('#main-search');

    // use to load more gifs sequentially
    let startingOffset = 0;

    // container div for gif search results
    const gifsContainerDiv = document.querySelector('#gif-gallery');

    
    let clearGifsBtn = document.createElement('button');
    // create a 'clear gifs' button to clear gifs for a new search
    const addClearGifsBtn = () => {
        clearGifsBtn.style.display = 'inline-block';
        clearGifsBtn.innerText = 'Clear Gifs';
        clearGifsBtn.className = 'btn btn-primary';
        clearGifsBtn.id = 'clear-button';
        clearGifsBtn.style.width = '34vw';
        clearGifsBtn.style.margin = '10px 10px';

        gifsContainerDiv.appendChild(clearGifsBtn);

        clearGifsBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // remove all html content inside the gifs containing div
            gifsContainerDiv.innerHTML = '';
        })

        


    };


    // create a 'load more' button and append after images
    const addLoadMoreBtn = () => {
        let loadMoreBtn = document.createElement('button');
        loadMoreBtn.innerText = 'Load More';
        loadMoreBtn.className = 'btn btn-primary';
        loadMoreBtn.style.width = '34vw';
        loadMoreBtn.style.margin = '10px 10px';

        // load 10 more gifs
        loadMoreBtn.addEventListener('click', (e) => {
            // send another get request, but first 
            // increment the startingOffset value by 10
            // and pass it into the url
            e.preventDefault();

            // remove the previous 'load more' button and 'clear gifs' button
            loadMoreBtn.style.display = 'none';
            clearGifsBtn.style.display = 'none';

            getGifs(mainInput.value);
        })

        gifsContainerDiv.appendChild(loadMoreBtn);
    };

    // show the gifs to the user
    const showGifs = (gifs) => {
        const gifsDiv = document.querySelector('#gif-gallery');
        
        // use .map to add images to DOM
        gifs.map(gif => {
            let imageDiv = document.createElement('div');
            imageDiv.className = 'col-sm-6 col-md-4 col-lg-3';

            imageDiv.innerHTML = `<img height="250px" width="250px" src="https://media.giphy.com/media/${gif.id}/giphy.gif" >`;

            // let imageTag = document.createElement('img');
            // //imageTag.className = "img-thumbnail";
            // imageTag.src = `https://media.giphy.com/media/${gif.id}/giphy.gif`
            // imageDiv.appendChild(imageTag);
            gifsDiv.appendChild(imageDiv);
            
        });
        
        addLoadMoreBtn();
        addClearGifsBtn();

        // gif url format: 'https://media.giphy.com/media/${data.data[i].id}/giphy.gif'
    };

    const getGifs = async (term) => {
        // use offset to change starting point of search so the 
        // 'load more' button gets the next set of gifs

        let response = await  fetch(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${API_KEY}&limit=12&offset=${startingOffset}`, {
            method: "GET"
        });
        let data = await response.json();

        // increment the starting offset for the next call
        startingOffset+=12;

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
