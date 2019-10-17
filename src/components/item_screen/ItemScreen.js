import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    
    render() {
        return (
            <div id="add_new_item_page">
            <div id="add_new_item_dialog">
                <div className = "add_new_item_header">
                    <span>Item</span>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_description_prompt">Description:</span>
                    <input type="text" id="item_description_textfield" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id = "item_assigned_to_prompt">Assigned To:</span>
                    <input type="text" id="item_assigned_to_textfield" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id="item_due_date_prompt">Due Date:</span>
                    <input type="date" id="item_due_date_picker" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_completed_prompt">Completed:</span>
                    <input type="checkbox" id="item_completed_checkbox" />
                </div>
                <br/>
                <button id="item_form_submit_button"
                onClick={this.props.submitNewItem.bind(this)}
                >Submit</button>
                <button id="item_form_cancel_button"
                onClick={this.props.loadList}
                >Cancel</button>
            </div>
    
            </div> 
        )
    }
}

ItemScreen.propTypes = {
    //currentScreen: PropTypes.string.isRequired,
   // todoItem: PropTypes.object.isRequired
}

export default ItemScreen
