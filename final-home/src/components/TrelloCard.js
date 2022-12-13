import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TrelloRemoveButton from "./TrelloRemoveButton";

const CardContainer = styled.div `
margin-bottom: 8px;
`

const TrelloCard = ({text, id, index, projectId, endDate}) =>{
    const formatDate = () => {
        if (endDate.includes("T")) {
            endDate = endDate.substring(0,endDate.indexOf("T"));
            const parts = endDate.split('-');
            endDate = parts[1] + "/" + parts[2] + "/" + parts[0];
        }
    }

    useEffect(() => {
        if (endDate && endDate.includes("T")) {
            endDate = endDate.substring(0,endDate.indexOf("T"));
            const parts = endDate.split('-');
            endDate = parts[1] + "/" + parts[2] + "/" + parts[0];
        }
    }, [])

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
                        {endDate ? <p>Due: {endDate.substring(0,endDate.indexOf("T")).replaceAll('-', '/')}</p> : <p></p>}
                        <TrelloRemoveButton id={id} projectId={projectId}></TrelloRemoveButton>
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