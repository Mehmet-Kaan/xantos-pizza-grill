# Firebase Setup Guide

## 1. Install Firebase Dependencies

Run the following command in your terminal:

```bash
npm install firebase
```

## 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard
4. Enable **Firestore Database** (choose "Start in test mode" for development)

## 3. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Copy your Firebase configuration object

## 4. Set Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Or update `src/config/firebase.ts` directly with your config values.

## 5. Set Up Firestore Security Rules

In Firebase Console, go to Firestore Database > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to orders
    match /orders/{orderId} {
      allow read, write: if true; // For development - restrict in production!
    }
    
    // Allow read access to products, write only for admins
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // For development - restrict in production!
    }
  }
}
```

**⚠️ Important:** These rules allow public read/write. For production, implement proper authentication and authorization!

## 6. Initialize Products (Optional)

If you want to populate products from your Menu component, you can create a temporary component or run this in the browser console:

```typescript
import { initializeProducts } from "./src/utils/initProducts";
await initializeProducts();
```

Or create a one-time admin page to initialize products.

## 7. Firestore Collections Structure

### Orders Collection
```
orders/
  {orderId}/
    - items: Array
    - total: number
    - name: string
    - phone: string
    - address: string | null
    - method: "pickup" | "delivery"
    - note: string
    - paymentMethod: "card" | "mobilepay" | "cash"
    - paymentStatus: "paid" | "pending"
    - status: "pending" | "paid" | "making" | "ready" | "collected"
    - createdAt: Timestamp
```

### Products Collection
```
products/
  {productId}/
    - category: string
    - name: string
    - desc: string
    - price: number
    - image: string
    - ingredients: Array
```

## 8. Test the Integration

1. Start your dev server: `npm run dev`
2. Place a test order through the checkout
3. Check Firebase Console > Firestore Database to see the order
4. Check Admin page to see orders loaded from Firebase

## Troubleshooting

- **"Firebase: Error (auth/unauthorized)"**: Check your API key and project ID
- **"Permission denied"**: Update Firestore security rules
- **Products not loading**: Make sure you've initialized products in Firestore
- **Orders not saving**: Check browser console for errors and verify Firestore rules
