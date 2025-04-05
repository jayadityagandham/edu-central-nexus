
/**
 * Firebase Resource Service
 * 
 * IMPORTANT: This is a template only - to use this service:
 * 1. Install Firebase: npm install firebase
 * 2. Set up a Firebase project and get your config
 * 3. Initialize Firebase in your app
 * 4. Uncomment and use this code
 */

/*
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { Resource } from '@/pages/Resources';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const resourcesCollection = collection(db, 'resources');

export class FirebaseResourceService {
  /**
   * Get all resources from Firestore
   */
  static async getResources(): Promise<Resource[]> {
    try {
      const q = query(resourcesCollection, orderBy('title'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Resource;
      });
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error;
    }
  }

  /**
   * Add a new resource to Firestore
   */
  static async addResource(resource: Omit<Resource, 'id'>): Promise<Resource> {
    try {
      const docRef = await addDoc(resourcesCollection, {
        ...resource,
        downloadCount: 0,
        citationCount: 0,
        createdAt: new Date()
      });
      
      return {
        ...resource,
        id: docRef.id,
        downloadCount: 0,
        citationCount: 0
      } as Resource;
    } catch (error) {
      console.error("Error adding resource:", error);
      throw error;
    }
  }

  /**
   * Update an existing resource
   */
  static async updateResource(resource: Resource): Promise<void> {
    try {
      const docRef = doc(db, 'resources', resource.id.toString());
      await updateDoc(docRef, {
        ...resource,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
  }

  /**
   * Delete a resource
   */
  static async deleteResource(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'resources', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  }
}
*/
