import { CONSTANTS } from "../actions";

const removeCard = ( cardId) => {
    return {
        type: CONSTANTS.REMOVE_CARD,
        payload: {cardId}
    };
};
export default removeCard;