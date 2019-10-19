import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    addNewItemButton = () => {
        return <button className="list_item_card_button"
        onClick={this.props.edit.bind(this, null)}> + </button>;
    }

    isLast = (index) => {
        return index===this.props.todoList.items.length-1;
    }


    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                <div className="list_item_task_header"
                onClick={this.props.sortTasks.bind(this, "task")}>
                    Task</div>
                <div className="list_item_due_date_header"
                onClick={this.props.sortTasks.bind(this, "dueDate")}>
                    Due Date</div>
                <div className="list_item_status_header"
                onClick={this.props.sortTasks.bind(this, "status")}>
                    Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            cardIndex={this.props.todoList.items.indexOf(todoItem)}
                            isLast = {this.isLast(this.props.todoList.items.indexOf(todoItem))}
                            goItemScreen={this.props.goItemScreen}
                            edit={this.props.edit}
                            listToEdit={this.props.todoList}
                            removeEvent={this.props.removeEvent}
                            downArrowEvent={this.props.downArrowEvent}
                            upArrowEvent={this.props.upArrowEvent}
                            addTransaction={this.props.addTransaction}
                            />
                    ))
                }
                <center className="list_item_card">{this.addNewItemButton()
                }</center>
            </div>
        )
    }
}

export default ListItemsTable
