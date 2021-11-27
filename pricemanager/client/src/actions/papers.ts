import axios from "axios";
import { Dispatch } from "redux";

import { DELETE_PAPER, GET_PAPERS } from "./types";

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

// DELETE ONE PAPER
export const deletePaper = (id: number) => (dispatch: Dispatch) => {
    axios
        .delete(`/api/papers/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_PAPER,
                payload: id
            });
        })
        .catch(err => console.log(err));
}
