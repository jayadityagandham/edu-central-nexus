
import { Resource } from "@/pages/Resources";

// Mock initial data
const initialResources: Resource[] = [
  {
    id: 1,
    title: "Introduction to Quantum Mechanics",
    type: "book",
    author: "David J. Griffiths",
    year: 2004,
    topic: "Physics",
    url: "https://example.com/quantum-mechanics",
    downloadCount: 123,
    citationCount: 45,
    description: "A comprehensive introduction to quantum mechanics, covering the Schrodinger equation, angular momentum, and perturbation theory."
  },
  {
    id: 2,
    title: "Deep Learning with Python",
    type: "research",
    author: "François Chollet",
    year: 2017,
    topic: "Computer Science",
    url: "https://example.com/deep-learning-python",
    downloadCount: 456,
    citationCount: 78,
    description: "A practical guide to deep learning, covering convolutional neural networks, recurrent neural networks, and autoencoders."
  },
  // ... 8 more resources from the initial data
];

// LocalStorage key
const STORAGE_KEY = 'educentral_resources';

/**
 * Resource Service - Handles CRUD operations for resources
 * Currently uses localStorage but can be adapted for Firebase
 */
export class ResourceService {
  /**
   * Get all resources
   */
  static async getResources(): Promise<Resource[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Try to get resources from localStorage
      const storedResources = localStorage.getItem(STORAGE_KEY);
      
      if (storedResources) {
        return JSON.parse(storedResources);
      } else {
        // First time: Initialize with mock data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialResources));
        return initialResources;
      }
    } catch (error) {
      console.error("Error retrieving resources:", error);
      return initialResources;
    }
  }

  /**
   * Add a new resource
   */
  static async addResource(resource: Resource): Promise<Resource> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const resources = await this.getResources();
      
      // Generate new ID
      const newId = resources.length > 0 
        ? Math.max(...resources.map(r => r.id)) + 1 
        : 1;
      
      // Create new resource with ID
      const newResource = {
        ...resource,
        id: newId,
        downloadCount: 0,
        citationCount: 0
      };
      
      // Add to collection
      const updatedResources = [...resources, newResource];
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResources));
      
      return newResource;
    } catch (error) {
      console.error("Error adding resource:", error);
      throw new Error("Failed to add resource");
    }
  }

  /**
   * Update an existing resource
   */
  static async updateResource(updatedResource: Resource): Promise<Resource> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const resources = await this.getResources();
      const index = resources.findIndex(r => r.id === updatedResource.id);
      
      if (index === -1) {
        throw new Error("Resource not found");
      }
      
      // Update resource
      resources[index] = updatedResource;
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
      
      return updatedResource;
    } catch (error) {
      console.error("Error updating resource:", error);
      throw new Error("Failed to update resource");
    }
  }

  /**
   * Delete a resource
   */
  static async deleteResource(id: number): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const resources = await this.getResources();
      const updatedResources = resources.filter(r => r.id !== id);
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResources));
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw new Error("Failed to delete resource");
    }
  }
}
