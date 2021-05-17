
class Node {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.attributes = new Map();
        this.children = [];
    }
}
class Tree extends Node{
    constructor(name) {
        super(name);
    }
}

let TreeNode = document.querySelector('.tree_items');
const btnJSON = document.querySelector('.j-btn-JSON');
const btnTreeTODOM = document.querySelector('.j-btn-TreeToDOM');

//TODO придумать где хранить атрибуты на странице и их вывод
function TreeToDOM (tree,treeNode) {
    let i = tree.children.length;
    while (i>0){
        let li = document.createElement("li");
        li.textContent = tree.children[i-1].name;
        if (tree.children[i-1].children.length !==0){
            let ul = document.createElement("ul");
            li.appendChild(ul);
            TreeToDOM (tree.children[i-1],ul)
        }
        treeNode.appendChild(li);
    i--;
    }
}
//TODO придумать где хранить атрибуты на странице и в зависимости от этого собирать их в дерево для хранения
function DOMToTree (treeNode){
    let tree = new Tree("Моё дерево");

    recurse(treeNode,tree)
    function recurse(nodeNode,nodeObj){
        for (let elem of nodeNode.children){
            if (elem.querySelector("ul")){
                let name = elem.innerText.split("\n");
                let node = new Node(name[0]);
                node.parent = nodeObj.name;
                nodeObj.children.push(node);
                recurse(elem.querySelector("ul"),node);
            }else{
                let name = elem.innerText.split("\n");
                let node = new Node(name[0]);
                node.parent = nodeObj.name;
                nodeObj.children.push(node);
                recurse(elem,node);
            }
        }
    }
    return tree;
}
function FindElem (tree,name){
    if (tree.name === name){
        return  tree;
    }
    else {
        function recurse(tree,name){
            if (tree.children.length !== 0){
                for (let i=0; i<tree.children.length;i++){
                    if (tree.children[i].name === name){
                        result = tree.children[i];
                        i=tree.children.length;
                        return result;
                    }else {recurse(tree.children[i],name);}
                }
            }
        }
        recurse(tree,name);
        return result;
    }
}

const btnAddAttr = document.querySelector(".j-btn-AddAtr");
function changeButton(btn,activeElement){
    btnAddAttr.textContent = `создать атрибут для ${activeElement.name}`;
}


let tree = DOMToTree(TreeNode)
let activeElementNode = TreeNode;
let activeElement = tree;
changeButton(btnAddAttr,activeElement);
const TreeItemsNode = document.querySelector('.tree_items_div');

TreeItemsNode.onclick = function (e) {
    document.querySelectorAll("ul").onmousedown = function() {
        return false;
    };
    if (e.target.className === "tree_items") return;
    activeElementNode = e.target;
    let findName = activeElementNode.innerText.split("\n");
    activeElement = FindElem(tree,findName[0]);
    console.log(activeElement);

    changeButton(btnAddAttr,activeElement);


    // activeElementNode.active = !activeElementNode.active;
    // if (activeElementNode.active){
    //     activeElementNode.classList.add('active');
    // }else {
    //     activeElementNode.classList.remove('active')
    // }

    //TODO переделать выделение элемента и снятие выделения у всех остальных элементов

    // let childrenContainer = activeElementNode.querySelector("ul");
    // activeElementNode.active = !activeElementNode.active;
    // if (activeElementNode.active){
    //     if (childrenContainer){
    //         for (let item of TreeNode.querySelectorAll("li")){
    //             item.classList.remove('active');
    //         }
    //     }
    //     activeElementNode.classList.add('active');
    // }else {
    //     activeElementNode.classList.remove('active')
    // }
}

//TODO придумать где хранить атрибуты и возможно, выводить после записи
btnAddAttr.addEventListener("click", () => {
    let key = prompt('Введите название атрибута');
    let value = prompt('Введите значение атрибута');
    if (key){
        activeElement.attributes.set(key,value);
    }
    console.log(activeElement);
});

btnJSON.addEventListener("click", ()=>{
    console.log(JSON.stringify(DOMToTree(TreeNode)));
})
btnTreeTODOM.addEventListener("click",() => {
    let data = DOMToTree(TreeNode);
    TreeNode.innerHTML = "";
    TreeToDOM(data,TreeNode);
})


