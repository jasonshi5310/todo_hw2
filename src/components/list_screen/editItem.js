import jTPS_Transaction from './jTPS_Transaction'

export class editItem extends jTPS_Transaction {
    constructor(list, item) {
        super();
        this.state.list = list;
        this.state.item = item;
    }

    state ={
        list: null,
        item: null
    }

    doTransaction() {
        this.state.list.items.push(this.state.item);
    }

    undoTransaction() {
        this.state.list.items.pop();
    }
}