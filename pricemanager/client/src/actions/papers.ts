import axios from "axios";
import { Dispatch } from "redux";

import { GET_PAPERS } from "./types";

// GET ALL PAPERS
export const getPapers = () => (dispatch: Dispatch) => {
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