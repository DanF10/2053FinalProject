import { ListTwoTone } from "@material-ui/icons";
import { startTransition } from "react";
import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialState = [
    {
        title: "Last Episode",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "we created a static last and a static card"
            },
            {
                id:  `card-${1}`,
                text: "This is our second card"
            }
        ]
    },
    {
        title: "This Episode",
        id: `list-${1}`,
        cards: [
            {
                id:  `card-${2}`,
                text: "we will create our first reducer"
            },
            {
                id:  `card-${3}`,
                text: "and render cards without static data"
            },
            {
                id:  `card-${4}`,
                text: "Along with some other things"
            }
        ]
    }

]


const listsReducer = (state =  initialState, action) => {
    switch(action.type){


        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return [...state, newList];

        case CONSTANTS.ADD_CARD:{
            const newCard = {
                text:action.payload.text,
                card: `card-${cardID}`
            }
            cardID += 1;

            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return{
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            });
            return newState;
        }

            case CONSTANTS.DRAG_HAPPENED:{
                const {        
                    droppableIdStart,
                    droppableIdEnd,
                    droppableIndexStart,
                    droppableIndexEnd,
                    draggableId,
                    type
                } = action.payload
                const newState = [...state];

                if(type === "list"){
                    const list = newState.splice(droppableIndexStart, 1);
                    newState.splice(droppableIndexEnd, 0, ...list);
                    return newState
                }

                ///insamelist
                if(droppableIdStart === droppableIdEnd){
                    const list = state.find(list => droppableIdStart === list.id);
                    const card = list.cards.splice(droppableIndexStart, 1);
                    list.cards.splice(droppableIndexEnd, 0, ...card);
                }

                ///in diff list
                if(droppableIdStart !== droppableIdEnd){
                    const listStart = state.find(list => droppableIdStart === list.id)
                    const card = listStart.cards.splice(droppableIndexStart, 1);
                    const listEnd = state.find(list => droppableIdEnd === list.id);
                    listEnd.cards.splice(droppableIndexEnd, 0, ...card);
                }


                return newState;
            }
            case CONSTANTS.REMOVE_CARD:{
                const { cardId } = action.payload
                
                for (let i = 0; i < state.length; i++) {
                    for (let j = 0; j < state[i].cards.length; j++) {
                        if (state[i].cards[j].id === cardId) {
                            state[i].cards.splice(j, 1);
                            cardID = cardID - 1;
                        }      
                    }
                }

                let newState = [...state]
                return newState;
            }

            case CONSTANTS.REMOVE_LIST:{
                const {listId} = action.payload
                console.log(state[0]);
                console.log(listId);
                for(let i = 0; i < state.length; i++){
                    if(state[i].id === listId){
                        state.splice(i,1)
                        listID = listID -1;
                    }
                }
            }

            let newState = [...state]
            console.log(newState)
            return newState;
                

        default:
            return state;
    }
};

export default listsReducer;