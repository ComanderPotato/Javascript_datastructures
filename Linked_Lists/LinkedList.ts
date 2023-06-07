namespace std {
  export class ListNode<T> {
    private val: T;
    private next: ListNode<T> | null;
    private prev: ListNode<T> | null;
    constructor(val: T) {
      this.val = val;
      this.next = null;
      this.prev = null;
    }

    public setNext(node: ListNode<T> | null): void {
      this.next = node;
    }
    public setPrev(node: ListNode<T> | null): void {
      this.prev = node;
    }
    public getValue(): T {
      return this.val;
    }
    public getNext(): ListNode<T> | null {
      return this.next;
    }
    public getPrev(): ListNode<T> | null {
      return this.prev;
    }
  }
  export class LinkedList<T> {
    private size_: number;
    head_: ListNode<T> | null;
    private tail_: ListNode<T> | null;
    private isDouble: boolean;
    constructor(isDouble: boolean, initialiserList: T[] = []) {
      this.isDouble = isDouble;
      this.size_ = 0;
      this.head_ = null;
      this.tail_ = null;
      if (initialiserList.length !== 0) {
        for (let node of initialiserList) {
          this.append(node);
        }
      }
    }

    public append(val: T): void {
      ++this.size_;
      let newNode: ListNode<T> = new ListNode(val);
      if (this.head_ === null && this.tail_ === null) {
        this.head_ = newNode;
        this.tail_ = newNode;
      } else {
        this.tail_!.setNext(newNode);
        if (this.isDouble) {
          newNode.setPrev(this.tail_!);
        }
        this.tail_ = newNode;
      }
    }
    public prepend(val: T): void {
      ++this.size_;
      let newNode: ListNode<T> = new ListNode(val);
      if (this.head_ === null && this.tail_ === null) {
        this.head_ = newNode;
        this.tail_ = newNode;
      } else {
        newNode.setNext(this.head_!);
        if (this.isDouble) {
          this.head_!.setPrev(newNode);
        }
        this.head_ = newNode;
      }
    }
    public size(): number {
      return this.size_;
    }
    public isEmpty(): boolean {
      return this.size_ === 0;
    }

    public toArray(): T[] {
      let temp = new Array(this.size_);
      let curr: ListNode<T> | null = this.head_;
      let index = 0;
      while (curr !== null) {
        // temp.push(curr.getValue());
        temp[index++] = curr.getValue();
        curr = curr.getNext();
      }
      return temp;
    }

    public reverseTraverse(): T[] {
      if (this.isDouble) {
        let temp = [];
        let curr: ListNode<T> | null = this.tail_;

        while (curr !== null) {
          temp.push(curr.getValue());
          curr = curr.getPrev();
        }
        return temp;
      }
      return [];
    }
    public insert(val: T, index: number) {
      if (this.size_ === index) {
        this.append(val);
      } else if (index === 1) {
        this.prepend(val);
      } else {
        let newNode: ListNode<T> = new ListNode(val);
        let currIndex = 1;
        let curr: ListNode<T> | null = this.head_;
        while (currIndex < index - 1) {
          curr = curr!.getNext();
          currIndex++;
        }
        let next = curr!.getNext();
        if (this.isDouble) {
          newNode.setPrev(curr);
          next!.setPrev(newNode);
        }
        newNode.setNext(next);
        curr!.setNext(newNode);
      }
    }

    public clear(): void {
      let temp = this.head_;
    }
  }
}

const list = new std.LinkedList<number>(false, [1, 2, 3, 4, 5, 6]);

list.append(10);

const listAsArray = list.toArray();
console.log(list.isEmpty());
