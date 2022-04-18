class Stack {
    constructor () {
    this.count = 0
    this.storage = {}
    }

    push (value) {
        this.storage[this.count] = value
        this.count++
    }

    pop () {
        if (this.count === 0) return undefined
        this.count--
        let result = this.storage[this.count]
        delete this.storage[this.count]
        return result
    }

    peek () {
        return this.storage[this.count - 1]
    }

    size () {
        return this.count
    }
}

const stack = new Stack;

//push
stack.push(1)
console.log(stack.storage)
stack.push(2)
console.log(stack.storage)
stack.push(12)
console.log(stack.storage)

//peek  (останній елемент)
console.log(stack.peek())

//size
console.log(stack.size())

//pop
stack.pop(2)
console.log(stack.storage)
stack.pop(1)
console.log(stack.storage)