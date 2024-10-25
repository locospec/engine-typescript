// File: Edge.ts

import { Vertex } from './Vertex';  // Assuming Vertex class is in separate file

class InvalidArgumentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidArgumentException';
        Object.setPrototypeOf(this, InvalidArgumentException.prototype);
    }
}

export class Edge {
    private readonly source: Vertex;
    private readonly target: Vertex;
    private readonly type: string | null;
    private data: any | null;

    /**
     * Creates a new Edge instance
     * @param source The source vertex
     * @param target The target vertex
     * @param type Optional type of the edge
     * @param data Optional payload data
     * @throws {InvalidArgumentException} If source or target is invalid, or if type is provided but not a string
     */
    constructor(
        source: Vertex,
        target: Vertex,
        type: string | null = null,
        data: any = null
    ) {
        if (!source || !(source instanceof Vertex)) {
            throw new InvalidArgumentException('Source must be a valid Vertex instance');
        }
        if (!target || !(target instanceof Vertex)) {
            throw new InvalidArgumentException('Target must be a valid Vertex instance');
        }
        if (type !== null && typeof type !== 'string') {
            throw new InvalidArgumentException('Type, if provided, must be a string');
        }

        this.source = source;
        this.target = target;
        this.type = type;
        this.data = data;
    }

    /**
     * Returns the source vertex
     */
    getSource(): Vertex {
        return this.source;
    }

    /**
     * Returns the target vertex
     */
    getTarget(): Vertex {
        return this.target;
    }

    /**
     * Returns the edge type
     */
    getType(): string | null {
        return this.type;
    }

    /**
     * Returns the edge data
     */
    getData(): any | null {
        return this.data;
    }

    /**
     * Sets new data for the edge
     */
    setData(data: any): void {
        this.data = data;
    }
}
