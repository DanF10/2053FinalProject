import { CONSTANTS } from "../actions";

const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};
export default addList;  

