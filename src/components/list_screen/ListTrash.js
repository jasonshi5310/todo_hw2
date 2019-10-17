import React, { Component } from 'react'


export class ListTrash extends Component {
    showDeleteListDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_out");
        deleteListDialog.classList.add("list_dialog_slide_in");
        deleteListDialog.hidden = false;
    }

    render() {
        return (
            <div id="list_trash" onClick={this.showDeleteListDialog}>&#128465;</div>
        )
    }
}

export default ListTrash
