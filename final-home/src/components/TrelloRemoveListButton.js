import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import  Card  from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import  addList from "../actions/listsActions";
import addCard from "../actions/cardsActions";
import removeCard from "../actions/cardRemove";
import removeList from "../actions/listRemove";
import { FaTrash } from 'react-icons/fa';

class TrelloRemoveListButton extends React.Component {

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = "Remove this list"
        const buttonTextOpacity =  1;
        const buttonTextColor =  "white";
        const buttonTextBackground =  "rgba(0,0,0,.15)";


        return (
            <div onClick = {this.openForm}
            style = {{
                ...styles.openForButtonGroup,
                opacty: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground
            }}>
                <p> <FaTrash></FaTrash></p>
            </div>
        )
    };


    state = {
        formOpen: false
    }
    openForm = () => {
        this.setState({
            formOpen: true
        });
    };
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
    handleRemoveList = () => {
        const { dispatch, listRemoveID } = this.props; 
        
        dispatch(removeList(listRemoveID))

    }





    renderForm = () => {

        const { list } = this.props; 
        const placeholder = "Are you sure you want to remove this List?";
        const buttonTitle = "Remove";
        const buttonOut = "remove";

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
                onMouseDown = {this.handleRemoveList} width = "50px"  style = {{color: "white", backgroundColor: "#5aac44"}}>
                    {buttonOut}
                </Button>

                
                
            </div>
        </div>
    }

    render () {
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
        width: 20, 
        paddingLeft: 5
    },
    formButtonGroup:{
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}

export default connect () (TrelloRemoveListButton);