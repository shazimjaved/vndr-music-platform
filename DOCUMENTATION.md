# VNDR Music - Deployment & Development Documentation

**VNDR Music** is a Next.js 15 web application built for music streaming, licensing, and management. It integrates with Firebase for backend services and includes AI-powered features for music recommendations and cover art generation.

### Tech Stack
- **Frontend Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Backend**: Firebase (Firestore, Authentication, Storage, Functions)
- **AI Integration**: Google Genkit (Vertex AI)
- **Deployment**: Firebase Hosting with Cloud Functions

---

## Architecture & Code Structure

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Firebase Hosting (CDN)                      │
│         Static files + Next.js Framework                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Cloud Function (Next.js SSR)                    │
│    ssrstudio35419903169bdb (us-central1)                │
└─────┬───────────────────────────────┬───────────────────┘
      │                               │
      ▼                               ▼
┌──────────────┐              ┌──────────────┐
│  Firestore   │              │  Firebase   │
│  Database    │              │  Storage    │
└──────────────┘              └──────────────┘
```

### How the Code Works

#### 1. **Routing System (Next.js App Router)**
- Routes are organized in `src/app/` directory
- Route groups: `(auth)`, `(main)`, `(public)` for different layouts
- Dynamic routes: `[userId]` for profile pages
- API routes: `src/app/api/` for server endpoints

#### 2. **Firebase Integration**
- **Client-side**: `src/firebase/` - Firebase client SDK initialization
- **Server-side**: `src/firebase/admin.ts` - Firebase Admin SDK for server actions
- **Authentication**: Firebase Auth with custom claims for admin roles
- **Database**: Firestore for real-time data storage
- **Storage**: Firebase Storage for audio files and images

#### 3. **State Management**
- **Client State**: Zustand stores (`src/store/`)
  - `music-player-store.ts` - Music playback state
  - `web3-store.ts` - Web3 wallet state
- **Server State**: React hooks with Firestore
  - `useDoc` - Single document fetching
  - `useSafeCollection` - Secure collection queries

#### 4. **Server Actions**
- Located in `src/app/actions/`
- `user.ts` - Authentication (signup, login)
- `music.ts` - Music upload, deletion
- `fetch-collection.ts` - Secure Firestore queries
- `vsd-transaction.ts` - VSD token transactions

#### 5. **AI Features**
- **Genkit Integration**: `src/ai/` directory
- AI flows for:
  - Cover art generation
  - Music recommendations
  - Licensing price recommendations
  - Legal document analysis

---

## Prerequisites

Before running or deploying the application, ensure you have:

1. **Node.js**: Version 20.x (recommended) or 18.x
2. **npm**: Version 9.x or higher
3. **Firebase CLI**: `npm install -g firebase-tools`
4. **Google Cloud Account**: With Firebase project access
5. **Git**: For version control

### Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

---

## Local Development Setup

### Step 1: Clone and Install Dependencies

```bash
# Navigate to project directory
cd AUX-main

# Install dependencies
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Service Account JSON as string)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

**Note**: Get these values from Firebase Console → Project Settings → Your apps

### Step 3: Run Development Server

```bash
# Start Next.js development server
npm run dev

# The app will be available at http://localhost:9002
```

### Step 4: Run AI Genkit (Optional)

For AI features, run Genkit in a separate terminal:

```bash
npm run genkit:dev
```

---

## Firebase Configuration

### Firebase Project Setup

1. **Create/Select Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Project ID: `studio-3541990316-9bdb6`

2. **Enable Firebase Services**
   - **Authentication**: Enable Email/Password and Google Sign-In
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable Firebase Storage
   - **Functions**: Enable Cloud Functions (Gen 2)

3. **Firestore Security Rules**
   - Rules are defined in `firestore.rules`
   - Deploy rules: `firebase deploy --only firestore:rules`

### Firebase Connection Flow

#### Client-Side Connection
```typescript
// src/firebase/config.ts
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// src/firebase/index.ts
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
```

#### Server-Side Connection
```typescript
// src/firebase/admin.ts
// Uses FIREBASE_SERVICE_ACCOUNT environment variable
// Initializes Firebase Admin SDK for server actions
```

### Firebase Collections Structure

- **users**: User profiles and VSD balances
- **works**: Music tracks and metadata
- **vsd_transactions**: VSD token transaction history
- **license_requests**: Music licensing requests
- **roles_admin**: Admin role assignments
- **knowledgebase**: AI knowledge base articles

---

## Environment Variables

### Required Environment Variables

#### For Local Development (`.env.local`)
All `NEXT_PUBLIC_*` variables are required for client-side Firebase initialization.

#### For Production (Firebase Console)
Set these in Google Cloud Console → Cloud Run → Environment Variables:

1. **NEXT_PUBLIC_FIREBASE_API_KEY**
   - Value: Your Firebase API key
   - Source: Firebase Console → Project Settings → Your apps

2. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
   - Value: `your-project.firebaseapp.com`

3. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
   - Value: `studio-3541990316-9bdb6`

4. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
   - Value: `your-project.firebasestorage.app`

5. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
   - Value: Your messaging sender ID

6. **NEXT_PUBLIC_FIREBASE_APP_ID**
   - Value: Your Firebase app ID

