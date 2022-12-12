import { CONSTANTS } from "../actions";

const addList = (title, projectId) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: {
            text: title,
            projectId: projectId
        }
    };
};
export default addList;  

