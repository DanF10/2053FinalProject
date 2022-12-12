import React from "react";
import Textarea from 'react-textarea-autosize';
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateProject }from '../features/projects/projectSlice'
import { FaTrash } from 'react-icons/fa'

let sectionCount = 0;
let taskCount = 0;

class TrelloActionButton extends React.Component {
    renderAddButton = () => {
        const buttonText = "Remove this card";
        const buttonTextOpacity = 0.5;
        const buttonTextColor = "inherit";
        const buttonTextBackground = "inherit";

        return (
            <div 
                onClick = {this.openForm}
                style = {{...styles.openForButtonGroup,
                opacity: buttonTextOpacity, 
                color: buttonTextColor, 
                backgroundColor: buttonTextBackground}}>
                <p><FaTrash></FaTrash></p>
            </div>
        )
    }

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }
    closeForm = e => {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange = e => {
        this.setState ({
            text: e.target.value
        })
    }
    
    handleRemoveCard = () => {
        const { id, projectId, dispatch } = this.props;
        dispatch(updateProject({data:{removeCardId: id}, projectId:projectId}));
    }



    renderForm = () => {

        const { list } = this.props;
        const placeholder = "Are you sure you want to remove this card?";
        const buttonTitle = "Remove";
        const buttonOut = "remove";

        return (
            <div>
                <Textarea 
                    placeholder = {placeholder}
                    autoFocus
                    readOnly="True"
                    onBlur = {this.closeForm}
                    value = {this.state.text}
                    onChange = {this.handleInputChange}
                    style = {{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none"
                    }}
                />
                
                <div style = {styles.formButtonGroup}>
                    <Button
                        onMouseDown = {this.handleRemoveCard} variant = "contained" style = {{color: "white", backgroundColor: "#5aac44"}}>
                        {buttonOut}
                    </Button>
                </div>
            </div>
        )
    }

    render(){
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}
const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272, 
        paddingLeft: 10
    },
    formButtonGroup:{
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}

export default connect() (TrelloActionButton);