class Heap {
    /**
     * @param {function} compare
     * @param {array} [_values]
     * @param {number|string|object} [_leaf]
     */
    constructor(compare, _values, _leaf) {
      if (typeof compare !== 'function') {
        throw new Error('Heap constructor expects a compare function');
      }
      this._compare = compare;
      this._nodes = Array.isArray(_values) ? _values : [];
      this._leaf = _leaf || null;
    }
  
    /**
     * Checks if a parent has a left child
     * @private
     */
    _hasLeftChild(parentIndex) {
      const leftChildIndex = (parentIndex * 2) + 1;
      return leftChildIndex < this.size();
    }
  
    /**
     * Checks if a parent has a right child
     * @private
     */
    _hasRightChild(parentIndex) {
      const rightChildIndex = (parentIndex * 2) + 2;
      return rightChildIndex < this.size();
    }
  
    /**
     * Compares two nodes
     * @private
     */
    _compareAt(i, j) {
      return this._compare(this._nodes[i], this._nodes[j]);
    }
  
    /**
     * Swaps two nodes in the heap
     * @private
     */
    _swap(i, j) {
      const temp = this._nodes[i];
      this._nodes[i] = this._nodes[j];
      this._nodes[j] = temp;
    }
  
    /**
     * Checks if parent and child should be swapped
     * @private
     */
    _shouldSwap(parentIndex, childIndex) {
      if (parentIndex < 0 || parentIndex >= this.size()) {
        return false;
      }
  
      if (childIndex < 0 || childIndex >= this.size()) {
        return false;
      }
  
      return this._compareAt(parentIndex, childIndex) > 0;
    }
  
    /**
     * Compares children of a parent
     * @private
     */
    _compareChildrenOf(parentIndex) {
      if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) {
        return -1;
      }
  
      const leftChildIndex = (parentIndex * 2) + 1;
      const rightChildIndex = (parentIndex * 2) + 2;
  
      if (!this._hasLeftChild(parentIndex)) {
        return rightChildIndex;
      }
  
      if (!this._hasRightChild(parentIndex)) {
        return leftChildIndex;
      }
  
