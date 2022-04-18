class Stack {
    constructor () {
        this.stack = [];
    }

    push (data) {
        this.stack.push(data)
    }

    pop () {
        this.stack.pop()
    }
}

const stack = new Stack;

//push
stack.push(1)
console.log(stack.stack)
stack.push(2)
console.log(stack.stack)

//pop
stack.pop(2)
console.log(stack.stack)
stack.pop(1)
console.log(stack.stack)