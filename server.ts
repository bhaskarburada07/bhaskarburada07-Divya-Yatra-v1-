import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'DivyaYatra API' });
  });

  // AI Pilgrimage Planner API endpoint using Gemini
  app.post('/api/ai-planner', async (req, res) => {
    try {
      const { prompt, history, userProfile } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return a structured fallback response if no key is provided yet
        return res.json({
          plan: generateFallbackPlan(prompt),
          isFallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are the DivyaYatra Divine Pilgrimage AI Assistant - India's most knowledgeable, respectful, and organized spiritual travel companion.
Your goal is to create deeply thoughtful, practical, and sacred pilgrimage itineraries for devotees across India.
Format your responses with clear day-by-day itineraries, exact temple timings, recommended Sevas, darshan tips (e.g. VIP/Sarva Darshan queues, dress code, laddu/prasadam counters), travel & hotel recommendations, and budget estimates in INR (₹).
Keep tone devotional, serene ("Namaste Devotee / Om Namo Narayanaya"), clear, structured, and easy to read.
Always break down trips into Day 1, Day 2 etc., with Morning, Afternoon, Evening schedule, estimated travel time, and helpful pilgrim tips.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || generateFallbackPlan(prompt);

      return res.json({
        plan: replyText,
        isFallback: false,
      });
    } catch (error: any) {
      console.error('Gemini AI Planner Error:', error);
      return res.json({
        plan: generateFallbackPlan(req.body?.prompt || 'Tirupati'),
        isFallback: true,
      });
    }
  });

  // Helper for fallback intelligent plans
  function generateFallbackPlan(userPrompt: string): string {
    const lower = userPrompt.toLowerCase();
    if (lower.includes('tirupati') || lower.includes('tirumala')) {
      return `🙏 **Namaste Devotee! Here is your personalized spiritual itinerary for Tirumala Tirupati Yatra:**

**🗓️ 2 Days Divine Tirupati Trip**

**☀️ Day 1: Journey & Srivari Foothills**
• **Morning (07:00 AM - 12:30 PM):** Departure from Origin to Tirupati Railway Station / Renigunta Airport. Scenic ghat road transfer or Alipiri Mettu footpath ascent.
• **Afternoon (01:00 PM - 03:30 PM):** Check-in at Hotel / TTD Guest House, fresh-up, and proceed to Padmavathi Ammavari Temple (Tiruchanur) to seek Goddess Lakshmi's blessings first.
• **Evening (05:00 PM - 08:30 PM):** Visit Sri Kapileswara Swamy Temple & ISKCON Tirupati. Evening Aarti and peaceful rest before the sacred Darshan day.

**☀️ Day 2: The Sacred Tirumala Darshan**
• **Morning (06:00 AM - 10:30 AM):** Special Entry Darshan (₹300 Sheegra Darshan) of Lord Venkateswara at Tirumala. Divine Ananda Nilayam view & collecting sacred Srivari Laddus.
• **Afternoon (12:00 PM - 03:00 PM):** Visit Varahaswamy Temple, Swami Pushkarini holy water, and Akhilandam coconut offering. Traditional satvik meal.
• **Evening (04:30 PM - 08:00 PM):** Scenic descent via Ghat Road, visit Sri Govindaraja Swamy Temple, and board return journey.

**💰 Estimated Budget:** ₹4,500 - ₹6,000 per person (Darshan ₹300 + Travel ₹1,200 + Stay ₹2,500 + Prasadam).
**👗 Dress Code Reminder:** Traditional Indian attire (Dhoti/Kurta for men, Saree/Churidar with Dupatta for women) is mandatory.`;
    }

    if (lower.includes('shirdi')) {
      return `🙏 **Om Sai Ram! Here is your curated Shirdi Pilgrimage Itinerary:**

**🗓️ 2 Days Shirdi Sai Baba Spiritual Yatra**

**☀️ Day 1: Arrival & Samadhi Mandir**
• **Morning:** Reach Shirdi (Kopargaon / Shirdi Airport / Sainagar Shirdi Station). Hotel check-in near Temple complex.
• **Afternoon:** Visit Dwarkamai, Chavadi, and Lendi Baug garden where Baba spent time in deep contemplation.
• **Evening:** Attend the celestial Dhoop Aarti at Samadhi Mandir (06:15 PM) followed by spiritual parayan.

**☀️ Day 2: VIP Darshan & Shani Shingnapur**
• **Morning (06:00 AM):** Kakad Aarti or Morning VIP Darshan of Shri Sai Baba Samadhi. Receive holy Udi and Prasad.
• **Afternoon (11:30 AM):** Day excursion to Shani Shingnapur (approx 70 km / 1.5 hrs). Offer mustard oil at the open-air Swayambhu idol.
• **Evening:** Return to Shirdi, collect dry fruit prasad boxes, and begin return travel.

**💰 Estimated Budget:** ₹3,800 - ₹5,200 per person.`;
    }

    return `🙏 **Namaste Devotee! Here is your tailored pilgrimage plan:**

**🗓️ 2-3 Days Sacred Journey Itinerary**

**☀️ Day 1: Divine Arrival & Preparations**
• **Morning:** Arrival at the holy city, hotel check-in, holy snan (sacred bath), and initial orientation.
• **Afternoon:** Visit companion shrines, local sacred river / Pushkarini, and pre-book Darshan/Seva tokens.
• **Evening:** Experience the grand evening temple Aarti, temple illumination, and attend classical bhajan recital.

**☀️ Day 2: Sanctum Sanctorum Darshan & Holy Rituals**
• **Morning (06:00 AM - 10:00 AM):** Sanctum Darshan during auspicious Brahma Muhurta / Sheegra queue.
• **Afternoon:** Archana, Abhishekam, and partaking in divine Prasadam feast (Annadanam).
• **Evening:** Circumambulation (Pradakshina), collecting blessed souvenirs, and peaceful departure.

**💡 Helpful Pilgrim Tips:**
1. Keep government ID cards (Aadhaar / Passport) handy for verified Darshan entries.
2. Mobile phones and electronic smartwatches are deposited in safe locker counters.
3. Pre-book your travel, darshan, and hotel slots through DivyaYatra for guaranteed confirmation!`;
  }

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DivyaYatra Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
