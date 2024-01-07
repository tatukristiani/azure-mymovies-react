import axios from 'axios';

/**
 * Used to create own request format for the API that this application uses.
 */
export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});