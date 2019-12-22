function searchMovies(keyword){
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200) {
			let movies = JSON.parse(xhr.response);

			showMovies(movies.Search);
		}
	}

	xhr.open('GET', 'http://www.omdbapi.com/?apikey=dca61bcc&i=' + keyword);
	xhr.send();
}

function showMovies(movies){
	let cards = '';
	movies.forEach(function(movie){
		cards += `<div class="col-4 my-3">
	  				<div class="card" style="width: 18rem;">
					  <img src="${movie.Poster}" class="card-img-top" >
					  <div class="card-body">
					    <h5 class="card-title">${movie.Title} </h5>
					    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
					    <a href="detail.php?id=${movie.imdbID}" class="btn btn-primary">Show Detail</a>
					  </div>
					</div>
  			    </div>`;
	});
	// console.log(cards);
	movieList.innerHTML = cards;
}
let movieList = document.querySelector('.movie-list');
let inputKeyword = document.querySelector('.input-keyword');
let searchButton = document.querySelector('.search-button');
searchMovies('Dilan 1990');

searchButton.addEventListener('click', function(){
	searchMovies(inputKeyword.value);
	inputKeyword.value= '';
});