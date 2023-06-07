"use strict";
class Graph {
    graph = new Map();
    isUndirected;
    constructor(isUndirected) {
        this.isUndirected = isUndirected;
    }
    containsVertex(vertex) {
        return this.graph.has(vertex);
    }
    getNeighbours(vertex) {
        return this.containsVertex(vertex) ? this.graph.get(vertex) : [];
    }
    addVertex(vertex) {
        this.graph.set(vertex, []);
    }
    addEdge(vertexFrom, vertexTo) {
        if (this.containsVertex(vertexFrom) &&
            this.containsVertex(vertexTo.nodeName)) {
            if (this.isUndirected) {
                this.getNeighbours(vertexFrom)?.push(vertexTo);
                this.getNeighbours(vertexTo.nodeName)?.push({
                    nodeName: vertexFrom,
                    nodeWeight: vertexTo.nodeWeight,
                });
            }
            else {
                this.getNeighbours(vertexFrom)?.push(vertexTo);
            }
        }
    }
    output(origin, dest, edgeTo) {
        let temp = [];
        temp.unshift(dest);
        let current = edgeTo.get(dest);
        while (current !== origin) {
            temp.unshift(current);
            current = edgeTo.get(current);
        }
        temp.unshift(origin);
        console.log(temp);
    }
    shortestPath(origin, dest) {
        let distTo = new Map();
        for (const [key] of this.graph.entries()) {
            distTo.set(key, Number.MAX_VALUE);
        }
        distTo.set(origin, 0);
        let marked = new Set();
        let queue = [];
        queue.push({ nodeName: origin, nodeWeight: 0 });
        let edgeTo = new Map();
        while (queue[0] !== undefined) {
            let current = queue.shift();
            if (current.nodeName === dest) {
                console.log(current.nodeWeight.toFixed(1) + " Kms");
                this.output(origin, dest, edgeTo);
                break;
            }
            marked.add(current.nodeName);
            this.getNeighbours(current.nodeName)?.forEach((neighbour) => {
                let distanceViaCurrent = current.nodeWeight + neighbour.nodeWeight;
                if (distTo.get(neighbour.nodeName) > distanceViaCurrent) {
                    distTo.set(neighbour.nodeName, distanceViaCurrent);
                    marked.add(neighbour.nodeName);
                    queue.unshift({
                        nodeName: neighbour.nodeName,
                        nodeWeight: distanceViaCurrent,
                    });
                    edgeTo.set(neighbour.nodeName, current.nodeName);
                    queue.sort((a, b) => a.nodeWeight - b.nodeWeight);
                }
            });
        }
        return [];
    }
}
const myGraph = new Graph(true);
myGraph.addVertex("Wyoming");
myGraph.addVertex("Woywoy");
myGraph.addVertex("Umina");
myGraph.addVertex("Point Clare");
myGraph.addVertex("Killcare");
myGraph.addVertex("Sydney");
myGraph.addVertex("Gosford");
myGraph.addVertex("Kincumber");
myGraph.addVertex("Terrigal");
myGraph.addVertex("Erina");
myGraph.addVertex("Greenpoint");
myGraph.addVertex("Kariong");
myGraph.addEdge("Wyoming", { nodeName: "Erina", nodeWeight: 8.5 });
myGraph.addEdge("Wyoming", { nodeName: "Gosford", nodeWeight: 2.9 });
myGraph.addEdge("Gosford", { nodeName: "Erina", nodeWeight: 5.9 });
myGraph.addEdge("Gosford", { nodeName: "Point Clare", nodeWeight: 4.4 });
myGraph.addEdge("Gosford", { nodeName: "Kariong", nodeWeight: 5.8 });
myGraph.addEdge("Gosford", { nodeName: "Greenpoint", nodeWeight: 5.1 });
myGraph.addEdge("Point Clare", { nodeName: "Woywoy", nodeWeight: 6.7 });
myGraph.addEdge("Woywoy", { nodeName: "Umina", nodeWeight: 5.4 });
myGraph.addEdge("Woywoy", { nodeName: "Kariong", nodeWeight: 12.8 });
myGraph.addEdge("Woywoy", { nodeName: "Killcare", nodeWeight: 11.2 });
myGraph.addEdge("Woywoy", { nodeName: "Kincumber", nodeWeight: 14.8 });
myGraph.addEdge("Woywoy", { nodeName: "Terrigal", nodeWeight: 20.8 });
myGraph.addEdge("Umina", { nodeName: "Killcare", nodeWeight: 12.8 });
myGraph.addEdge("Umina", { nodeName: "Kincumber", nodeWeight: 16.4 });
myGraph.addEdge("Umina", { nodeName: "Terrigal", nodeWeight: 22.3 });
myGraph.addEdge("Killcare", { nodeName: "Kincumber", nodeWeight: 9.7 });
myGraph.addEdge("Killcare", { nodeName: "Terrigal", nodeWeight: 15.7 });
myGraph.addEdge("Erina", { nodeName: "Terrigal", nodeWeight: 5.8 });
myGraph.addEdge("Erina", { nodeName: "Greenpoint", nodeWeight: 2.6 });
myGraph.addEdge("Greenpoint", { nodeName: "Kincumber", nodeWeight: 5.9 });
myGraph.addEdge("Kincumber", { nodeName: "Terrigal", nodeWeight: 7.0 });
myGraph.addEdge("Kariong", { nodeName: "Sydney", nodeWeight: 75.2 });
myGraph.shortestPath("Kincumber", "Sydney");
