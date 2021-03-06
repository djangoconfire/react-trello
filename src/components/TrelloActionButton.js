import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon'
import { Button } from '@material-ui/core';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card'
import { addList } from '../actions/listAction'
import { addCard } from '../actions/cardAction'
import { connect } from 'react-redux'


class TrelloActionButton extends Component {
    state = {
        formOpen : false,
        text : ''
    }

    // handling input change 
    handleChange = (e) => {
        this.setState({
            text : e.target.value
        })
    }

    // closing the opened form on close or blur 
    closeForm = () => {
        this.setState({
            formOpen : false
        })
    }

    openForm = () => {
        this.setState({
            formOpen : true
        })
    }

    handleAddList = () => {
        console.log("props", this.props)
        const { dispatch } = this.props
        const { text } = this.state
        // reseting the state
        this.setState({
            text : ''
        })
        if(text){
            dispatch(addList(text))
        }
        return
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props
        const { text } = this.state
        // Reseting the state 
        this.setState({
            text : ''
        })
        if(text){
            dispatch(addCard(listID,text))
        }
        return 
    }

    renderForm = () => {
        const { list } = this.props
        const placeholder = list ? 'Enter list title...' : 'Enter title for this card ...'
        const buttonText = list ? "Add List" : "Add Card"

        return(
            <div>
                <Card style={{
                    minHeight: 65,
                    minWidth : 185,
                    padding : "6px 6px 2px"
                }}>
                    <Textarea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleChange}
                        style={{
                            overflow: "hidden",
                            width: "100%",
                            resize: "none",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button 
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant="contained" 
                        style={{color: "white", backgroundColor:"green"}}>
                        {buttonText}
                    </Button> 
                    <Icon style={{marginLeft: 10, cursor: "pointer"}} onClick={this.closeForm}>close</Icon>  
                </div>
            </div>
            
        )
    }

    renderAddButton = () => {
        const { list } = this.props
        const buttonText = list ? 'Add another List' : 'Add another card'
        const buttonTextOpacity = list ? 1 : 0.5
        const buttonTextColor = list ? "white" : "inherit"
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit"

        return(
            <div onClick={this.openForm} style={{
                ...styles.openForButtonGroup,
                opacity: buttonTextOpacity , 
                color: buttonTextColor , 
                backgroundColor: buttonTextBackground
            }}
            >
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }
    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton()
    }
}

// Css Style - will be convereted into styled components - update soon 
const styles = {
    openForButtonGroup : {
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 3,
        cursor: "pointer"

    },
    formButtonGroup : {
        marginTop: 8,
        display: "flex",
        alignItems:"center"
    }
}


export default connect()(TrelloActionButton)