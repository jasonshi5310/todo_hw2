import React, { Component } from 'react'
import App from '../../App';

export default class DeleteListDialog extends Component {
    closeDeleteDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);
    }

    deleteList = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        this.props.delList();
        window.setTimeout(() => this.props.goHome(), 500);
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);

    }


    render() {
        return (
            <div id="list_delete_confirmation" hidden>
            <div id="list_delete_confirmation_content">
                <p className="list_delete_confirmation_message">Delete the list?</p>
                <br/>
                <p id="list_delete_confirmation_bold">Are you sure you want to delete this list?</p>
                <br/>
                <button id="list_delete_confirmation_button_yes" onClick={this.deleteList}
                >Yes</button>
                <button id="list_delete_confirmation_button_no" onClick={this.closeDeleteDialog}
                >No</button>
                <br/>
                <p className="list_delete_confirmation_message">The list will not be retreivable.</p>
            </div>
            </div>
        )
    }
}