      const compare = this._compareAt(leftChildIndex, rightChildIndex);
      return compare > 0 ? rightChildIndex : leftChildIndex;
    }
  
    /**
     * Compares two children before a position
     * @private
     */
    _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
      const compare = this._compareAt(rightChildIndex, leftChildIndex);
  
      if (compare <= 0 && rightChildIndex < index) {
        return rightChildIndex;
      }
  
      return leftChildIndex;
    }
  
    /**
     * Recursively bubbles up a node if it's in a wrong position
     * @private
     */
    _heapifyUp(startIndex) {
      let childIndex = startIndex;
      let parentIndex = Math.floor((childIndex - 1) / 2);
  
      while (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      }
    }
  
    /**
     * Recursively bubbles down a node if it's in a wrong position
     * @private
     */
    _heapifyDown(startIndex) {
      let parentIndex = startIndex;
      let childIndex = this._compareChildrenOf(parentIndex);
  
      while (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
        parentIndex = childIndex;
        childIndex = this._compareChildrenOf(parentIndex);
      }
    }
  
    /**
     * Recursively bubbles down a node before a given index
     * @private
     */
    _heapifyDownUntil(index) {
      let parentIndex = 0;
      let leftChildIndex = 1;
      let rightChildIndex = 2;
      let childIndex;
  
      while (leftChildIndex < index) {
        childIndex = this._compareChildrenBefore(
          index,
          leftChildIndex,
          rightChildIndex
        );
  
        if (this._shouldSwap(parentIndex, childIndex)) {
          this._swap(parentIndex, childIndex);
        }
  
        parentIndex = childIndex;
        leftChildIndex = (parentIndex * 2) + 1;
        rightChildIndex = (parentIndex * 2) + 2;
      }
    }
  
    /**
     * Inserts a new value into the heap
     * @public
     * @param {number|string|object} value
     * @returns {Heap}
     */
    insert(value) {
      this._nodes.push(value);
      this._heapifyUp(this.size() - 1);
      if (this._leaf === null || this._compare(value, this._leaf) > 0) {
        this._leaf = value;
      }
      return this;
    }
  
    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    extractRoot() {
      if (this.isEmpty()) {
        return null;
      }
  
      const root = this.root();
      this._nodes[0] = this._nodes[this.size() - 1];
      this._nodes.pop();
      this._heapifyDown(0);
  
      if (root === this._leaf) {
        this._leaf = this.root();
      }
  
      return root;
    }
  
    /**
     * Applies heap sort and return the values sorted by priority
     * @public
     * @returns {array}
     */
    sort() {
      for (let i = this.size() - 1; i > 0; i -= 1) {
        this._swap(0, i);
        this._heapifyDownUntil(i);
      }
      return this._nodes;
    }
  
    /**
     * Fixes node positions in the heap
     * @public
     * @returns {Heap}
     */
    fix() {
      for (let i = 0; i < this.size(); i += 1) {
        this._heapifyUp(i);
      }
      return this;
    }
  
    /**
     * Verifies that all heap nodes are in the right position
     * @public
     * @returns {boolean}
     */
    isValid() {
      const isValidRecursive = (parentIndex) => {
        let isValidLeft = true;
        let isValidRight = true;
  
        if (this._hasLeftChild(parentIndex)) {
          const leftChildIndex = (parentIndex * 2) + 1;
          if (this._compareAt(parentIndex, leftChildIndex) > 0) {
            return false;
          }
          isValidLeft = isValidRecursive(leftChildIndex);
        }
  
        if (this._hasRightChild(parentIndex)) {
          const rightChildIndex = (parentIndex * 2) + 2;
          if (this._compareAt(parentIndex, rightChildIndex) > 0) {
            return false;
          }
          isValidRight = isValidRecursive(rightChildIndex);
        }
  
        return isValidLeft && isValidRight;
      };
  
      return isValidRecursive(0);
    }
  
    /**
     * Returns a shallow copy of the heap
     * @public
     * @returns {Heap}
     */
    clone() {
      return new Heap(this._compare, this._nodes.slice(), this._leaf);
    }
  
    /**
     * Returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    root() {
      if (this.isEmpty()) {
        return null;
      }
  
      return this._nodes[0];
    }
  
    /**
     * Returns a leaf node in the heap
     * @public
     * @returns {number|string|object}
     */
    leaf() {
      return this._leaf;
    }
  
    /**
     * Returns the number of nodes in the heap
     * @public
     * @returns {number}
     */
    size() {
      return this._nodes.length;
    }
  
    /**
     * Checks if the heap is empty
     * @public
     * @returns {boolean}
     */
    isEmpty() {
      return this.size() === 0;
    }
  
    /**
     * Clears the heap
     * @public
     */
    clear() {
      this._nodes = [];
      this._leaf = null;
    }
  
    /**
     * Builds a heap from a array of values
     * @public
     * @static
     * @param {array} values
     * @param {function} compare
     * @returns {Heap}
     */
    static heapify(values, compare) {
      if (!Array.isArray(values)) {
        throw new Error('Heap.heapify expects an array of values');
      }
  
      if (typeof compare !== 'function') {
        throw new Error('Heap.heapify expects a compare function');
      }
  
      return new Heap(compare, values).fix();
    }
  
    /**
     * Checks if a list of values is a valid heap
     * @public
     * @static
     * @param {array} values
     * @param {function} compare
     * @returns {boolean}
     */
    static isHeapified(values, compare) {
      return new Heap(compare, values).isValid();
    }
  }

 const { Heap } = require('@datastructures-js/heap');

 /**
  * @class PriorityQueue
  */
 class PriorityQueue {
   /**
    * Creates a priority queue
    * @params {function} compare
    */
   constructor(compare, _values) {
     if (typeof compare !== 'function') {
       throw new Error('PriorityQueue constructor expects a compare function');
     }
     this._heap = new Heap(compare, _values);
     if (_values) {
       this._heap.fix();
     }
   }
 
   /**
    * Returns an element with highest priority in the queue
    * @public
    * @returns {number|string|object}
    */
   front() {
     return this._heap.root();
   }
 
   /**
    * Returns an element with lowest priority in the queue
    * @public
    * @returns {number|string|object}
    */
   back() {
     return this._heap.leaf();
   }
 
   /**
    * Adds a value to the queue
    * @public
    * @param {number|string|object} value
    * @returns {PriorityQueue}
    */
   enqueue(value) {
     return this._heap.insert(value);
   }
 
   /**
    * Removes and returns an element with highest priority in the queue
    * @public
    * @returns {number|string|object}
    */
   dequeue() {
     return this._heap.extractRoot();
   }
 
   /**
    * Returns the number of elements in the queue
    * @public
    * @returns {number}
    */
   size() {
     return this._heap.size();
   }
 
   /**
    * Checks if the queue is empty
    * @public
    * @returns {boolean}
    */
   isEmpty() {
     return this._heap.isEmpty();
   }
 
   /**
    * Clears the queue
    * @public
    */
   clear() {
     this._heap.clear();
   }
 
   /**
    * Returns a sorted list of elements from highest to lowest priority
    * @public
    * @returns {array}
    */
   toArray() {
     return this._heap.clone().sort().reverse();
   }
 
   /**
    * Creates a priority queue from an existing array
    * @public
    * @static
    * @returns {PriorityQueue}
    */
   static fromArray(values, compare) {
     return new PriorityQueue(compare, values);
   }
 }
 
 exports.PriorityQueue = PriorityQueue;