'use strict';
//переменные
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const adv = document.querySelectorAll('.promo__adv img');
    const poster = document.querySelector('.promo__bg');
    const genre = poster.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = document.querySelector('.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');



    //функции
    const sortArr = (arr) => {
        arr.sort();
    };

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.background = 'url(../img/bg.jpg) center center/cover no-repeat';
    };

    const createMoviesList = (films, parent) => {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
    <li class="promo__interactive-item">${i+1} ${film}
                                <div class="delete"></div>
                            </li>`;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMoviesList(films, parent);

            });
        });
    }

    const addFlim = (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('добавляем  в избранное');
            }
            movieDB.movies.push(newFilm.toUpperCase());
            sortArr(movieDB.movies);
            createMoviesList(movieDB.movies, movieList);
        }
        event.target.reset();
    }

    //вызов функций
    makeChanges();
    deleteAdv(adv);
    createMoviesList(movieDB.movies, movieList);

    //обработчики событий
    addForm.addEventListener('submit', addFlim);

});