import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const productImageMap = {
  "aloe": "/product-images/aloe.jpg",
  "aloe vera": "/product-images/aloe.jpg",
  "amla": "/product-images/amla.jpg",
  "amla powder": "/product-images/amla-powder.jpg",
  "ashwagandha": "/product-images/ashwagandha.jpg",
  "black pepper": "/product-images/black-pepper.jpg",
  "brahmi": "/product-images/brahmi.jpg",
  "cardamom": "/product-images/cardamom.jpg",
  "cinnamon": "/product-images/cinnamon.jpg",
  "clove": "/product-images/clove.jpg",
  "coconut oil": "/product-images/coconut-oil.jpg",
  "coriander seeds": "/product-images/coriander-seeds.jpg",
  "cumin": "/product-images/cumin.jpg",
  "curry leaves": "/product-images/curry-leaves.jpg",
  "fennel": "/product-images/fennel.jpg",
  "fenugreek": "/product-images/fenugreek.jpg",
  "ginger": "/product-images/ginger.jpg",
  "ginger powder": "/product-images/ginger-powder.jpg",
  "guava leaves": "/product-images/guava-leaves.jpg",
  "hibiscus": "/product-images/hibiscus.jpg",
  "holy basil tea": "/product-images/holy-basil-tea.jpg",
  "lemongrass": "/product-images/lemongrass.jpg",
  "licorice root": "/product-images/licorice-root.jpg",
  "mint": "/product-images/mint.jpg",
  "moringa leaves": "/product-images/moringa-leaves.jpg",
  "neem": "/product-images/neem.jpg",
  "rose petals": "/product-images/rose-petals.jpg",
  "sesame seeds": "/product-images/sesame-seeds.jpg",
  "tulsi": "/product-images/tulsi.jpg",
  "turmeric": "/product-images/turmeric.jpg",
  "turmeric powder": "/product-images/turmeric-powder.jpg",
};

const withProductImages = (items) => items.map(item => ({
  ...item,
  image: productImageMap[item.name.toLowerCase()] || null
}));

