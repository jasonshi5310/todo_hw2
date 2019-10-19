export class editListTransaction  {
    constructor(list,oldList) {
        this.list = list;
        //this.newList = newList;
        this.oldList = oldList;
    }

    doTransaction() {
        this.list = this.newList;
    }

    undoTransaction() {
        this.list = this.oldList;
    }

    setNewList(newList)
    {
        this.newList = newList;
    }
}
export default editListTransaction