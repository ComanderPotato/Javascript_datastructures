class PriorityQueue<T> {
  public heap_;
  private size_;
  private top_ = 0;
  private comparator_;

  constructor(comparator_ = (a: T, b: T) => a > b) {
    this.heap_ = new Array<T>();
    this.size_ = 0;
    this.comparator_ = comparator_;
  }

  public insert(val: T): void {
    this.heap_.push(val);
    ++this.size_;
    this.swim();
  }
  public pop(): void {
    this.swap(this.top_, --this.size_);
    this.heap_.pop();
    this.sink();
  }
  public size(): number {
    return this.size_;
  }
  public isEmpty(): boolean {
    return this.size() === 0;
  }
  public peek(): T {
    return this.heap_[this.top_];
  }
  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }
  private leftChild(i: number): number {
    return Math.floor(i * 2 + 1);
  }
  private rightChild(i: number): number {
    return Math.floor(i * 2 + 2);
  }
  private swim(): void {
    let c = this.size_ - 1;
    let p = this.parent(c);
    while (p >= 0 && this.greater(p, c)) {
      this.swap(c, p);
      c = p;
      p = this.parent(c);
    }
  }
  private sink(): void {
    for (let current = 0; this.leftChild(current) <= this.size_; ) {
      let left = this.leftChild(current);
      let toSwap = left;

      if (left + 1 <= this.size_ && this.greater(left, left + 1)) {
        ++toSwap;
      }

      if (!this.greater(current, toSwap)) {
        return;
      }
      this.swap(current, toSwap);
      current = toSwap;
    }
  }
  private greater(i: number, j: number): boolean {
    return this.comparator_(this.heap_[i], this.heap_[j]);
  }
  private swap(i: number, j: number): void {
    [this.heap_[i], this.heap_[j]] = [this.heap_[j], this.heap_[i]];
  }
}

interface MyNode {
  name: string;
  age: number;
}
let pq = new PriorityQueue<MyNode>((a, b) => a.age < b.age);

pq.insert({ name: "Tom", age: 23 });
pq.insert({ name: "Caity", age: 21 });
pq.insert({ name: "Jess", age: 23 });
pq.insert({ name: "ASD", age: 22 });
pq.insert({ name: "bob", age: 15 });

console.log(pq.peek().name);
console.log(pq.peek().age);
console.log(pq.size());
console.log(pq.heap_);

// function kthLargestElement(array: number[], k: number): number {
//   let queue = new PriorityQueue<number>();

//   for (let i = 0; i < array.length; i++) {
//     queue.insert(array[i]);
//     if (queue.size() > k) {
//       queue.pop();
//     }
//     console.log(queue.heap_);
//   }
//   return queue.peek();
// }
// // [1, 2, 2, 3, 3, 4, 5, 5, 6];
// console.log(kthLargestElement([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// console.log(kthLargestElement([3, 2, 1, 5, 6, 4], 2));
