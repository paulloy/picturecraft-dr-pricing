import { CREATE_MESSAGE } from "./types";

// Create Message
export const createMessage = (msg: any) => ({
    type: CREATE_MESSAGE,
    payload: msg
});