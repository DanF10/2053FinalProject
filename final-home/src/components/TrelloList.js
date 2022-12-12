import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from './TrelloActionButton';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TrelloRemoveListButton from "./TrelloRemoveListButton";

const ListContainer = styled.div `
background-color: #dfe3e6;
border-radius: 3px;
width: 300px;
padding: 8px;
height: 100%;
margin-right: 8px;
`


const TrelloList = ({title, cards, listID, index, projectId}) =>{
    return(
    <Draggable draggableId = {String(listID)} index = {index}>
        {provided => (
            <ListContainer {...provided.draggableProps} ref = {provided.innerRef} {...provided.dragHandleProps}  >
            <Droppable droppableId = {String(listID)}>
                { provided  => ( 
                <div {...provided.droppableProps} ref = {provided.innerRef}>
                    <h4>{title}</h4>
                    { cards.map((card,index) =>( 
                    <TrelloCard 
                    key = {card._id} 
                    index = {index} 
                    text={card.text}
                    id = {card._id}
                    projectId={projectId}
                    endDate={card.endDate}/>))}
                    {provided.placeholder}
                    <TrelloActionButton projectId={projectId}listID={listID}/>
                    <TrelloRemoveListButton sectionRemoveID = {listID} projectId={projectId}></TrelloRemoveListButton>

                    
                </div>
            
    )}

</Droppable>
</ListContainer>

        )}

    </Draggable>

    )
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 8
    }
}

export default TrelloList;