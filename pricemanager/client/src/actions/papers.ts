import axios from "axios";
import { Dispatch } from "redux";
import { PaperType } from "../components/papers/types/types";
import { tokenConfig } from "./auth";
import { createMessage } from "./messages";

import { DELETE_PAPER, GET_PAPERS, ADD_PAPER, UPDATE_PAPER } from "./types";

// GET ALL PAPERS
export const getPapers = () => (dispatch: Dispatch) => {
    axios
        .get('/api/papers/', tokenConfig())
        .then(res => {
            dispatch({
                type: GET_PAPERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(createMessage({ error: 'Error: Failed to get papers from database' })));
}

// DELETE ONE PAPER
export const deletePaper = (id: number) => (dispatch: Dispatch) => {
    axios
        .delete(`/api/papers/${id}/`, tokenConfig())
        .then(res => {
            dispatch(createMessage({ success: 'Paper deleted from the database' }));
            dispatch({
                type: DELETE_PAPER,
                payload: id
            });
        })
        .catch(err => dispatch(createMessage({ error: 'Error: Failed to delete paper from database' })));
}

// ADD A PAPER
export const addPaper = (paper: {name: string, cost: number}) => (dispatch: Dispatch) => {
    axios
        .post('/api/papers/', paper, tokenConfig())
        .then(res => {
            dispatch(createMessage({ success: `Successfully added "${ paper.name }" to the database` }));
            dispatch({
                type: ADD_PAPER,
                payload: res.data
            });
        })
        .catch(err => dispatch(createMessage({ error: 'Error: Failed to add paper to database' })));
}

// UPDATE A PAPER
export const updatePaper = (paper: PaperType) => (dispatch: Dispatch) => {
    axios
        .put(`/api/papers/${paper.id}/`, paper, tokenConfig())
        .then(res => {
            dispatch(createMessage({ success: 'Paper has been successfully updated' }))
            dispatch({
                type: UPDATE_PAPER,
                payload: res.data
            });
        })
        .catch(err => dispatch(createMessage({ error: 'Error: Failed to update paper' })));
}

