import axios from "axios";
import { Dispatch } from "redux";
import { PaperType } from "../components/papers/types/types";

import { DELETE_PAPER, GET_PAPERS, ADD_PAPER, UPDATE_PAPER } from "./types";

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

// ADD A PAPER
export const addPaper = (paper: {name: string, cost: number}) => (dispatch: Dispatch) => {
    axios
        .post('/api/papers/', paper)
        .then(res => {
            dispatch({
                type: ADD_PAPER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// UPDATE A PAPER
export const updatePaper = (paper: PaperType) => (dispatch: Dispatch) => {
    axios
        .put(`/api/papers/${paper.id}/`, paper)
        .then(res => {
            dispatch({
                type: UPDATE_PAPER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

