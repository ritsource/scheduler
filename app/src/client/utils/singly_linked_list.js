// Data Structures - Singly Linked List

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let prev = current;
    while(current.next) {
      prev = current;
      current = current.next;
    }
    this.tail = new Node(prev.value);
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return undefined;

    const temp = this.head;
    this.head = temp.next;
    
    if (this.length <= 1) this.tail = null;
    if (this.length > 0) this.length--;
    
    return temp;
  }

  unshift(value) {
    if (!value && value !== 0) return undefined;

    if (this.head) {
      const temp = this.head;
      this.head = new Node(value);
      this.head.next = temp;
    } else {
      this.head = new Node(value);
      this.tail = this.head;
    }
    
    this.length++;
    return this;
  }

  get(index) {
    let current = this.head;
    let counter = 0;

    while (current) {
      if (index === counter) return current;
      current = current.next;
      counter++;
    }

    return undefined;
  }

  set(index, value) {
    const prevNode = this.get(index);
    if (prevNode) {
      prevNode.value = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length || !value) return undefined;
    if (this.length === 0) return this.push(value);

    const newNode = new Node(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
      return this;
    }

    const currentNode = this.get(index);
    const prevNode = this.get(index - 1);
    newNode.next = currentNode;
    prevNode.next = newNode;
    this.length++;
    
    return this; 
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;

    if (index === (this.length - 1)) return !!this.pop();
    if (index === 0) return !!this.shift();

    const currentNode = this.get(index);
    const prevNode = this.get(index - 1);
    prevNode.next = currentNode.next;
    this.length--;
    
    return this;

  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next;
    let prev = null;

    for (var i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}