const fallbackProducts = [
  { id: 1, name: 'Turmeric', category: 'Herbs', icon: '🌼', price: 120, unit: '100 g', tradition: 'Traditionally used in household food and care practices.', uses: ['Turmeric paste for minor wounds is documented in the CSP.', 'Used as a kitchen ingredient in traditional practices.', 'The project demonstrated turmeric-based practices during awareness sessions.'], howTo: 'The CSP describes turmeric paste for minor wounds and turmeric milk as examples discussed during awareness activities.', safety: 'Traditional use does not establish that a remedy treats or cures disease.' },
  { id: 2, name: 'Tulsi', category: 'Herbs', icon: '🌿', price: 80, unit: '50 g', tradition: 'A medicinal plant mentioned in the community survey and demonstrations.', uses: ['Tulsi was documented among commonly used household ingredients.', 'The CSP mentions tulsi decoctions and herbal drinks in awareness demonstrations.'], howTo: 'The project discusses tulsi in herbal drinks/decoctions.', safety: 'Check for allergies and medicine interactions. For persistent symptoms, consult a healthcare professional.' },
  { id: 3, name: 'Neem', category: 'Medicinal Plants', icon: '🍃', price: 90, unit: '100 g', tradition: 'Traditionally discussed for household skin-care practices.', uses: ['Neem water for skin care was demonstrated in the CSP.', 'Neem is listed among medicinal plants observed and documented by the team.'], howTo: 'The CSP uses neem water as an example of a traditional skin-care practice.', safety: 'Do not use traditional preparations on serious skin conditions without professional advice.' },
  { id: 4, name: 'Ginger', category: 'Herbs', icon: '🫚', price: 70, unit: '100 g', tradition: 'A kitchen ingredient documented in traditional household practices.', uses: ['Ginger is mentioned in the CSP in connection with digestion.', 'Herbal drinks using ginger were discussed in awareness activities.'], howTo: 'The project discusses ginger in household herbal drinks and traditional food practices.', safety: 'Use normal food quantities unless advised otherwise by a qualified professional.' },
  { id: 5, name: 'Aloe Vera', category: 'Medicinal Plants', icon: '🌵', price: 110, unit: '100 ml', tradition: 'Discussed in the CSP for traditional hair and skin applications.', uses: ['Aloe vera applications were demonstrated during the awareness program.', 'The report mentions traditional hair and skin uses.'], howTo: 'The CSP describes aloe vera applications for hair and skin as an awareness example.', safety: 'Topical use can irritate some people. Do not treat serious skin conditions yourself.' },
  { id: 6, name: 'Fenugreek', category: 'Medicinal Plants', icon: '🌱', price: 75, unit: '100 g', tradition: 'Listed by the CSP as a natural ingredient documented during the project.', uses: ['Fenugreek is included among medicinal plants and natural ingredients collected by the team.'], howTo: 'The PDF identifies fenugreek as a documented ingredient but does not provide a specific preparation method.', safety: 'Because the project source does not specify a preparation or dose, this website does not invent one.' },
  { id: 7, name: 'Mint', category: 'Medicinal Plants', icon: '🌱', price: 60, unit: '50 g', tradition: 'Listed in the CSP among natural ingredients documented during the survey work.', uses: ['Mint appears in the project’s list of medicinal plants and natural ingredients.'], howTo: 'The PDF names mint but does not specify a particular preparation method.', safety: 'The website does not add a dosage or treatment claim beyond the project source.' },
  { id: 8, name: 'Hibiscus', category: 'Medicinal Plants', icon: '🌺', price: 95, unit: '50 g', tradition: 'Listed in the CSP among plants documented during the community study.', uses: ['Hibiscus is included in the project’s medicinal-plant documentation.'], howTo: 'The PDF identifies hibiscus as a documented plant but does not specify a particular preparation method.', safety: 'The website does not invent a dosage or disease-treatment claim.' },
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

function App() {
  const [products, setProducts] = useState(withProductImages(fallbackProducts));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [learn, setLearn] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const [aiProduct, setAiProduct] = useState(null);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Pick a fresh group on every browser refresh. The previous group is
  // remembered so the exact same group is not shown twice in a row.
  const randomSelection = (items, count = 8) => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    let selection = shuffled.slice(0, Math.min(count, shuffled.length));

    try {
      const previous = JSON.parse(localStorage.getItem('heritagecare-last-products') || '[]');
      const currentKey = selection.map(p => p.id).sort((a, b) => a - b).join(',');
      if (previous.join(',') === currentKey && selection.length > 1) {
        [selection[0], selection[1]] = [selection[1], selection[0]];
      }
      localStorage.setItem(
        'heritagecare-last-products',
        JSON.stringify(selection.map(p => p.id).sort((a, b) => a - b))
      );
    } catch {}

    return selection;
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setProducts(randomSelection(withProductImages(data))))
      .catch(() => setProducts(randomSelection(withProductImages(fallbackProducts))));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.tradition}`.toLowerCase().includes(query.toLowerCase())), [products, query, category]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product) => setCart(items => {
    const found = items.find(i => i.id === product.id);
    return found ? items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...items, { ...product, qty: 1 }];
  });
  const changeQty = (id, delta) => setCart(items => items.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));


  function openAI(product) {
    setLearn(null);
    setAiProduct(product);
    setAiInput('');
    setAiMessages([{ role: 'assistant', content: `Hi! I’m your Traditional Healthcare AI assistant. Ask me anything about ${product.name}. I’ll keep the answer focused on the CSP information and clearly separate traditional use from medical advice.` }]);
  }

  async function askAI(question = aiInput) {
    const clean = question.trim();
    if (!clean || !aiProduct || aiLoading) return;
    setAiMessages(messages => [...messages, { role: 'user', content: clean }]);
    setAiInput('');
    setAiLoading(true);
    try {
      const r = await fetch('http://localhost:5000/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: aiProduct, question: clean })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'AI request failed');
      setAiMessages(messages => [...messages, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setAiMessages(messages => [...messages, { role: 'assistant', content: `I couldn't connect to the AI service right now. ${error.message || 'Please try again.'}` }]);
    } finally {
      setAiLoading(false);
    }
  }

  async function placeOrder(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customer = Object.fromEntries(form.entries());
    try {
      const r = await fetch('http://localhost:5000/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer, items: cart, total }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Order failed');
      setOrderMessage(`Order placed successfully — ${data.orderId}`);
      setCart([]); setCheckout(false);
    } catch {
      setOrderMessage('Backend is not reachable. Start the project with npm run dev and try again.');
    }
  }

  return <>
    <header className="topbar">
      <div className="brand"><span className="brand-mark">✦</span><div><strong>HeritageCare</strong><small>Traditional Healthcare CSP</small></div></div>
      <div className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search herbs, plants & traditional products..." /></div>
      <div className="actions"><button className="nav-btn" onClick={() => document.getElementById('learn-section').scrollIntoView({behavior:'smooth'})}>Learn</button><button className="cart-btn" onClick={() => setCartOpen(true)}>🛒 Cart <b>{cartCount}</b></button></div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">COMMUNITY SERVICE PROJECT · 2026–2027</span><h1>Learn the tradition.<br/><em>Shop with understanding.</em></h1><p>Explore traditional healthcare ingredients documented through our community study, learn how they were discussed in the CSP, and browse a simple e-commerce experience.</p><div className="hero-actions"><button className="primary" onClick={() => document.getElementById('products').scrollIntoView({behavior:'smooth'})}>Explore products →</button><button className="secondary" onClick={() => document.getElementById('learn-section').scrollIntoView({behavior:'smooth'})}>How does it work?</button></div></div>
        <div className="hero-art"><div className="orb">🌿<span>Traditional<br/>Knowledge</span></div><div className="floating-card one">🌼 <b>Turmeric</b><small>Learn its documented use</small></div><div className="floating-card two">📖 <b>Learn first</b><small>Understand before you use</small></div></div>
      </section>

      <section className="trust-strip"><div><b>📚 CSP-based</b><span>Content grounded in your project report</span></div><div><b>🌱 Community-focused</b><span>Rural & semi-urban community study</span></div><div><b>🛡️ Safety-aware</b><span>No invented doses or cure claims</span></div><div><b>⚡ Simple shopping</b><span>Search, learn, cart & checkout</span></div></section>

      <section className="section" id="products"><div className="section-heading"><div><span className="eyebrow">SHOP & EXPLORE</span><h2>Documented natural ingredients</h2><p>These items are drawn from the ingredients and plants named in the CSP report.</p></div><span className="count">{filtered.length} items</span></div>
        <div className="chips">{categories.map(c => <button key={c} className={category === c ? 'chip active' : 'chip'} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id} onClick={() => setLearn(p)}><div className="product-visual">
  {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <span>{p.icon}</span>}
  <button className="learn-mini" onClick={(e) => { e.stopPropagation(); setLearn(p); }}>ⓘ View details</button>
</div><div className="product-info"><div className="tag">{p.category}</div><h3>{p.name}</h3><p>{p.tradition}</p><div className="product-bottom"><div><b>₹{p.price}</b><small> / {p.unit}</small></div><button className="add" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to cart</button></div></div></article>)}</div>
      </section>

      <section className="learn-banner" id="learn-section"><div><span className="eyebrow">NEW FEATURE</span><h2>Don't know how to use a product?</h2><p>Every product has a <b>Learn</b> view with the documented traditional use, what the CSP actually says about preparation, and safety notes when the source is limited.</p></div><div className="learn-steps"><span><b>01</b> Pick a product</span><span><b>02</b> Read the tradition</span><span><b>03</b> Check safety</span></div></section>

      <section className="section study"><div className="section-heading"><div><span className="eyebrow">ABOUT THE PROJECT</span><h2>Why this website?</h2></div></div><div className="study-grid"><div className="study-card large"><span>01</span><h3>Understand community practice</h3><p>The project used surveys, interviews, discussions with elders and observation to understand traditional healthcare practices.</p></div><div className="study-card"><span>02</span><h3>Preserve knowledge</h3><p>The CSP aims to document indigenous knowledge and make community learning easier to access.</p></div><div className="study-card"><span>03</span><h3>Promote informed use</h3><p>Awareness activities covered home remedies, medicinal plants, hygiene, nutrition, yoga and meditation.</p></div></div></section>

      <section className="section journey"><div className="section-heading"><div><span className="eyebrow">CSP JOURNEY</span><h2>From community study to digital experience</h2></div></div><div className="timeline">{['Community interaction','Survey & data collection','Medicinal plant documentation','Awareness sessions','Practical demonstrations','Feedback & learning'].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></section>
    </main>

    <footer><div><strong>HeritageCare</strong><p>Traditional Healthcare · Community Service Project<br/>Department of Computer Science and Engineering<br/>Sri Venkateswara College of Engineering & Technology</p></div><div><b>Academic team</b><p>Faculty Guide: Dr. P. Jyotheeswari<br/>Associate Professor & HOD</p></div><div><b>Safety note</b><p>This educational website describes traditional/community practices. It is not a substitute for professional medical advice.</p></div></footer>

    {selected && <Modal title={selected.name} onClose={() => setSelected(null)} />}
    {learn && <div className="overlay" onClick={() => setLearn(null)}><div className="modal learn-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setLearn(null)}>×</button><div className="modal-icon">{learn.image ? <img src={learn.image} alt={learn.name} /> : learn.icon}</div><span className="tag">{learn.category}</span><h2>{learn.name}</h2><p className="lead">{learn.tradition}</p><h4>📖 What the CSP documents</h4><ul>{learn.uses.map(u => <li key={u}>{u}</li>)}</ul><h4>🧭 How it is described</h4><p>{learn.howTo}</p><div className="safety"><b>🛡️ Safety</b><p>{learn.safety}</p></div><div className="modal-actions"><button className="secondary full" onClick={() => openAI(learn)}>🤖 Ask AI about {learn.name}</button><button className="primary full" onClick={() => { addToCart(learn); setLearn(null); setCartOpen(true); }}>🛒 Add to cart · ₹{learn.price}</button></div></div></div>}
    {aiProduct && <div className="overlay" onClick={() => setAiProduct(null)}><div className="modal ai-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setAiProduct(null)}>×</button><div className="ai-header"><div className="ai-avatar">🤖</div><div><span className="eyebrow">PRODUCT AI ASSISTANT</span><h2>Ask about {aiProduct.name}</h2><p>Questions are answered using the selected product's CSP information and safety notes.</p></div></div><div className="ai-suggestions"><button onClick={() => askAI(`What is ${aiProduct.name}?`)}>What is it?</button><button onClick={() => askAI(`What is ${aiProduct.name} traditionally used for?`)}>Traditional uses</button><button onClick={() => askAI(`How is ${aiProduct.name} described as being used in the CSP?`)}>How is it used?</button><button onClick={() => askAI(`What precautions should I know about ${aiProduct.name}?`)}>Precautions</button></div><div className="ai-chat">{aiMessages.map((m,i) => <div className={`ai-message ${m.role}`} key={i}><span>{m.role === 'assistant' ? '🤖' : 'You'}</span><p>{m.content}</p></div>)}{aiLoading && <div className="ai-message assistant"><span>🤖</span><p className="typing">Thinking…</p></div>}</div><form className="ai-form" onSubmit={e => { e.preventDefault(); askAI(); }}><input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder={`Ask anything about ${aiProduct.name}...`} /><button className="primary" disabled={aiLoading || !aiInput.trim()}>Send</button></form><div className="ai-disclaimer">🛡️ Educational information only. Traditional use does not guarantee a medical benefit or replace professional medical advice.</div></div></div>}
    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setCartOpen(false)}>×</button><h2>Your Cart</h2>{cart.length === 0 ? <div className="empty"><span>🛒</span><h3>Your cart is empty</h3><p>Explore the documented ingredients and add one to begin.</p></div> : <>{cart.map(i => <div className="cart-item" key={i.id}><span className="cart-icon">{i.icon}</span><div><b>{i.name}</b><small>₹{i.price} · {i.unit}</small><div className="qty"><button onClick={() => changeQty(i.id,-1)}>−</button><span>{i.qty}</span><button onClick={() => changeQty(i.id,1)}>+</button></div></div></div>)}<div className="total"><span>Total</span><b>₹{total}</b></div><button className="primary full" onClick={() => setCheckout(true)}>Proceed to checkout</button></>}</aside></div>}
    {checkout && <div className="overlay" onClick={() => setCheckout(false)}><div className="modal checkout" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setCheckout(false)}>×</button><span className="eyebrow">CHECKOUT</span><h2>Place your order</h2><p>Demo checkout for the CSP e-commerce prototype.</p><form onSubmit={placeOrder}><input name="name" placeholder="Full name" required/><input name="phone" placeholder="Phone number" required/><textarea name="address" placeholder="Delivery address" required/><div className="total"><span>Total</span><b>₹{total}</b></div><button className="primary full">Place order</button></form></div></div>}
    {orderMessage && <div className="toast">{orderMessage}<button onClick={() => setOrderMessage('')}>×</button></div>}
  </>;
}

function Modal({ title, onClose }) { return null; }

createRoot(document.getElementById('root')).render(<App />);
