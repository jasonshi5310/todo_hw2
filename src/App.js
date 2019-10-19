import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json';
import HomeScreen from './components/home_screen/HomeScreen';
import ItemScreen from './components/item_screen/ItemScreen';
import ListScreen from './components/list_screen/ListScreen';
import jsTPS from '../src/jsTPS';
import editListTransaction from '../src/editListTransaction';

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    sortByTask:"sort by task increasing",
    sortByDueDate: "sort by due date increasing",
    sortByStatus: "sort by status increasing",
    currentItemSortCriteria: null,
    tps: new jsTPS(),
    enable: false
  }

  addTransaction = (transaction) => {
    this.state.tps.addTransaction(transaction);
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.setState({tps: new jsTPS()});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
    window.addEventListener('keyup', this.keyUpEvent);
  }

  keyUpEvent = (event) => {
    //let keyCode = String.fromCharCode(event.which).toLowerCase();
    console.log("before:");
    console.log(this.state.tps);
    let current = this.state.tps.peekUndo();
    if (current !== null &&current.oldList.owner===current.newList.owner&& current.oldList.name===current.newList.name)
    this.setState({enable:true});
    if (event.ctrlKey && event.keyCode === 90 && !this.state.enable &&this.state.tps.mostRecentTransaction!==-1)
    {
      this.state.tps.mostRecentTransaction -= 1;
    }

    if(event.ctrlKey && event.keyCode === 90) {
        console.log("ctrl && z");
        event.preventDefault();
        let current = this.state.tps.peekUndo();
        this.state.tps.undoTransaction();
        if (current!== null)//&&this.state.tps.mostRecentTransaction==0)
        {
          this.setState({currentList:current.oldList});
        }
        document.getElementById("list_name_textfield").value = this.state.currentList.name;
        document.getElementById("list_owner_textfield").value = this.state.currentList.owner;
    }
    else if(event.ctrlKey && event.keyCode === 89) {
        console.log("ctrl && y");
        event.preventDefault();
        let current = this.state.tps.peekDo();
        this.state.tps.doTransaction();
        if (current!==null)
        {
          this.setState({currentList:current.newList});
        }
        document.getElementById("list_name_textfield").value = this.state.currentList.name;
        document.getElementById("list_owner_textfield").value = this.state.currentList.owner;
    }
    else
        this.setState({enable:false});
    if (event.ctrlKey && event.keyCode === 90 && !this.state.enable)
    {
      this.state.tps.transactions.pop();
      this.setState({enable:true});
    }
    if (current!==null&&current.oldList.owner===current.newList.owner&& current.oldList.name===current.newList.name)
    this.setState({enable:false});
    console.log("after:")
    console.log(this.state.tps);
}


  loadNewList = () => {
    this.setState({currentScreen:AppScreen.LIST_SCREEN});
    // this.setState({currentList:});
  }

  delList = () => {
    this.setState({todoLists: [...this.state.todoLists.filter(todoList => todoList !== this.state.currentList)]});
  }

  // add new list
  addNewList = () => {
    let todoList = {
      key: this.state.todoLists.length,
      name: "Unknown",
      owner: "unknown",
      items: []
    };
    this.state.todoLists.push(todoList);
    this.setState({currentList:todoList});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  goItemScreen = () => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  submitNewItem = () => {
    let description = document.getElementById("item_description_textfield").value;
    let assignedTo = document.getElementById("item_assigned_to_textfield").value;
    let dueDate = document.getElementById("item_due_date_picker").value;
    let completed = document.getElementById("item_completed_checkbox").checked;
    if (description === "") description = "unknown";
    if (assignedTo === '') assignedTo = "unknown";
    if (dueDate === '') dueDate = null; 
    let currentList = this.state.currentList;       
    let todoItem =  {
        "key": currentList.items.length+1,
        "description": description,
        "due_date": dueDate,
        "assigned_to": assignedTo,
        "completed": completed
    };
    if (this.state.currentItem===null) currentList.items.push(todoItem);
    else {
      let item = this.state.currentItem;
      item.description = description;
      item.assigned_to = assignedTo;
      item.due_date = dueDate;
      item.completed = completed;
    }
    this.loadList(this.state.currentList);
}

loadItem = (item) => {
  this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  if (item!== null)
  {
    let description = document.getElementById("item_description_textfield");
    let assignedTo = document.getElementById("item_assigned_to_textfield");
    let dueDate = document.getElementById("item_due_date_picker");
    let completed = document.getElementById("item_completed_checkbox");
    description.value = item.description;
    assignedTo.value = item.assigned_to;
    dueDate.value = item.due_date;
    completed.checked = item.completed;
  }
  this.setState({currentItem:item});
}

edit = (item) => {
  this.goItemScreen();
  window.setTimeout(() => (this.loadItem(item)), 100);
}


refrash = (todoListToLoad) => {
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
  this.setState({currentList: todoListToLoad});
  console.log("currentList: " + this.state.currentList);
  console.log("currentScreen: " + this.state.currentScreen);
}
// remove move up and down events
removeEvent = (cardIndex,event) => {
  event.stopPropagation();
  let oldList = JSON.parse(JSON.stringify(this.state.currentList));
  let newTrans = new editListTransaction(this.state.currentList, oldList);
  let listItem = this.state.currentList.items[cardIndex];
  this.setState({currentItem:listItem});
  this.state.currentList.items.splice(cardIndex, 1);
  // let newList = JSON.parse(JSON.stringify(this.props.todoList));
  // newTrans.setNewList(newList);
  // this.props.addTransaction(newTrans);
  let newList = JSON.parse(JSON.stringify(this.state.currentList));
  newTrans.setNewList(newList);
  this.addTransaction(newTrans);
  this.refrash(this.state.currentList);
}

downArrowEvent = (index, event) => {
  event.stopPropagation();
  let oldList = JSON.parse(JSON.stringify(this.state.currentList));
  let newTrans = new editListTransaction(this.state.currentList, oldList);
  let listToEdit = this.state.currentList;
  let currentItem = this.state.currentList.items[index];
  this.setState({currentItem:currentItem});
  let nextItem = listToEdit.items[Number(index)+1];
  listToEdit.items[Number(index)+1] = currentItem;
  listToEdit.items[index] = nextItem;
  let newList = JSON.parse(JSON.stringify(this.state.currentList));
  newTrans.setNewList(newList);
  this.addTransaction(newTrans);
  this.refrash(this.state.currentList);
 // this.loadList(this.state.currentList);
}

upArrowEvent = (index, event) => {
  event.stopPropagation();
  let oldList = JSON.parse(JSON.stringify(this.state.currentList));
  let newTrans = new editListTransaction(this.state.currentList, oldList);
  let listToEdit = this.state.currentList;
  let currentItem = this.state.currentList.items[index];
  this.setState({currentItem:currentItem});
  let previousItem = listToEdit.items[Number(index)-1];
  listToEdit.items[Number(index)-1] = currentItem;
  listToEdit.items[index] = previousItem;
  let newList = JSON.parse(JSON.stringify(this.state.currentList));
  newTrans.setNewList(newList);
  this.addTransaction(newTrans);
  this.refrash(this.state.currentList);
  //this.loadList(this.state.currentList);
}

    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks = (sortingCriteria) => {
      let oldList = JSON.parse(JSON.stringify(this.state.currentList));
      let newTrans = new editListTransaction(this.state.currentList, oldList);
      if (sortingCriteria==="task") {
        if (this.state.sortByTask=== "sort by task increasing")
        this.setState({sortByTask:"sort by task decreasing"});
        else this.setState({sortByTask:"sort by task increasing"});
        sortingCriteria= this.state.sortByTask;
      }
      else if (sortingCriteria==="dueDate") {
        if (this.state.sortByDueDate=== "sort by due date increasing") 
        this.setState({sortByDueDate:"sort by due date decreasing"});
        else this.setState({sortByDueDate:"sort by due date increasing"});
        sortingCriteria=this.state.sortByDueDate;
      }
      else if (sortingCriteria==="status") {
        if (this.state.sortByStatus=== "sort by status increasing")
        this.setState({sortByStatus:"sort by status decreasing"});
       else this.setState({sortByStatus:"sort by status increasing"});
       sortingCriteria=this.state.sortByStatus;}
      else console.log("Error in sorting! Incorrect sorting criteria!");
      this.setState({currentItemSortCriteria:sortingCriteria});
      let listToEdit= this.state.currentList;
      listToEdit.items.sort(this.compare);
      let newList = JSON.parse(JSON.stringify(this.state.currentList));
      newTrans.setNewList(newList);
      this.addTransaction(newTrans);
      this.refrash(this.state.currentList);
  }

  /**
   * This method tests to see if the current sorting criteria is the same as the argument.
   * 
   * @param {ItemSortCriteria} testCriteria Criteria to test for.
   */
  isCurrentItemSortCriteria = (testCriteria) => {
      return this.state.currentItemSortCriteria === testCriteria;
  }

  /**
   * This method compares two items for the purpose of sorting according to what
   * is currently set as the current sorting criteria.
   * 
   * @param {TodoListItem} item1 First item to compare.
   * @param {TodoListItem} item2 Second item to compare.
   */
  compare = (item1, item2) => {
    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (this.isCurrentItemSortCriteria("sort by task decreasing")
        || this.isCurrentItemSortCriteria("sort by due date decreasing")
        || this.isCurrentItemSortCriteria("sort by status decreasing")) {
        let temp = item1;
        item1 = item2;
        item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (this.isCurrentItemSortCriteria("sort by task decreasing")
        || this.isCurrentItemSortCriteria("sort by task increasing")) {
        if (item1.description < item2.description)
            return -1;
        else if (item1.description> item2.description)
            return 1;
        else
            return 0;
    }

    // SORT BY DUE DATE
    if (this.isCurrentItemSortCriteria("sort by due date increasing")
        || this.isCurrentItemSortCriteria("sort by due date decreasing")) {
        if (item1.due_date < item2.due_date)
            return -1;
        else if(item1.due_date> item2.due_date)
            return 1;
        else
            return 0;
    }

    // SORT BY COMPLETED
    else {
        if (item1.completed < item2.completed)
            return -1;
        else if (item1.completed > item2.completed)
            return 1;
        else
            return 0;
      }
    }


  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        addNewList={this.addNewList}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          delList={this.delList} 
          goItemScreen={this.goItemScreen.bind(this)}
          edit={this.edit}
          removeEvent={this.removeEvent}
          downArrowEvent={this.downArrowEvent}
          upArrowEvent={this.upArrowEvent}
          sortTasks={this.sortTasks}
          addTransaction={this.addTransaction.bind(this)}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
        loadList={this.loadList.bind(this, this.state.currentList)}
        todoList={this.state.currentList}
        submitNewItem={this.submitNewItem}
        />  //this.goItemScreen();
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;