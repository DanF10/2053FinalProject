import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import  Card  from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import  addList from "../actions/listsActions";
import addCard from "../actions/cardsActions";
import removeCard from "../actions/cardRemove";
import { FaTrash } from 'react-icons/fa';



class TrelloRemoveButton extends React.Component {

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = "Remove this card"
        const buttonTextOpacity =  0.5;
        const buttonTextColor =  "inherit";
        const buttonTextBackground =  "inherit";


        return (
            <div onClick = {this.openForm}
            style = {{
                ...styles.openForButtonGroup,
                opacty: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground,
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
    handleRemoveCard = () => {
        const { dispatch, id } = this.props; 
        
        dispatch(removeCard(id))

    }





    renderForm = () => {

        const { list } = this.props; 
        const placeholder = "Are you sure you want to remove this card?";
        const buttonTitle = "Remove";
        const buttonOut = "remove";

        return <div>

                <Textarea 
                placeholder = {placeholder}
                autoFocus
                readOnly= "True"
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
            <div style = {styles.formButtonGroup}>
               <Button 
                onMouseDown = {this.handleRemoveCard} width = "50px"  style = {{color: "white", backgroundColor: "#5aac44"}}>
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
        width: 272, 
        paddingLeft: 10
    },
    formButtonGroup:{
        marginTop: 8,
        display: "flex",
        alignItems: "center"
        
    }
}

export default connect () (TrelloRemoveButton);