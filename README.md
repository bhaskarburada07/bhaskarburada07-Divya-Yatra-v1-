# Divya Yatra 🪔
> **The Unified Pilgrimage & Sacred Darshan Super-App**

Divya Yatra is a modern, high-craft digital pilgrimage companion designed to streamline sacred journeys across India's holiest temples. From verified Darshan token booking and VIP sevas to optional inter-city travel (Train, Bus, Flight), accommodation, and real-time AI pilgrimage assistance with Gemini, Divya Yatra provides devotees with a seamless, stress-free spiritual experience.

---

## ✨ Key Features

- 🏛️ **Sacred Temple Directory & Search**: Comprehensive guides, darshan timings, dress codes, live crowd meters, and cultural insights for major shrines (Tirumala Tirupati, Kashi Vishwanath, Vaishno Devi, Somnath, Jagannath Puri, Meenakshi Temple, and more).
- 🎫 **Seamless Darshan Booking & E-Passes**: Select pilgrimage dates, customized darshan slots (Special Entry, VIP Seva, Suprabhatam), add devotee details with Sankalpam/Gotra, and instantly generate digital QR passes.
- 🚆 **Optional Pilgrimage Travel Booking**: Smart, non-intrusive prompt after darshan confirmation to book Trains (IRCTC-style), Buses, or Flights directly matched to the pilgrimage schedule.
- 🏨 **Sacred Stays & Dharamshalas**: Verified accommodation near temple premises with devotee amenities (Satvik food, temple shuttle, hot water).
- 🤖 **Divya AI Spiritual Assistant**: Server-side Google Gemini integration for astrological recommendations, festive rituals, auspicious muhurats, and personalized temple itineraries.
- 💼 **Divya Wallet & Rewards**: Earn and redeem Divya Coins on every booking.
- 📜 **Pilgrim Profile & History**: Manage upcoming and completed yatras, saved shrines, Aadhaar verification records, and transaction receipts.
- 🌓 **Daylight & Night Mode**: Clean, accessible saffron-accented aesthetic with dark mode support for night-time contemplation.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion (Framer Motion)
- **Backend / Server**: Express.js with Vite Middleware, `@google/genai` (Gemini API)
- **Bundler & Build Tool**: Vite, ESBuild, TSX

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn / bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhaskarburada07/Divya-Yatra-v1-.git
   cd Divya-Yatra-v1-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and set your API keys if needed:
   ```bash
   cp .env.example .env
   ```
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable UI & layout components (Header, Nav, etc.)
│   ├── context/         # AppContext & global state management
│   ├── data/            # Mock dataset for temples, travel, stays, rituals
│   ├── screens/         # Application screens (Home, Darshan, Travel, Stays, AI Planner, Profile)
│   ├── types.ts         # TypeScript definitions
│   ├── App.tsx          # Main router & screen coordinator
│   └── main.tsx         # Frontend entry point
├── server.ts            # Fullstack Express server & Gemini API proxy
├── vite.config.ts       # Vite configuration
└── package.json         # Project scripts & dependencies
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
