// Custom error class for invalid arguments
class InvalidArgumentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidArgumentException';
        Object.setPrototypeOf(this, InvalidArgumentException.prototype);
    }
}

// Type definition for vertex ID - can be any primitive or object
type VertexId = string | number | object;

// Type definition for vertex data - can be any type or null
type VertexData = any | null;

class Vertex {
    private readonly id: VertexId;
    private data: VertexData;

    /**
     * Creates a new Vertex instance
     * @param id The unique identifier for the vertex
     * @param data Optional payload data
     * @throws {InvalidArgumentException} If id is null or undefined
     */
    constructor(id: VertexId, data: VertexData = null) {
        if (id === null || id === undefined) {
            throw new InvalidArgumentException('Vertex ID cannot be null or undefined');
        }
        this.id = id;
        this.data = data;
    }

    /**
     * Returns the stored data payload
     * @returns The data associated with this vertex
     */
    getData(): VertexData {
        return this.data;
    }

    /**
     * Returns the vertex ID
     * @returns The unique identifier of this vertex
     */
    getId(): VertexId {
        return this.id;
    }

    /**
     * Sets new data for the vertex
     * @param data The new data to store
     */
    setData(data: VertexData): void {
        this.data = data;
    }

    /**
     * Checks if two vertices are equal based on their IDs
     * @param other Another vertex to compare with
     * @returns true if the vertices have the same ID, false otherwise
     */
    equals(other: Vertex): boolean {
        if (!(other instanceof Vertex)) {
            return false;
        }
        
        if (typeof this.id === 'object' && typeof other.id === 'object') {
            return JSON.stringify(this.id) === JSON.stringify(other.id);
        }
        
        return this.id === other.id;
    }
}

// Example usage
try {
    // Create vertices with different types of IDs
    const v1 = new Vertex(1);                     // Numeric ID
    const v2 = new Vertex("user_123");            // String ID
    const v3 = new Vertex({x: 0, y: 0});          // Object as ID
    const v4 = new Vertex("D", {color: "red"});   // With additional data

    // Access vertex properties
    console.log(v1.getId());      // Output: 1
    console.log(v4.getData());    // Output: {color: "red"}

    // Test equality
    const v5 = new Vertex(1);
    console.log(v1.equals(v5));   // Output: true

    // This will throw an error
    const v_invalid = new Vertex(null);  // Throws InvalidArgumentException
} catch (error) {
    if (error instanceof InvalidArgumentException) {
        console.error('Invalid argument:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}

export default Vertex;
