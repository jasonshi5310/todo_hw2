import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import App from '../../App';
import DeleteListDialog from './DeleteListDialog';
import ItemScreen from '../item_screen/ItemScreen';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            //let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            //let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
        else return "";
    }

    handleNameChange = (event) => {
        //console.log(event.target.value);
        let value = event.target.value;
        if (value !== "")
            this.props.todoList.name = value;
        else 
            this.props.todoList.name = "unnknown";

    }

    handleOwnerChange = (event) => {
        //console.log(event.target.value);
        let value = event.target.value;
        if (value !== "")
            this.props.todoList.owner = value;
        else 
            this.props.todoList.owner = "unknown";

    }


    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash ListToDelete/>
                <DeleteListDialog goHome={this.props.goHome} delList={this.props.delList}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            onChange={this.handleNameChange} 
                            //onKeyUp={this.setListName()}
                            />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={this.handleOwnerChange}
                            />
                    </div>
                </div>
                <ListItemsTable 
                todoList={this.props.todoList}
                goItemScreen={this.props.goItemScreen}
                edit={this.props.edit}
                removeEvent={this.props.removeEvent}
                downArrowEvent={this.props.downArrowEvent}
                upArrowEvent={this.props.upArrowEvent}
                sortTasks={this.props.sortTasks}
                />
            </div>
        )
    }

}

export default ListScreen
