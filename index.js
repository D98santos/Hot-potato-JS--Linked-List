const names = ["Jhon", "Jack", "Camila", "Ingrid", "Carl"];
let main = document.querySelector("#main");

function defaultEquals(a, b) {
  return a === b;
}
class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}
class CircularLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
  indexOf(element) {
    let current = this.head; // 1
    for (let i = 0; i < this.count && current != null; i++) {
      // 2
      if (this.equalsFn(element, current.element)) {
        // 3
        return i; // 4
      }
      current = current.next; // 5
    }
    return -1; //6
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    // set node.next to head - to have circular list
    node.next = this.head;
    this.count++;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      // 1
      let node = this.head; // 2
      for (let i = 0; i < index && node != null; i++) {
        // 3
        node = node.next;
      }
      return node; //4
    }
    return undefined; // 5
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node; // 1
          node.next = this.head; //2 NOVO
        } else {
          node.next = current; //3
          current = this.getElementAt(size()); //4
          // atualiza o último elemento
          this.head = node; // 5
          current.next = this.head; // 6 NOVO*-+
        }
      } else {
        //sem alteração neste cenário
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head; // 1
          current = this.getElementAt(this.size()); // 2 NOVO
          this.head = this.head.next; // 3
          current.next = this.head; // 4
          current = removed; // 5
        }
      } else {
        // não há necessidade de atualizar o último elemento da lista circular
        const previous = this.getElementAt(index - 1);
      }
      this.count--;
      return current.element; // 6
    }
    return undefined;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }
  toString() {
    if (this.head == null) {
      //1
      return "";
    }
    let objString = `${this.head.element}`; // 2
    let current = this.head.next; // 3
    for (let i = 1; i < this.size() && current != null; i++) {
      //4
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString; //5
  }
}
const circle = new CircularLinkedList();

function removeBatata(x) {
  let elem = document.querySelector(x);
  elem.children[1].classList.add("none");
  elem.children[1].classList.remove("batata");
}

function entregaBatata(x) {
  let elem = document.querySelector(x);
  elem.children[1].classList.remove("none");
  elem.children[1].classList.add("batata");
}

const addPerson = (x) => {
  const person = document.createElement("div");
  const name = document.createElement("h3");
  const batata = document.createElement("div");

  main.appendChild(person);
  person.className = `box ${x}`;

  person.appendChild(name);
  name.textContent = x;

  person.appendChild(batata);
  batata.className = "none";
};

// Função jogo

function jogo(num) {
  let current = circle.head;
  let i = 0;

  let intervalId = setInterval(function () {
    if (i++ >= num) return clearInterval(intervalId);
    entregaBatata(`.${current.element}`);
    console.log(current.element);
    let anterior = circle.indexOf(current.element) - 1;
    if (anterior === -1) {
      anterior = circle.size() - 1;
    }

    let anta = circle.getElementAt(anterior).element;

    removeBatata(`.${anta}`);
    if (i === num) {
      removePerson(`.${current.element}`, current.element);
      console.log(circle.toString())
    }
    current = current.next;
  }, 2000);
}

function hotbatata(elementsList) {
  for (let i = 0; i < elementsList.length; i++) {
    circle.push(elementsList[i]);
    addPerson(elementsList[i]);
  }
}

const rodada = Math.floor(Math.random() * 10) + 1;
hotbatata(names);
jogo(rodada);

const removePerson = (y,z) => {
  let p = document.querySelector(y);
  main.removeChild(p);

  var i = circle.removeAt(circle.indexOf(z));
  console.log(`yyyyyy${z}`)
  jogo(rodada);
};