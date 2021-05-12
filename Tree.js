const ContentNode = document.querySelector('.content_text');
const TreeItemsNode = document.querySelector('.tree_items');
class Tree{
    constructor(name) {
        this.type = "tree";
        this.name = name;
        this.path = name;
    }
    childrens = [];
}
class Folder {
    constructor(name,parent) {
        this.type = "folder";
        this.name = name;
        this.path = `${parent.path}/${this.name}`;
        // this.selected = false;
    }
    childrens = [];
}
class File {
    constructor(name,text,parent) {
        this.type = "file";
        this.name = name;
        this.content = text;
        this.path = `${parent.path}/${this.name}`;
        // this.selected = false;
    }
    showContent(){
        ContentNode.textContent = `${this.content}`;
    }
    hideContent(){

    }
    childrens = [];
}
function AddToTree (obj){
    activeElement.childrens.push(obj);
    let div = document.createElement("div");
    div.textContent = obj.name;
    div.classList.add(`${obj.type}`);
    activeElementNode.appendChild(div);
    console.log(JSON.stringify(MainTree));
}
const MainTree = new Tree("My tree");
let activeElement = MainTree;
TreeItemsNode.insertAdjacentHTML("afterbegin",`<div class="tree_items_item tree show">${MainTree.name}</div>`);
let activeElementNode = document.querySelector('.tree_items_item.tree.show')

TreeItemsNode.onclick = function (e) {
    if (e.target.className === "tree_items") return;
    let childrenContainer = e.target.children;

    if (childrenContainer.length === 0) return;

    childrenContainer.hidden = !childrenContainer.hidden;

    if (childrenContainer.hidden){
        e.target.classList.add('hide');
        e.target.classList.remove('show');
    }else {
        e.target.classList.add('show');
        e.target.classList.remove('hide');
    }
}

const btnAddFolder = document.querySelector('.j-btn-add-folder');
btnAddFolder.addEventListener('click',() => {

})
const btnAddFile = document.querySelector('.j-btn-add-file');
btnAddFile.addEventListener('click',() => {
    let newFile = new File('default file','default text', activeElement);
    console.log(JSON.stringify(newFile));
    AddToTree(newFile);
    console.log(JSON.stringify(newFile));
    activeElement = newFile;
})