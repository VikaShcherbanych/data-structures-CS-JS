class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }
    enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }
    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }
    peek() {
      return this.items[this.headIndex];
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }
  }
  const queue = new Queue();
  queue.enqueue(7);
  queue.enqueue(2);
  queue.enqueue(6);
  queue.enqueue(4);
  console.log('delete-', queue.dequeue()); 
  console.log('peek-', queue.peek());    
  console.log('length-', queue.length);  


  // second example
class Queue1 {
   
    constructor(){
      
      this.data = [];
      this.rear = 0;
      this.size = 10;
    }
    
    enqueue(element) {
     if(this.rear < this.size ) {
           this.data[this.rear] = element;
           this.rear = this.rear + 1;
      }
   }
   length() {
     
      return this.rear;
   }
   isEmpty() {
    
     return this.rear === 0;
   }
   getFront() {
    
     if(this.isEmpty() === false) {
         return this.data[0];
     }
   }
   getLast() {
     
      if(this.isEmpty() === false) {
        
           return this.data[ this.rear - 1 ] ;
      }
   }
   dequeue() {
    
      if(this.isEmpty() === false) {
           
           this.rear = this.rear-1;
           return this.data.shift();
      }
   }
   print() { 
    for(let i =0; i < this.rear; i++) {
       console.log(this.data[i]);
     }
   }
    clear() {
       this.data.length = 0;
       this.rear = 0;
    }
 }

 const queue1 = new Queue1();
  queue1.enqueue(17);
  queue1.enqueue(25);
  queue1.enqueue(36);
  queue1.enqueue(48);
  console.log('delete-', queue1.dequeue()); 
  console.log('front-', queue1.getFront());   
  console.log('last-', queue1.getLast());   
  console.log('length-', queue1.length());  
  queue1.print(); 