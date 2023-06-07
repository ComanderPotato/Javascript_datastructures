"use strict";
var std;
(function (std) {
    class ListNode {
        val;
        next;
        prev;
        constructor(val) {
            this.val = val;
            this.next = null;
            this.prev = null;
        }
        setNext(node) {
            this.next = node;
        }
        setPrev(node) {
            this.prev = node;
        }
        getValue() {
            return this.val;
        }
        getNext() {
            return this.next;
        }
        getPrev() {
            return this.prev;
        }
    }
    std.ListNode = ListNode;
    class LinkedList {
        size_;
        head_;
        tail_;
        isDouble;
        constructor(isDouble, initialiserList = []) {
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
        append(val) {
            ++this.size_;
            let newNode = new ListNode(val);
            if (this.head_ === null && this.tail_ === null) {
                this.head_ = newNode;
                this.tail_ = newNode;
            }
            else {
                this.tail_.setNext(newNode);
                if (this.isDouble) {
                    newNode.setPrev(this.tail_);
                }
                this.tail_ = newNode;
            }
        }
        prepend(val) {
            ++this.size_;
            let newNode = new ListNode(val);
            if (this.head_ === null && this.tail_ === null) {
                this.head_ = newNode;
                this.tail_ = newNode;
            }
            else {
                newNode.setNext(this.head_);
                if (this.isDouble) {
                    this.head_.setPrev(newNode);
                }
                this.head_ = newNode;
            }
        }
        size() {
            return this.size_;
        }
        isEmpty() {
            return this.size_ === 0;
        }
        toArray() {
            let temp = new Array(this.size_);
            let curr = this.head_;
            let index = 0;
            while (curr !== null) {
                // temp.push(curr.getValue());
                temp[index++] = curr.getValue();
                curr = curr.getNext();
            }
            return temp;
        }
        reverseTraverse() {
            if (this.isDouble) {
                let temp = [];
                let curr = this.tail_;
                while (curr !== null) {
                    temp.push(curr.getValue());
                    curr = curr.getPrev();
                }
                return temp;
            }
            return [];
        }
        insert(val, index) {
            if (this.size_ === index) {
                this.append(val);
            }
            else if (index === 1) {
                this.prepend(val);
            }
            else {
                let newNode = new ListNode(val);
                let currIndex = 1;
                let curr = this.head_;
                while (currIndex < index - 1) {
                    curr = curr.getNext();
                    currIndex++;
                }
                let next = curr.getNext();
                if (this.isDouble) {
                    newNode.setPrev(curr);
                    next.setPrev(newNode);
                }
                newNode.setNext(next);
                curr.setNext(newNode);
            }
        }
    }
    std.LinkedList = LinkedList;
})(std || (std = {}));
const list = new std.LinkedList(false, [1, 2, 3, 4, 5, 6]);
list.append(10);
const listAsArray = list.toArray();
console.log(list.isEmpty());