7. **FIREBASE_SERVICE_ACCOUNT**
   - Value: Service Account JSON (as single-line string)
   - How to get:
     1. Firebase Console → Project Settings → Service accounts
     2. Click "Generate new private key"
     3. Download JSON file
     4. Copy entire JSON content as string

### Setting Environment Variables in Production

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to: Cloud Run → Services → `ssrstudio35419903169bdb`
3. Click "Edit and deploy new revision"
4. Go to "Variables & Secrets" tab
5. Add each environment variable
6. Click "Deploy"

---

## Deployment Guide

### Prerequisites for Deployment

1. Firebase CLI installed and logged in
2. Firebase project access
3. All environment variables set in Google Cloud Console
4. `package-lock.json` committed to repository

### Deployment Steps

#### Step 1: Verify Firebase Project

```bash
# Check current project
firebase use

# Switch to correct project if needed
firebase use studio-3541990316-9bdb6
```

#### Step 2: Build and Deploy

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Or deploy everything
firebase deploy
```

#### Step 3: Verify Deployment

1. Check deployment status in Firebase Console
2. Visit deployed URL: `https://studio-3541990316-9bdb6.web.app`
3. Test all major features

### Deployment Configuration

#### `firebase.json`
```json
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "us-central1"
    }
  }
}
```

#### `next.config.js`
- `output: 'standalone'` - Required for Firebase Hosting
- `images.unoptimized: true` - Disables image optimization for compatibility
- Remote image patterns configured for external image sources

### Post-Deployment Checklist

- [ ] Environment variables set in Cloud Run
- [ ] Function is publicly accessible (Security tab → Allow public access)
- [ ] Firestore rules deployed
- [ ] Images loading correctly
- [ ] Authentication working
- [ ] All routes accessible

---

## Project Structure

```
AUX-main/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   └── login/         # Login page
│   │   ├── (main)/            # Main app routes (protected)
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── admin/         # Admin pages
│   │   │   └── profile/       # User profiles
│   │   ├── (public)/          # Public routes
│   │   ├── api/               # API routes
│   │   └── actions/           # Server actions
│   ├── components/            # React components
│   │   ├── ui/               # UI components (Radix UI)
│   │   ├── layout/           # Layout components
│   │   └── catalog/          # Feature components
│   ├── firebase/             # Firebase configuration
│   │   ├── config.ts         # Client config
│   │   ├── admin.ts          # Admin SDK
│   │   └── provider.tsx      # Firebase context
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── store/                # Zustand stores
│   └── ai/                   # AI/Genkit flows
├── public/                   # Static assets
├── firebase.json             # Firebase configuration
├── firestore.rules           # Firestore security rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

---

## Key Features

### 1. Music Streaming
- Adaptive bitrate streaming
- Offline playback support
- Music player with queue management

### 2. Music Upload & Management
- Upload tracks with metadata
- AI-generated cover art
- Progress tracking

### 3. Licensing Platform
- Create licensing requests
- Track request status
- Artist-requestor communication

### 4. VSD Token Integration
- VSD token transactions
- Daily rewards system
- Wallet balance management

### 5. AI Features
- **Cover Art Generation**: AI-powered cover art suggestions
- **Music Recommendations**: Personalized recommendations
- **Licensing Price Recommendations**: AI-suggested pricing
- **Legal Document Analysis**: AI-powered legal insights

### 6. Role-Based Access
- **Artists**: Upload and manage music
- **Admins**: Full system access
- **Listeners**: Browse and stream music

---

## Troubleshooting

### Common Issues

#### 1. Images Not Loading
**Solution**: 
- Check `next.config.js` has `unoptimized: true`
- Verify remote image patterns include your image domains
- Clear browser cache

#### 2. "Forbidden" Error on Routes
**Solution**:
- Ensure Cloud Function is publicly accessible
- Google Cloud Console → Cloud Run → Security tab
- Select "Allow public access"

#### 3. Environment Variables Not Working
**Solution**:
- Verify variables are set in Cloud Run (not just Firebase Console)
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables

#### 4. Build Failures
**Solution**:
- Ensure `package-lock.json` is committed
- Run `npm install` before deploying
- Check Node.js version (should be 20.x)

#### 5. Firebase Connection Issues
**Solution**:
- Verify all `NEXT_PUBLIC_*` variables are set
- Check Firebase project ID matches
- Ensure Service Account JSON is valid

### Getting Help

1. Check Firebase Console logs
2. Check Google Cloud Console → Cloud Run → Logs
3. Review browser console for client-side errors
4. Check Network tab for failed requests

---

## Additional Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Firebase Hosting with Next.js**: https://firebase.google.com/docs/hosting/frameworks/nextjs
- **Project Console**: https://console.firebase.google.com/project/studio-3541990316-9bdb6

---

## Deployment URLs

- **Production URL**: https://studio-3541990316-9bdb6.web.app
- **Function URL**: https://us-central1-studio-3541990316-9bdb6.cloudfunctions.net/ssrstudio35419903169bdb
- **Firebase Console**: https://console.firebase.google.com/project/studio-3541990316-9bdb6

---

**Last Updated**: November 2025

