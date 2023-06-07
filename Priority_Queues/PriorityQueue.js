"use strict";
class PriorityQueue {
    heap_;
    size_;
    top_ = 0;
    comparator_;
    constructor(comparator_ = (a, b) => a > b) {
        this.heap_ = new Array();
        this.size_ = 0;
        this.comparator_ = comparator_;
    }
    insert(val) {
        this.heap_.push(val);
        ++this.size_;
        this.swim();
    }
    pop() {
        this.swap(this.top_, --this.size_);
        this.heap_.pop();
        this.sink();
    }
    size() {
        return this.size_;
    }
    isEmpty() {
        return this.size() === 0;
    }
    peek() {
        return this.heap_[this.top_];
    }
    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    leftChild(i) {
        return Math.floor(i * 2 + 1);
    }
    rightChild(i) {
        return Math.floor(i * 2 + 2);
    }
    swim() {
        let c = this.size_ - 1;
        let p = this.parent(c);
        while (p >= 0 && this.greater(p, c)) {
            this.swap(c, p);
            c = p;
            p = this.parent(c);
        }
    }
    sink() {
        for (let current = 0; this.leftChild(current) <= this.size_;) {
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
    greater(i, j) {
        return this.comparator_(this.heap_[i], this.heap_[j]);
    }
    swap(i, j) {
        [this.heap_[i], this.heap_[j]] = [this.heap_[j], this.heap_[i]];
    }
}
let pq = new PriorityQueue((a, b) => a.age < b.age);
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
