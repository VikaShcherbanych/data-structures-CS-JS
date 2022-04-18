// Реалізація черги за допомогою масиву
class Queue {
    constructor () {
        this.collection = []
    }
    
    print () {
        console.log(this.collection)
    }

    enqueue (element) {
        this.collection.push(element)
    }

    dequeue () {
        return this.collection.shift()
    }

    front () {
        return this.collection[0]
    }

    isEmpty () {
        return this.collection.length === 0
    }

    size () {
        return this.collection.length
    }
}

const queue = new Queue();
queue.print();
queue.enqueue(10);
queue.enqueue(105);
queue.enqueue(134);
console.log(queue.dequeue());
queue.print();
console.log(queue.front());
console.log(queue.isEmpty());
console.log(queue.size());

//Реалізація черги за допомогою зв'язаного списку

class Node {
    constructor (data) {
        this.data = data;
        this.next = null;
    }
}

class QueueLinkedList {
    constructor () {
        this.front = null;
        this.back = null;
    }

    isEmpty() {
        return !this.front;
    }

    enqueue(value) {
        // create a new node with value
        let node = new Node(value);
    
        // if queue is empty
        if (this.isEmpty()) {
          // point front and back to new node
          this.front = this.back = node;
          console.log (this.front, this.back)
        }
        // else the queue is not empty
        else {
          // push node to back of the queue
          // by pointing the last node to the newly created node
          this.back.next = node;
    
          // move back pointer to new node
          this.back = node;
          console.log (this.front, this.back)
        }
    
        this.print();
      }
    
      print() {
        // If the queue is empty
        if (this.isEmpty()) {
          console.log('EMPTY QUEUE');
        }
        // Else it's not empty
        else {
          // temp arr
          let tmpArr = [];
    
          // tmp variable to the front of the queue
          let tmp = this.front;
    
          // iterate through the queue
          while (tmp) {
            // add value into tmp arr
            tmpArr.push(tmp.data);
    
            // move to the next element
            tmp = tmp.next;
          }
    
          // print the values
          console.log(tmpArr);
        }
      }
    
      dequeue() {
        // pointer to front of the queue
        let node = this.front;
        console.log('DEQUEUE', node ? node.data : '');
    
        // if queue is not empty
        if (!this.isEmpty()) {
          // move front to the next element
          this.front = this.front.next;
        }
    
        // check if front is null / past the end of the queue
        if (!this.front) {
          // set back to null
          this.back = null;
        }
    
        // print
        this.print();
    
        // return node at the front of the queue
        return node;
      }
}

let q = new QueueLinkedList();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

q.dequeue();
q.dequeue();
q.dequeue();