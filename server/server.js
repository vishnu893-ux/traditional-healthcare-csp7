import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const envFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
try {
  const envText = fs.readFileSync(envFile, 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index > 0) {
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^\"|\"$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
} catch {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;
const ordersFile = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Turmeric', category: 'Herbs', icon: '🌼', price: 120, unit: '100 g', tradition: 'Traditionally used in household food and care practices.', uses: ['Turmeric paste for minor wounds is documented in the CSP.', 'Used as a kitchen ingredient in traditional practices.', 'The project demonstrated turmeric-based practices during awareness sessions.'], howTo: 'The CSP describes turmeric paste for minor wounds and turmeric milk as examples discussed during awareness activities. Follow local guidance and seek professional care for significant wounds or illness.', safety: 'Traditional use does not establish that a remedy treats or cures disease. Avoid using home remedies as a substitute for professional medical care.' },
  { id: 2, name: 'Tulsi', category: 'Herbs', icon: '🌿', price: 80, unit: '50 g', tradition: 'A medicinal plant mentioned in the community survey and demonstrations.', uses: ['Tulsi was documented among commonly used household ingredients.', 'The CSP mentions tulsi decoctions and herbal drinks in awareness demonstrations.'], howTo: 'The project discusses tulsi in herbal drinks/decoctions. Preparation details should follow the guidance given by a qualified practitioner or the project demonstration.', safety: 'Check for allergies and medicine interactions. For persistent symptoms, consult a healthcare professional.' },
  { id: 3, name: 'Neem', category: 'Medicinal Plants', icon: '🍃', price: 90, unit: '100 g', tradition: 'Traditionally discussed for household skin-care practices.', uses: ['Neem water for skin care was demonstrated in the CSP.', 'Neem is listed among medicinal plants observed and documented by the team.'], howTo: 'The CSP uses neem water as an example of a traditional skin-care practice. Use only as a general educational example, not as a treatment recommendation.', safety: 'Do not use traditional preparations on serious skin conditions without professional advice.' },
  { id: 4, name: 'Ginger', category: 'Herbs', icon: '🫚', price: 70, unit: '100 g', tradition: 'A kitchen ingredient documented in traditional household practices.', uses: ['Ginger is mentioned in the CSP in connection with digestion.', 'Herbal drinks using ginger were discussed in awareness activities.'], howTo: 'The project discusses ginger in household herbal drinks and traditional food practices. Exact preparation should follow the demonstrated or locally established method.', safety: 'Use normal food quantities unless advised otherwise by a qualified professional.' },
  { id: 5, name: 'Aloe Vera', category: 'Medicinal Plants', icon: '🌵', price: 110, unit: '100 ml', tradition: 'Discussed in the CSP for traditional hair and skin applications.', uses: ['Aloe vera applications were demonstrated during the awareness program.', 'The report mentions traditional hair and skin uses.'], howTo: 'The CSP describes aloe vera applications for hair and skin as an awareness example. Use clean, appropriate preparations and stop if irritation occurs.', safety: 'Topical use can irritate some people. Do not treat serious skin conditions yourself.' },
  { id: 6, name: 'Fenugreek', category: 'Medicinal Plants', icon: '🌱', price: 75, unit: '100 g', tradition: 'Listed by the CSP as a natural ingredient documented during the project.', uses: ['Fenugreek is included among medicinal plants and natural ingredients collected by the team.', 'The project used it as part of community documentation.'], howTo: 'The PDF identifies fenugreek as a documented ingredient but does not provide a specific preparation method.', safety: 'Because the project source does not specify a preparation or dose, this website does not invent one.' },
  { id: 7, name: 'Mint', category: 'Medicinal Plants', icon: '🌱', price: 60, unit: '50 g', tradition: 'Listed in the CSP among natural ingredients documented during the survey work.', uses: ['Mint appears in the project’s list of medicinal plants and natural ingredients.', 'The project collected information about locally used natural ingredients.'], howTo: 'The PDF names mint but does not specify a particular preparation method.', safety: 'The website does not add a dosage or treatment claim beyond the project source.' },
  { id: 8, name: 'Hibiscus', category: 'Medicinal Plants', icon: '🌺', price: 95, unit: '50 g', tradition: 'Listed in the CSP among plants documented during the community study.', uses: ['Hibiscus is included in the project’s medicinal-plant documentation.', 'The project discusses household natural ingredients and plant observation.'], howTo: 'The PDF identifies hibiscus as a documented plant but does not specify a particular preparation method.', safety: 'The website does not invent a dosage or disease-treatment claim.' },
  { id: 9, name: 'Amla', category: 'Medicinal Plants', icon: '🟢', price: 85, unit: '100 g', tradition: 'Amla was added as an educational example of a traditional food and plant ingredient.', uses: ['Commonly used as a food ingredient in traditional practices.', 'Included here to expand the project catalogue without making disease-treatment claims.'], howTo: 'Use as a normal food ingredient. The project catalogue does not specify a medical preparation or dosage.', safety: 'Food use is different from medical treatment. Check with a healthcare professional if you have a medical condition or take medicines.' },
  { id: 10, name: 'Ashwagandha', category: 'Medicinal Plants', icon: '🌿', price: 150, unit: '100 g', tradition: 'A traditional herb included for educational exploration of Indian herbal knowledge.', uses: ['Presented as a traditional herb for learning and cultural documentation.', 'The website does not claim that it treats or cures disease.'], howTo: 'No specific preparation or dosage is provided in this project catalogue.', safety: 'Herbal products can interact with medicines and may not be suitable for everyone. Seek professional advice before medicinal use.' },
  { id: 11, name: 'Amla Powder', category: 'Herbal Products', icon: '🥣', price: 130, unit: '100 g', tradition: 'A convenient powdered form of amla for traditional food and household use.', uses: ['Can be explored as a traditional food ingredient.', 'Added as an educational product rather than a medical treatment.'], howTo: 'Follow the product label for food use. This website does not provide a therapeutic dose.', safety: 'Do not use as a substitute for prescribed treatment.' },
  { id: 12, name: 'Cinnamon', category: 'Herbs', icon: '🪵', price: 95, unit: '50 g', tradition: 'A common kitchen spice included to represent household herbal ingredients.', uses: ['Used as a culinary spice in traditional food practices.', 'Included for educational and cultural reference.'], howTo: 'Use as a normal culinary spice according to food preparation needs.', safety: 'Large medicinal amounts are not the same as normal food use. Ask a professional about concentrated preparations.' },
  { id: 13, name: 'Clove', category: 'Herbs', icon: '🌰', price: 90, unit: '50 g', tradition: 'A traditional kitchen spice used in household food practices.', uses: ['Used as a culinary spice.', 'Included as an example of a natural household ingredient.'], howTo: 'Use in normal food preparation. No medicinal dosage is provided here.', safety: 'Concentrated clove oil can be irritating and should not be treated like a food spice.' },
  { id: 14, name: 'Black Pepper', category: 'Herbs', icon: '⚫', price: 65, unit: '100 g', tradition: 'A familiar kitchen spice documented as a traditional household ingredient.', uses: ['Used in traditional cooking.', 'Included for educational exploration of household natural ingredients.'], howTo: 'Use as a normal culinary spice.', safety: 'Avoid excessive or concentrated use, especially if it causes irritation.' },
  { id: 15, name: 'Lemongrass', category: 'Medicinal Plants', icon: '🌾', price: 75, unit: '50 g', tradition: 'A fragrant plant included as an example of traditional household herbal ingredients.', uses: ['Can be used as a culinary or herbal ingredient.', 'Included for cultural and educational reference.'], howTo: 'Use as a food or herbal ingredient according to established local preparation practices.', safety: 'This project does not provide a medicinal dosage or disease-treatment recommendation.' },
  { id: 16, name: 'Curry Leaves', category: 'Medicinal Plants', icon: '🍃', price: 55, unit: '50 g', tradition: 'A familiar Indian household plant used in cooking and traditional food practices.', uses: ['Commonly used as a culinary ingredient.', 'Included to represent locally familiar plant-based knowledge.'], howTo: 'Use as a normal culinary ingredient.', safety: 'Traditional food use should not be confused with treatment for a medical condition.' },
  { id: 17, name: 'Cardamom', category: 'Herbs', icon: '🫛', price: 140, unit: '50 g', tradition: 'Aromatic kitchen spice used in traditional food and beverage preparation.', uses: ['Used as a culinary spice.', 'Included for cultural and educational reference.'], howTo: 'Use as a normal culinary spice in food or beverages.', safety: 'Normal food use is different from concentrated medicinal preparations.' },
  { id: 18, name: 'Fennel', category: 'Herbs', icon: '🌿', price: 70, unit: '100 g', tradition: 'A familiar aromatic seed used in traditional food practices.', uses: ['Used as a culinary ingredient.', 'Included as an example of household herbal knowledge.'], howTo: 'Use as a normal food ingredient.', safety: 'The project does not provide a medicinal dose or treatment recommendation.' },
  { id: 19, name: 'Cumin', category: 'Herbs', icon: '🌾', price: 65, unit: '100 g', tradition: 'Common Indian kitchen spice used in traditional cooking.', uses: ['Used in everyday cooking.', 'Included to represent familiar household ingredients.'], howTo: 'Use as a normal culinary spice.', safety: 'Avoid concentrated preparations unless advised by a qualified professional.' },
  { id: 20, name: 'Coriander Seeds', category: 'Herbs', icon: '🟤', price: 60, unit: '100 g', tradition: 'Traditional kitchen spice commonly used in Indian food preparation.', uses: ['Used as a culinary spice.', 'Included for educational exploration of traditional food practices.'], howTo: 'Use in normal food preparation.', safety: 'Food use should not be confused with medical treatment.' },
  { id: 21, name: 'Holy Basil Tea', category: 'Herbal Products', icon: '🍵', price: 110, unit: '20 tea bags', tradition: 'A packaged herbal beverage inspired by traditional tulsi use.', uses: ['Presented as a beverage product for cultural and educational exploration.', 'Does not make disease-treatment claims.'], howTo: 'Prepare according to the product label.', safety: 'Check ingredients and possible medicine interactions if consumed regularly.' },
  { id: 22, name: 'Rose Petals', category: 'Herbal Products', icon: '🌹', price: 100, unit: '50 g', tradition: 'A fragrant botanical ingredient used in traditional food and cultural practices.', uses: ['Can be used as a culinary or aromatic ingredient.', 'Included for cultural reference.'], howTo: 'Use food-grade petals according to the product label.', safety: 'Use only properly identified, food-grade material for consumption.' },
  { id: 23, name: 'Moringa Leaves', category: 'Medicinal Plants', icon: '🍀', price: 90, unit: '100 g', tradition: 'A leafy plant included as an example of traditional food and plant knowledge.', uses: ['Can be used as a food ingredient.', 'Included for educational documentation.'], howTo: 'Use as a normal food ingredient and follow standard food-preparation practices.', safety: 'Food use is different from concentrated supplements or medicinal preparations.' },
  { id: 24, name: 'Brahmi', category: 'Medicinal Plants', icon: '🌱', price: 125, unit: '50 g', tradition: 'A traditional herb included for educational exploration of Indian herbal knowledge.', uses: ['Included as a traditional plant for cultural learning.', 'The website does not claim that it treats or cures disease.'], howTo: 'No medicinal dosage is provided in this project.', safety: 'Consult a qualified healthcare professional before medicinal use, especially with regular medicines.' },
  { id: 25, name: 'Licorice Root', category: 'Herbal Products', icon: '🪵', price: 115, unit: '100 g', tradition: 'A traditional botanical ingredient included for educational reference.', uses: ['Included as an example of a traditional herbal ingredient.', 'Used in some food and beverage preparations.'], howTo: 'Follow the product label for food use.', safety: 'Concentrated licorice can have important health effects and medicine interactions. Seek professional advice before medicinal use.' },
  { id: 26, name: 'Ginger Powder', category: 'Herbal Products', icon: '🫚', price: 95, unit: '100 g', tradition: 'Powdered form of a familiar household spice.', uses: ['Can be used as a culinary ingredient.', 'Included for convenient educational exploration.'], howTo: 'Use according to normal food preparation or the product label.', safety: 'Do not treat a food ingredient as a substitute for medical treatment.' },
  { id: 27, name: 'Turmeric Powder', category: 'Herbal Products', icon: '🟡', price: 100, unit: '100 g', tradition: 'Powdered turmeric commonly used as a culinary ingredient.', uses: ['Used in traditional cooking.', 'Included as a familiar household ingredient.'], howTo: 'Use as a normal culinary ingredient.', safety: 'Concentrated supplements are different from normal food use.' },
  { id: 28, name: 'Guava Leaves', category: 'Medicinal Plants', icon: '🍃', price: 70, unit: '50 g', tradition: 'A locally familiar plant included for educational documentation.', uses: ['Included as an example of traditional plant knowledge.', 'Presented without a disease-treatment claim.'], howTo: 'No specific medicinal preparation or dosage is provided.', safety: 'Seek professional advice before using plant preparations medicinally.' },
  { id: 29, name: 'Coconut Oil', category: 'Natural Products', icon: '🥥', price: 160, unit: '200 ml', tradition: 'A common household oil used in food and traditional personal-care practices.', uses: ['Used as a cooking ingredient.', 'Also familiar in traditional hair and skin-care routines.'], howTo: 'Use as a food or personal-care product according to the label.', safety: 'Stop topical use if irritation occurs and seek advice for persistent skin problems.' },
  { id: 30, name: 'Sesame Seeds', category: 'Natural Products', icon: '🌰', price: 80, unit: '100 g', tradition: 'Traditional food ingredient used in many Indian household preparations.', uses: ['Used in cooking and traditional foods.', 'Included for cultural and educational reference.'], howTo: 'Use as a normal food ingredient.', safety: 'People with sesame allergy should avoid it.' },
]

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'HeritageCare API' }));
app.get('/api/products', (_req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/ai', async (req, res) => {
  const { product, question } = req.body || {};

  if (!product?.name || !question?.trim()) {
    return res.status(400).json({
      error: 'Product and question are required.'
    });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'PASTE_YOUR_GROQ_API_KEY_HERE') {
    return res.status(500).json({
      error: 'Groq API key is not configured on the backend.'
    });
  }

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are the Traditional Healthcare product assistant for a college Community Service Project. Answer only from the supplied product information when discussing the CSP. Do not invent dosage, diagnosis, treatment, cure, or medical claims. Clearly label traditional/community practices as traditional practices. If the supplied information does not answer the question, say that the CSP does not specify it. Encourage professional medical advice for health conditions, medicines, allergies, pregnancy, children, serious symptoms, or persistent symptoms.'
          },
          {
            role: 'user',
            content:
              `Selected product:\n${JSON.stringify(product, null, 2)}\n\nUser question:\n${question}`
          }
        ],
        temperature: 0.2,
        max_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const groqMessage =
        data?.error?.message ||
        data?.message ||
        `Groq request failed with status ${response.status}.`;

      console.error('Groq API Error:', groqMessage);

      return res.status(response.status).json({
        error: groqMessage
      });
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.json({
        answer: 'I could not generate an answer for that question.',
        mode: 'ai'
      });
    }

    return res.json({
      answer,
      mode: 'ai',
      model
    });

  } catch (error) {
    console.error('Groq connection error:', error);

    return res.status(500).json({
      error:
        error?.message ||
        'Could not connect to the AI service. Please try again later.'
    });
  }
});

app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body || {};
  if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Please provide customer details and at least one cart item.' });
  }
  const order = { id: `HC-${Date.now()}`, createdAt: new Date().toISOString(), customer, items, total };
  let orders = [];
  if (fs.existsSync(ordersFile)) orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.status(201).json({ message: 'Order received', orderId: order.id });
});

app.listen(PORT, () => console.log(`HeritageCare backend running at http://localhost:${PORT}`));
