import axios from "../api/axios";

/**
 * Fetches movies from the API and filters out every movie that doesn't have a poster.
 * @param {string} url the url where to fetch
 * @param {int} page number of the page to fetch
 */
export default async function FetchMovies(url) {
    let movies = [];
    let request = await axios.get(url).then(res => {
        console.log(res.data);
        movies = res.data;
        return movies;
    }).catch(execption => {
        console.log(execption);
    })
}