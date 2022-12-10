import { CONSTANTS } from "../actions";

const removeList = (listId) => {
    return {
        type: CONSTANTS.REMOVE_LIST,
        payload: {listId}
    };
};
export default removeList;  