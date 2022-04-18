//Сначала создаем односвязній список

class Node {
    constructor (data, prev) {
        this.data = data;
        this.prev = prev;
    }
}

//Теперь класс для реализации такой структуры данных, как стек

class Stack {
    constructor () {
        this.last = null;
        this.stack = [];
    }

    push (data) {
        this.last = new Node (data, this.last);
        this.stack.push(data)
    }

    pop () {
        let result;
        if (this.last !== null) {
            result = this.last.data;
            this.last = this.last.prev;
            this.stack.pop(result)
        }
        return result;
    }
}

const stack  = new Stack();

//push
stack.push(1)
console.dir(stack.stack)
stack.push(2)
console.log(stack.stack)
stack.push(100)
console.log(stack.stack)

//pop
stack.pop()
console.log(stack.stack)
stack.pop()
console.log(stack.stack)