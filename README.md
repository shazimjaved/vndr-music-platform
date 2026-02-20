# 🎵 VNDR Music Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-yellow?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

> A modern music streaming, licensing, and management platform built with Next.js 15 and Firebase.

## 🚀 Features

- 🎵 **Music Streaming** with adaptive bitrate
- 📤 **Music Upload & Management** system
- 🤖 **AI-Powered Features** (Cover Art, Recommendations)
- 💰 **VSD Token Integration**
- 📄 **Licensing Platform**
- 👥 **Role-Based Access Control**

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS, Radix UI |
| **Backend** | Firebase (Firestore, Auth, Storage, Functions) |
| **AI** | Google Genkit (Vertex AI) |
| **State Management** | Zustand |
| **Deployment** | Firebase Hosting |

## � Project Structure

```
src/
├── app/          # Next.js routes
├── components/   # React components
├── firebase/     # Firebase configuration
├── hooks/        # Custom hooks
├── lib/          # Utilities
├── store/        # State management
└── ai/           # AI flows
```

## � Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20.x
- [npm](https://www.npmjs.com/) 9.x
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shazimjaved/vndr-music-platform.git
   cd vndr-music-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Service Account (for server-side operations)
FIREBASE_SERVICE_ACCOUNT=your_service_account_json_here
```

> 📖 For detailed setup instructions, see [DOCUMENTATION.md](./DOCUMENTATION.md#environment-variables)

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run genkit:dev` | Start AI Genkit server |
| `npm run genkit:watch` | Start AI Genkit server with watch mode |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 🚢 Deployment

### Deploy to Firebase Hosting

```bash
# Deploy to Firebase
firebase deploy --only hosting
```


> 📚 For complete deployment guide, see [DOCUMENTATION.md](./DOCUMENTATION.md)

## � Documentation

- **[� Complete Documentation](./DOCUMENTATION.md)** - Architecture, setup, and deployment
- **[🔧 Configuration Guide](./DOCUMENTATION.md#firebase-configuration)** - Firebase setup
- **[🚀 Deployment Guide](./DOCUMENTATION.md#deployment)** - Step-by-step deployment
- **[🐛 Troubleshooting](./DOCUMENTATION.md#troubleshooting)** - Common issues and solutions

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

## 📄 License

This project is **Private** - All rights reserved.

## 👥 Credits

**🔧 Freelance Developer**
- Fixed deployment errors and optimized the codebase
- Updated documentation and prepared for GitHub deployment

**👑 Original Project Owner**
- Developed the VNDR Music Platform architecture
- Created the core music streaming and licensing features
- Implemented AI-powered features and Firebase integration

---

<div align="center">

**🎵 VNDR Music Platform**

*For complete setup and deployment instructions, please refer to [DOCUMENTATION.md](./DOCUMENTATION.md)*

</div>
