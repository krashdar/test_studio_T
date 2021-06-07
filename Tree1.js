//Создайте интерфейс построения дерева элементов для записей. 
//Дерево должно быть произвольной вложенности, а элементы должны содержать произвольные атрибуты.
//Сделайте возможность генерации структуры в JSON
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
let TreeAttrNode = document.querySelector('.tree_item_attr');
const btnJSON = document.querySelector('.j-btn-JSON');
const btnTreeTODOM = document.querySelector('.j-btn-TreeToDOM');
const btnAddElement = document.querySelector(".j-btn-AddElement");
const btnRename = document.querySelector(".j-btn-Rename");
const btnDelete = document.querySelector(".j-btn-Delete");
const btnAddAttr = document.querySelector(".j-btn-AddAttr");
const btnDeleteAttr = document.querySelector(".j-btn-DeleteAttr");
const btnDeleteOneAttr = document.querySelector(".j-btn-DeleteOneAttr");

function TreeToDOM (tree,treeNode) {
    let i = 0;
    while (i<tree.children.length){
        let li = document.createElement("li");
        li.textContent = tree.children[i].name;
        if (tree.children[i].children.length !==0){
            let ul = document.createElement("ul");
            li.appendChild(ul);
            TreeToDOM (tree.children[i],ul)
        }
        treeNode.appendChild(li);
    i++;
    }
}

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

function changeButton(activeElement){
    btnAddAttr.textContent = `создать атрибут для ${activeElement.name}`;
    btnDeleteAttr.textContent = `удалить атрибуты у ${activeElement.name}`;
}
function changeText(activeElement){
    let text = "";
    for (let item of activeElement.attributes){
        text += `Атрибут - ${item[0]}, Значение - ${item[1]}\n`;
    }
    TreeAttrNode.textContent = text;
}


let tree = DOMToTree(TreeNode)
let activeElementNode = TreeNode;
let activeElement = tree;
changeButton(activeElement);
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

    changeText(activeElement);
    changeButton(activeElement);



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
btnAddElement.addEventListener("click", () => {
    let newElementName = prompt('Введите имя нового элемента');
    let newElement = new Node(newElementName);
    newElement.parent = activeElement.name;
    activeElement.children.push(newElement);
    changeText(activeElement);
    changeButton(activeElement);
    activeElement = newElement;
    TreeNode.innerHTML = "";
    TreeToDOM(tree,TreeNode);
})
btnRename.addEventListener("click", () => {
    let elementName = prompt('Введите новое имя элемента');
    if (elementName === null){return;}
    activeElement.name = elementName;
    changeText(activeElement);
    changeButton(activeElement);
    TreeNode.innerHTML = "";
    TreeToDOM(tree,TreeNode);
})
btnDelete.addEventListener("click", () => {
    if (activeElement.parent !== null){
        let parent = FindElem(tree,activeElement.parent);
        let index = parent.children.indexOf(activeElement);
        if (index > -1){
            parent.children.splice(index,1);
        }
        activeElement = parent;
        changeText(activeElement);
        changeButton(activeElement);
        TreeNode.innerHTML = "";
        TreeToDOM(tree,TreeNode);
    }

})

btnAddAttr.addEventListener("click", () => {
    let key = prompt('Введите название атрибута');
    let value = prompt('Введите значение атрибута');
    if (key){
        activeElement.attributes.set(key,value);
    }
    console.log(activeElement);
    changeText(activeElement);
    changeButton(activeElement);
});

btnDeleteAttr.addEventListener("click", () => {
    activeElement.attributes.clear();
    changeText(activeElement);
})
btnDeleteOneAttr.addEventListener("click", () => {
    let find = prompt('Введите искомый ключ атрибута для удаления');
    activeElement.attributes.delete(`${find}`);
    changeText(activeElement);
})

btnJSON.addEventListener("click", ()=>{
    console.log(JSON.stringify(tree));
})

btnTreeTODOM.addEventListener("click",() => {
    let data = DOMToTree(TreeNode);
    TreeNode.innerHTML = "";
    TreeToDOM(data,TreeNode);
})


