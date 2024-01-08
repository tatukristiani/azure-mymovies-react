/**
 * Request templates used with own axios requests.
 */
class MyMoviesAPI {
    constructor() {
        this.trendingURL = "/Movie/trending?page={page}";
        this.genreURL = "/Movie/{genre}?page={page}";
        this.myMoviesURL = "/UserMovie/User?id={id}";
        this.searchURL = "/Movie/search?movie={movie}";
        this.deleteUserMovieEndpoint = "/UserMovie?movieTmdbId={movieid}&userId={userid}";
        this.resetPasswordEndpoint = "/User/ResetPassword?id={id}&password={password}";
        this.sendResetPasswordLinkEndpoint = "/User/SendResetPasswordLink?email={email}";
        this.updateUserEndpoint = "/User/updateuser";
        this.registerEndpoint = "Access/register";
        this.loginURL = "/Access/login?username={username}&password={password}";
        this.addMovieForUserURL = "/UserMovie?movieid={movieid}&userid={userid}";
        this.addNewMovieForUserEndpoint = "/UserMovie/User?userId={userid}";
    }

    getTrendingURL(page) {
        return this.trendingURL
            .replace("{page}", page);
    }

    getGenreURL(genre, page) {
        return this.genreURL
            .replace("{genre}", genre)
            .replace("{page}", page);
    }

    getMyMoviesURL(id) {
        return this.myMoviesURL
            .replace("{id}", id);
    }

    searchMovieURL(movie) {
        return this.searchURL
            .replace("{movie}", movie);
    }

    deleteUserMovieURL(movieid, userid) {
        return this.deleteUserMovieEndpoint
            .replace("{movieid}", movieid)
            .replace("{userid}", userid);
    }

    sendResetPasswordLinkURL(email) {
        return this.sendResetPasswordLinkEndpoint
            .replace("{email}", email);
    }

    resetPasswordURL(id, password) {
        return this.resetPasswordEndpoint
            .replace("{id}", id)
            .replace("{password}", password);
    }

    updateUserURL() {
        return this.updateUserEndpoint;
    }

    registerURL() {
        return this.registerEndpoint;
    }

    loginUserURL(username, password) {
        return this.loginURL
            .replace("{username}", username)
            .replace("{password}", password);
    }

    addMovieURL(movieid, userid) {
        return this.addMovieForUserURL
            .replace("{movieid}", movieid)
            .replace("{userid}", userid);
    }

    addNewMovieForUserURL(userid) {
        return this.addNewMovieForUserEndpoint
            .replace("{userid}", userid);
    }
}

var api = new MyMoviesAPI();
export default api;