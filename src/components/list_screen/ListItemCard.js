import React, { Component } from 'react'
//import ItemScreen from '../item_screen/ItemScreen';

export class ListItemCard extends Component {
    isComplete = () => {
        if (this.props.listItem.completed)
            return <div className='list_item_card_completed'> Completed
            </div>;
        else
            return <div className='list_item_card_not_completed'> Pending
            </div>;
    }

    upArrowInnerHTML = () => {
        return {__html: '&#8679'};
    }

    upArrow = () => {
        let listItemIndex = this.props.cardIndex;
        let thisId = "list_item_card_upArrow_"+ listItemIndex;
        //this.setupCallback(upArrow, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_UP, itemArgs);
        //upArrow.onclick()
        if (listItemIndex===0) {
            return <button 
            id={thisId} 
            className="list_item_card_button_grey"
            disabled={true}
            dangerouslySetInnerHTML={this.upArrowInnerHTML()}
            onClick={this.props.upArrowEvent.bind(this, this.props.cardIndex)}
            ></button>;
        }
        else {
            return <button 
            id={thisId} 
            className="list_item_card_button_green"
            disabled={false}
            dangerouslySetInnerHTML={this.upArrowInnerHTML()}
            onClick={this.props.upArrowEvent.bind(this, this.props.cardIndex)}
            ></button>
        }       
    }

    downArrowInnerHTML = () => {
        return {__html: '&#8681'};
    }



    downArrow = () => {
        let listItemIndex = this.props.cardIndex;
        let thisId = "list_item_card_downArrow_"+listItemIndex;
        //this.setupCallback(downArrow, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_DOWN, itemArgs);

        if (this.props.isLast) {
            return <button 
            id={thisId}
            className="list_item_card_button_grey"
            disabled={true}
            dangerouslySetInnerHTML={this.downArrowInnerHTML()}
            onClick={this.props.downArrowEvent.bind(this,this.props.cardIndex)}
            >
            </button>;
        }
        else {
            return <button 
            id={thisId}
            className="list_item_card_button_green"
            disabled={false}
            dangerouslySetInnerHTML={this.downArrowInnerHTML()}
            onClick={this.props.downArrowEvent.bind(this,this.props.cardIndex)}
            >
            </button>;
        }
    }

    removeItemInnerHTML = () => {
        return {__html: '&#10005'};
    }


    removeItem = () => {
        let listItemIndex = this.props.cardIndex;
        let thisId = "list_item_card_removeItem_"+listItemIndex;
        //this.setupCallback(downArrow, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_DOWN, itemArgs);
        return <button 
            id={thisId}
            className="list_item_card_button_green"
            disabled={false}
            dangerouslySetInnerHTML={this.removeItemInnerHTML()}
            onClick={this.props.removeEvent.bind(this ,this.props.cardIndex)}
            >
            </button>;
    }

    render() {
        return (
            <div className='list_item_card'
            onClick={this.props.edit.bind(this, this.props.listItem)}
            >
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.isComplete()}
                <div className='list_item_card_toolbar'>
                    {this.upArrow()}
                    {this.downArrow()}
                    {this.removeItem()}
                </div>
            </div>
        )
    }
}

export default ListItemCard
