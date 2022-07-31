
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
    return element;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

let main = document.querySelector("#main");

const removePerson = (x) => {
  document.querySelector(x).className = "none";
  console.log(x);
};
const addPerson = (x) => {
  const person = document.createElement("div");
  const name = document.createElement("h3");
  const batata = document.createElement("div");

  main.appendChild(person);
  person.className = `box ${x}`;

  person.appendChild(name);
  name.textContent = x;

  person.appendChild(batata);
  batata.className = "batata";
};

function hotbatata(elementsList, num) {
  const queue = new Queue();
  const eliminatedList = [];
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
    addPerson(elementsList[i]);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
//     queue.enqueue(queue.dequeue());



    }


    eliminatedList.push(queue.dequeue());
    console.log();
  } /*
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue(),
  };*/
}

const names = ["Jhon", "Jack", "Camila", "Ingrid", "Carl"];
hotbatata(names, 7);
/*
result.eliminated.forEach((name) => {
  console.log(`${name} was elimunated from the Hot batata game`);
});
console.log(`The winner is: ${result.winner}`);
*/
