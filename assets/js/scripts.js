document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("movieList")) {
        fetchMovies();
    }

    const form = document.getElementById("movieForm");
    if (form) {
        form.addEventListener("submit", createMovie);
    }
});

function fetchMovies() {
    fetch('/movies')
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.length === 0) {
                html = '<p>No hay películas disponibles.</p>';
            } else {
                html = '<ul class="list-group">';
                data.forEach(movie => {
                    html += `<li class="list-group-item">${movie.name} - ${movie.genre}</li>`;
                });
                html += '</ul>';
            }
            document.getElementById("movieList").innerHTML = html;
        });
}

function createMovie(event) {
    event.preventDefault();

    const movieData = {
        name: document.getElementById("name").value,
        synopsis: document.getElementById("synopsis").value,
        genre: document.getElementById("genre").value,
        duration: document.getElementById("duration").value,
        director: document.getElementById("director").value,
        actors: document.getElementById("actors").value
    };

    fetch('/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            Swal.fire({
                icon: 'success',
                title: '¡Exito!',
                text: 'Película creada exitosamente!',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear la película.'
            });
        }
    });
}
