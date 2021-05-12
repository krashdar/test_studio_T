class Node {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.Attributes = new Map();
        this.children = [];
    }
    SetAttributes(key,value) {
        this.Attributes.set(key,value);
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
btnJSON.addEventListener("click", ()=>{
    console.log(JSON.stringify(DOMToTree(TreeNode)));
})
btnTreeTODOM.addEventListener("click",() => {
    let data = DOMToTree(TreeNode);
    TreeNode.innerHTML = "";
    TreeToDOM(data,TreeNode);
})


