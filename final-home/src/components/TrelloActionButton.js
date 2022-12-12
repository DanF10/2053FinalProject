import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import  Card  from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateProject }from '../features/projects/projectSlice'

let sectionCount = 0;
let taskCount = 0;

class TrelloActionButton extends React.Component {
    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1: 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div 
            onClick = {this.openForm}
            style = {{...styles.openForButtonGroup,
             opacity: buttonTextOpacity, 
             color: buttonTextColor, 
             backgroundColor: buttonTextBackground}}>
                <Icon>+</Icon>
                <p> { buttonText } </p>
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

    handleAddList = () => {
        const { dispatch, projectId } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: " "
            })
            dispatch(updateProject({data: {section: {text: text}}, projectId: projectId}))
        }
        return;
    };
    
    handleAddCard = () => {
        const { dispatch, listID, projectId } = this.props;
        const{ text } = this.state;

        if(text){
            this.setState({
                text: " "
            })
            dispatch(updateProject({data: {sectionID: listID, text: text}, projectId: projectId}))
        }
    }



    renderForm = () => {

        const { list } = this.props;
        const placeholder = list ? "Enter list title" : "Enter card title";
        const buttonTitle = list ? "Add list" : "Add card";

        return <div>
            <Card style = {{
                minHeight: 85,
                minWidth: 272,
                padding: "6px 8px 2px"
            }}>
                <Textarea 
                placeholder = {placeholder}
                autoFocus
                onBlur = {this.closeForm}
                value = {this.state.text}
                onChange = {this.handleInputChange}
                style = {{
                    resize: "none",
                    width: "100%",
                    overflow: "hidden",
                    outline: "none",
                    border: "none"
                    }}/>
                
            </Card>
            <div style = {styles.formButtonGroup}>
                <Button
                 onMouseDown = { list ? this.handleAddList : this.handleAddCard} variant = "contained" style = {{color: "white", backgroundColor: "#5aac44"}}>
                    {buttonTitle}{" "}
                </Button>

                <Icon style = {{marginLeft: 8, curose: "pointer" }}>x</Icon>
                
            </div>
        </div>
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