// File: Graph.ts

import { Vertex } from './Vertex';
import { Edge } from './Edge';

class VertexNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VertexNotFoundException';
    }
}

class DuplicateVertexException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateVertexException';
    }
}

export class Graph {
    private vertices: Map<any, Vertex>;
    private adjacencyList: Map<any, Edge[]>;
    private directed: boolean;

    constructor(directed: boolean = false) {
        this.vertices = new Map();
        this.adjacencyList = new Map();
        this.directed = directed;
    }

    addVertex(vertex: Vertex): void {
        if (this.vertices.has(vertex.getId())) {
            throw new DuplicateVertexException(`Vertex with id ${vertex.getId()} already exists`);
        }

        this.vertices.set(vertex.getId(), vertex);
        this.adjacencyList.set(vertex.getId(), []);
    }

    addEdge(edge: Edge): void {
        const sourceId = edge.getSource().getId();
        const targetId = edge.getTarget().getId();

        if (!this.vertices.has(sourceId) || !this.vertices.has(targetId)) {
            throw new VertexNotFoundException('Both source and target vertices must exist in the graph');
        }

        this.adjacencyList.get(sourceId)!.push(edge);
        
        if (!this.directed) {
            // For undirected graphs, add the edge in both directions
            const reverseEdge = new Edge(
                edge.getTarget(),
                edge.getSource(),
                edge.getType(),
                edge.getData()
            );
            this.adjacencyList.get(targetId)!.push(reverseEdge);
        }
    }

    getNeighbors(vertexId: any): Edge[] {
        if (!this.vertices.has(vertexId)) {
            throw new VertexNotFoundException(`Vertex with id ${vertexId} not found`);
        }

        return this.adjacencyList.get(vertexId)!;
    }

    hasVertex(vertexId: any): boolean {
        return this.vertices.has(vertexId);
    }

    getVertex(vertexId: any): Vertex | null {
        return this.vertices.get(vertexId) || null;
    }
}
