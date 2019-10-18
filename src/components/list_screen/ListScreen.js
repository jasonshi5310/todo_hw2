import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
//import PropTypes from 'prop-types';
//import App from '../../App';
import DeleteListDialog from './DeleteListDialog';
//import ItemScreen from '../item_screen/ItemScreen';
import jTPS from './jTPS';

export class ListScreen extends Component {
    state = {
        enable: false,
        stack:null
    }


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

    keyUpEvent(event){
        let keyCode = String.fromCharCode(event.which).toLowerCase();
        if(event.ctrlKey && keyCode === 'z') {
            console.log("ctrl && z");
        }
        else if(event.ctrlKey && keyCode === 'y') {
            console.log("ctrl && y");
        }

    }
    
  /**
   * This method is called by jTPS when a transaction is executed.
   */
  doTransaction = () => {

  }
    
  /**
   * This method is called by jTPS when a transaction is undone.
   */
  undoTransaction = () => {
      
  }

  addListener = () => {
        if (this.state.enable ===  false) {
            document.addEventListener("keyup", this.keyUpEvent.bind(this), false);
            this.setState({enable:true});
            console.log("success");
        }
        
  }

    render() {
        return (
            <div id="todo_list" onMouseMove={this.addListener}>
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
