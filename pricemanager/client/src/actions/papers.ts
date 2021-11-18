import axios from "axios";

import { GET_PAPERS } from "./types";

// GET PAPERS
export const getPapers = () => dispatch => {
    axios
        .get('/api/papers/')
        .then(res => {
            dispatch({
                type: GET_PAPERS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}