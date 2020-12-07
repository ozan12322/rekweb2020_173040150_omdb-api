function searchMovies(){
	$('#movie-list').html('');

	$.ajax({
		url: 'http://www.omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'df9e82a2',
			's': $('#search-input').val()
		},
		success: function(result){
			if(result.Response == "True"){

				let movies = result.Search;

				$.each(movies, function(i, data){
					$('#movie-list').append(`
						<div class="col-md-4">
 	  						<div class="card mb-3">
 					  			<img src="`+ data.Poster +`" class="card-img-top" >
 					  		<div class="card-body">
 					    		<h5 class="card-title">`+ data.Title +`</h5>
 					    		<h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
 					    		<a href="#" class="btn btn-primary" id="see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Show Detail</a>
 					 		</div>
 							</div>
   			   			</div>
					`);
				});

				$('#search-input').val('');

			} else{
				$('#movie-list').html(`
					<div class="col">
					<h1 class="text-center">`+ result.Error +`</h1>
					</div>
				`)
			}
		}
	})
	}

$('#search-button').on('click', function(){
	searchMovies();
})

$('#search-input').on('keyup', function(e){
	if(e.keyCode === 13){
		searchMovies();
	}
})

$('#movie-list').on('click', '#see-detail', function(){
	$.ajax({
		url: 'http://www.omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'df9e82a2',
			'i': $(this).data('id')
		},
		success: function(movie){
			if(movie.Response === "True"){
				$('.modal-body').html(`

					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ movie.Poster +`" class="img-fluid">
							</div>

							<div class="col-md-8">
								<ul class="list-group">
									<li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
									<li class="list-group-item">Released : `+ movie.Released +`</li>
									<li class="list-group-item">Genre : `+ movie.Genre +`</li>
									<li class="list-group-item">Director : `+ movie.Director +`</li>
									<li class="list-group-item">Actor : `+ movie.Actors +`</li>
									<li class="list-group-item">Sinopsis : `+ movie.Plot +`</li>
							</div>
						</div>
					</div>

				`)
			}
		}
	})
})

// function searchMovies(keyword){
// 	let xhr = new XMLHttpRequest();

// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			let movies = JSON.parse(xhr.response);

// 			showMovies(movies.Search);
// 		}
// 	}
// 	// http://www.omdbapi.com/?i=tt3896198&apikey=df9e82a2
// 	xhr.open('GET', 'http://www.omdbapi.com/?apikey=df9e82a2&s=' + keyword);
// 	xhr.send();
// }

// function showMovies(movies){
// 	let cards = '';
// 	movies.forEach(function(movie){
// 		cards += `<div class="col-4 my-3">
// 	  				<div class="card" style="width: 18rem;">
// 					  <img src="${movie.Poster}" class="card-img-top" >
// 					  <div class="card-body">
// 					    <h5 class="card-title">${movie.Title} </h5>
// 					    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
// 					    <a href="detail.php?id=${movie.imdbID}" class="btn btn-primary">Show Detail</a>
// 					  </div>
// 					</div>
//   			    </div>`;
// 	});
// 	// console.log(cards);
// 	movieList.innerHTML = cards;
// }
// let movieList = document.querySelector('.movie-list');
// let inputKeyword = document.querySelector('.input-keyword');
// let searchButton = document.querySelector('.search-button');
// searchMovies('Dilan 1990');

// searchButton.addEventListener('click', function(){
// 	searchMovies(inputKeyword.value);
// 	inputKeyword.value= '';
// });