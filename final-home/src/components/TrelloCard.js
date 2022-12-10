import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Textarea from 'react-textarea-autosize';
import removeCard from "../actions/cardRemove";
import handleRemoveCard from "./TrelloActionButton";
import TrelloRemoveButton from "./TrelloRemoveButton";



const CardContainer = styled.div `
margin-bottom: 8px;

`


const TrelloCard = ({text, id, index}) =>{
    return(


        
        <Draggable draggableId = {String(id)} index = {index}>
        {provided => (
            <CardContainer
            ref = {provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
                <Card>  
                <CardContent>
                    <Typography gutterBottom>{text}</Typography>
                    <TrelloRemoveButton id = {id}>
                        </TrelloRemoveButton>    
                    </CardContent>
                </Card>
               
            </CardContainer>
        )}

        </Draggable>
    )

}


const styles = {
    cardContainer: {
        marginBottom: 8
    }
}

export default TrelloCard;