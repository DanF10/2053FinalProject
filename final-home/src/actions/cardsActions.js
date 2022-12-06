import { CONSTANTS } from "../actions";

const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, listID}
    };
};
export default addCard;