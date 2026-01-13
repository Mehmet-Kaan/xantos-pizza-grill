import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export interface Review {
  id?: string;
  author: string;
  text: string;
  rating: number; // 1-5 stars
  createdAt: Date | Timestamp;
  approved?: boolean; // For moderation
}

// Get all approved reviews, ordered by date (newest first)
export async function getAllReviews(limitCount?: number, includeUnapproved: boolean = false): Promise<Review[]> {
  try {
    let q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );
    
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt;
      
      return {
        id: doc.id,
        ...data,
        createdAt: createdAt?.toDate ? createdAt.toDate() : new Date(createdAt),
      } as Review;
    });
    
    // Filter to only show approved reviews unless includeUnapproved is true
    if (includeUnapproved) {
      return reviews;
    }
    return reviews.filter((review) => review.approved !== false);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

// Create a new review
export async function createReview(reviewData: Omit<Review, "id" | "createdAt">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...reviewData,
      createdAt: Timestamp.now(),
      approved: false, // New reviews need approval by default
    });
    await updateReviewsMetadata();
    return docRef.id;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

// Update a review
export async function updateReview(reviewId: string, reviewData: Partial<Review>): Promise<void> {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, reviewData);
    await updateReviewsMetadata();
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

// Get reviews metadata (lastUpdated timestamp)
export async function getReviewsMetadata(): Promise<Date | null> {
  try {
    const metadataRef = doc(db, "metadata", "reviews");
    const metadataSnap = await getDoc(metadataRef);
    
    if (metadataSnap.exists()) {
      const data = metadataSnap.data();
      const lastUpdated = data.lastUpdated;
      if (lastUpdated) {
        // Convert Firestore Timestamp to Date
        if (lastUpdated.toDate) {
          return lastUpdated.toDate();
        }
        return new Date(lastUpdated);
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching reviews metadata:", error);
    return null;
  }
}

// Update reviews metadata (called when reviews are created/updated)
export async function updateReviewsMetadata(): Promise<void> {
  try {
    const metadataRef = doc(db, "metadata", "reviews");
    await setDoc(metadataRef, {
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating reviews metadata:", error);
  }
}



export const REVIEWS = [
  {
    id: 1,
    name: "Anna L.",
    rating: 5,
    text: "Virkelig lækker pizza. Sprød bund og masser af fyld. Bestiller helt sikkert igen.",
  },
  {
    id: 2,
    name: "Johan S.",
    rating: 5,
    text: "Hurtig levering og stadig varm mad. Meget bedre end de store kæder.",
  },
  {
    id: 3,
    name: "Maria K.",
    rating: 4,
    text: "Rigtig gode grillretter. Især ribsene var super møre.",
  },
  {
    id: 4,
    name: "Emil T.",
    rating: 5,
    text: "Bedste pepperoni pizza i området. God størrelse og god smag.",
  },
  {
    id: 5,
    name: "Sofia N.",
    rating: 4,
    text: "Nem online bestilling og klar til afhentning til tiden.",
  },
  {
    id: 6,
    name: "Mikkel B.",
    rating: 5,
    text: "Mega lækker kebab og pommes. Portionerne er store.",
  },
  {
    id: 7,
    name: "Laura P.",
    rating: 5,
    text: "Vi bestilte til hele familien, og alt var varmt og frisk.",
  },
  {
    id: 8,
    name: "Daniel R.",
    rating: 4,
    text: "God kvalitet for pengene. Kommer igen.",
  },
  {
    id: 9,
    name: "Camilla H.",
    rating: 5,
    text: "Virkelig venlig betjening og god mad. Kan klart anbefales.",
  },
  {
    id: 10,
    name: "Anders M.",
    rating: 5,
    text: "Min go-to pizzabar. Aldrig skuffet.",
  },
];

export async function initializeReviews() {
  try {
    console.log("Initializing reviews in Firebase...");
    
    for (const review of REVIEWS) {
      await createReview({
        author: review.name,
        text: review.text,
        rating: review.rating,
        approved: true,
      });
      console.log(`Created review: ${review.name}`);
    }
    
    console.log("All reviews initialized successfully!");
  } catch (error) {
    console.error("Error initializing reviews:", error);
    throw error;
  }
}