/**
 * standalone Al Jazeera News API Migration Script
 * Runs locally or on the VPS using standard Node.js (no dependencies needed).
 * 
 * Usage:
 *   node migrate-api.js --url https://pulefeed.tech --email admin@pulefeed.tech --password YOUR_PASSWORD
 */

const aljazeeraArticles = [
  {
    title: 'Ukraine strikes strategic Russian bridge in Crimea',
    slug: 'ukraine-strikes-strategic-russian-bridge-crimea',
    excerpt: 'Ukraine launched a precision strike on a key Russian military bridge in occupied Crimea, disrupting vital supply lines.',
    publishedAt: '2026-06-24T08:32:05.000Z',
    tags: [{ tag: 'defense' }, { tag: 'ukraine' }, { tag: 'russia' }, { tag: 'crimea' }, { tag: 'international' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    isBreaking: true,
    isFeatured: true,
  },
  {
    title: 'Ukraine’s recovery to be deliberated in Poland amid Kyiv-Warsaw spat',
    slug: 'ukraines-recovery-deliberated-poland-amid-kyiv-warsaw-spat',
    excerpt: 'Amid a brewing diplomatic row that tests Poland\'s alliance with Ukraine, President Zelenskyy is set to skip a key recovery conference.',
    publishedAt: '2026-06-24T08:27:43.000Z',
    tags: [{ tag: 'international' }, { tag: 'diplomacy' }, { tag: 'ukraine' }, { tag: 'poland' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1541873676-a181ecdc5a39?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: true,
  },
  {
    title: 'Mamdani-backed candidates sweep New York City Democratic primaries',
    slug: 'mamdani-backed-candidates-sweep-nyc-democratic-primaries',
    excerpt: 'Democratic socialist candidates backed by the New York City mayor win key primaries, ousting two sitting congressmen.',
    publishedAt: '2026-06-24T08:01:26.000Z',
    tags: [{ tag: 'elections' }, { tag: 'usa' }, { tag: 'democrats' }, { tag: 'primaries' }, { tag: 'politics' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: true,
  },
  {
    title: 'Power outage in France as Europe bakes in record heat',
    slug: 'power-outage-france-europe-bakes-record-heat',
    excerpt: 'Italy\'s Ministry of Health declares red heatwave alerts in 16 cities, including Milan and Rome, as schools close in the UK.',
    publishedAt: '2026-06-24T07:45:44.000Z',
    tags: [{ tag: 'international' }, { tag: 'france' }, { tag: 'europe' }, { tag: 'climate' }, { tag: 'heatwave' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Iran war day 117: Nuclear inspections dispute as US Senate curbs war powers',
    slug: 'iran-war-day-117-nuclear-inspections-dispute-us-senate-war-powers',
    excerpt: 'Iran and the US clash over nuclear inspections and the Strait of Hormuz as negotiators push for a final deal within 60 days.',
    publishedAt: '2026-06-24T07:04:05.000Z',
    tags: [{ tag: 'defense' }, { tag: 'iran' }, { tag: 'usa' }, { tag: 'nuclear' }, { tag: 'senate' }, { tag: 'international' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1529107386311-07b54f597bb3?q=80&w=1200&auto=format&fit=crop',
    isBreaking: true,
    isFeatured: false,
  },
  {
    title: 'Diabetes patients in Gaza face survival battle amid war shortages',
    slug: 'diabetes-patients-gaza-face-survival-battle-amid-war-shortages',
    excerpt: 'Insulin and equipment shortages in Gaza pose fatal risks, leading to critical health complications for thousands of patients.',
    publishedAt: '2026-06-24T06:04:30.000Z',
    tags: [{ tag: 'international' }, { tag: 'gaza' }, { tag: 'humanitarian' }, { tag: 'health' }, { tag: 'middle east' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1584515901407-d8f46f389934?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Deadly heatwave grips Europe as temperatures soar across continent',
    slug: 'deadly-heatwave-grips-europe-temperatures-soar-across-continent',
    excerpt: 'A blistering heatwave has swept across Europe triggering the highest-level red heat warnings in Britain and France.',
    publishedAt: '2026-06-24T05:57:19.000Z',
    tags: [{ tag: 'international' }, { tag: 'europe' }, { tag: 'climate' }, { tag: 'heatwave' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1534312527009-56c7016453e6?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Kenyan Health Minister orders halt of construction of US Ebola facility',
    slug: 'kenyan-health-minister-orders-halt-construction-us-ebola-facility',
    excerpt: 'Kenya’s Health Minister has stopped the construction of a US-backed Ebola research facility in the country, citing lack of regulatory approvals.',
    publishedAt: '2026-06-24T05:06:43.000Z',
    tags: [{ tag: 'policy' }, { tag: 'kenya' }, { tag: 'health' }, { tag: 'usa' }, { tag: 'international' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Ghana celebrates after holding nervous England to 0-0 draw',
    slug: 'ghana-celebrates-holding-nervous-england-0-0-draw',
    excerpt: 'Ghanaians took to the streets in celebration after the Black Stars held England to a 0-0 draw at the FIFA World Cup.',
    publishedAt: '2026-06-24T04:50:58.000Z',
    tags: [{ tag: 'sports' }, { tag: 'ghana' }, { tag: 'england' }, { tag: 'world cup' }, { tag: 'international' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Cristiano Ronaldo becomes first player to score in six World Cups',
    slug: 'cristiano-ronaldo-becomes-first-player-score-six-world-cups',
    excerpt: 'Cristiano Ronaldo scored twice in Portugal’s 5-0 win over Uzbekistan, cementing his legacy in World Cup history.',
    publishedAt: '2026-06-24T04:45:01.000Z',
    tags: [{ tag: 'sports' }, { tag: 'portugal' }, { tag: 'world cup' }, { tag: 'cristiano ronaldo' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Kilts and bagpipes flood Miami streets as Scotland prepare to face Brazil',
    slug: 'kilts-bagpipes-flood-miami-streets-scotland-prepare-face-brazil',
    excerpt: 'Miami streets were filled with festive colors and bagpipe sounds as Scottish fans gathered ahead of their clash with Brazil.',
    publishedAt: '2026-06-24T04:42:42.000Z',
    tags: [{ tag: 'sports' }, { tag: 'scotland' }, { tag: 'brazil' }, { tag: 'miami' }, { tag: 'international' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Munoz sends Colombia into World Cup knockouts with 1-0 win over DR Congo',
    slug: 'munoz-sends-colombia-world-cup-knockouts-1-0-win-dr-congo',
    excerpt: 'Daniel Munoz\'s 76th-minute goal guided Colombia to a Group K win over DR Congo, sending them to the round of 32.',
    publishedAt: '2026-06-24T04:40:44.000Z',
    tags: [{ tag: 'sports' }, { tag: 'colombia' }, { tag: 'world cup' }, { tag: 'congo' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6edd1def2d?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'NBA Draft 2026: Wizards select teen sensation AJ Dybantsa with No. 1 pick',
    slug: 'nba-draft-2026-wizards-select-teen-sensation-aj-dybantsa-no-1-pick',
    excerpt: 'The 6ft 8in (2.03m) 19-year-old forward was scooped by the Wizards after playing just one season of college basketball.',
    publishedAt: '2026-06-24T04:32:58.000Z',
    tags: [{ tag: 'sports' }, { tag: 'nba' }, { tag: 'wizards' }, { tag: 'basketball' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'Which teams have qualified for the World Cup 2026 knockouts, round of 32?',
    slug: 'which-teams-qualified-world-cup-2026-knockouts-round-32',
    excerpt: 'The 2026 FIFA World Cup knockout stage format, criteria and rules for qualification. Find out who\'s in and who\'s out.',
    publishedAt: '2026-06-24T04:15:22.000Z',
    tags: [{ tag: 'sports' }, { tag: 'world cup' }, { tag: 'analysis' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
  {
    title: 'China takes US crown for world’s fastest supercomputer',
    slug: 'china-takes-us-crown-worlds-fastest-supercomputer',
    excerpt: 'China’s LineShine overtakes US-based El Capitan as the most powerful supercomputer in the world, according to the latest TOP500 list.',
    publishedAt: '2026-06-24T04:01:42.000Z',
    tags: [{ tag: 'data' }, { tag: 'china' }, { tag: 'usa' }, { tag: 'supercomputer' }, { tag: 'technology' }],
    coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    isBreaking: false,
    isFeatured: false,
  },
];

// Helper to parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    url: 'http://localhost:3000',
    email: 'admin@pulefeed.tech',
    password: 'adminpassword123',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) config.url = args[i + 1].replace(/\/$/, '');
    if (args[i] === '--email' && args[i + 1]) config.email = args[i + 1];
    if (args[i] === '--password' && args[i + 1]) config.password = args[i + 1];
  }
  return config;
}

async function main() {
  const config = parseArgs();
  console.log(`🌐 Connecting to: ${config.url}`);
  console.log(`👤 Logging in as: ${config.email}`);

  let token;
  try {
    const res = await fetch(`${config.url}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: config.email, password: config.password }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    token = data.token;
    if (!token) throw new Error('Token not found in login response.');
    console.log('✓ Successfully logged in!');
  } catch (err) {
    console.error('❌ Login failed:', err.message);
    process.exit(1);
  }

  // 1. Find or create the Al Jazeera Staff author
  let authorId;
  try {
    const authorRes = await fetch(`${config.url}/api/authors?where[slug][equals]=aljazeera-staff`, {
      headers: { Authorization: `JWT ${token}` },
    });
    const authorData = await authorRes.json();
    
    const authorPayload = {
      name: 'Al Jazeera Staff',
      slug: 'aljazeera-staff',
      bio: "Latest news, analysis and features from Al Jazeera's global network.",
      role: 'International News Network',
      email: 'news@aljazeera.net',
    };

    if (authorData.docs && authorData.docs.length > 0) {
      authorId = authorData.docs[0].id;
      // Update
      const updateRes = await fetch(`${config.url}/api/authors/${authorId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorPayload),
      });
      if (!updateRes.ok) throw new Error(`Failed to update author: ${updateRes.statusText}`);
      console.log(`✓ Found and updated author "Al Jazeera Staff" (ID: ${authorId})`);
    } else {
      // Create
      const createRes = await fetch(`${config.url}/api/authors`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorPayload),
      });
      if (!createRes.ok) throw new Error(`Failed to create author: ${createRes.statusText}`);
      const newAuthor = await createRes.json();
      authorId = newAuthor.doc.id;
      console.log(`✓ Created author "Al Jazeera Staff" (ID: ${authorId})`);
    }
  } catch (err) {
    console.error('❌ Author operation failed:', err.message);
    process.exit(1);
  }

  // 2. Loop through and create/update articles
  console.log(`📰 Migrating ${aljazeeraArticles.length} articles...`);
  for (const item of aljazeeraArticles) {
    try {
      // Check if article exists
      const articleCheckRes = await fetch(`${config.url}/api/articles?where[slug][equals]=${item.slug}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      const checkData = await articleCheckRes.json();
      const exists = checkData.docs && checkData.docs.length > 0;

      const articlePayload = {
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: item.excerpt, version: 1 }],
              },
            ],
          },
        },
        status: 'published',
        publishedAt: item.publishedAt,
        isBreaking: item.isBreaking,
        isFeatured: item.isFeatured,
        credit: 'Al Jazeera',
        author: authorId,
        tags: item.tags,
      };

      if (!exists) {
        console.log(`➕ Creating article: "${item.title}"`);
        
        // 1x1 base64 transparent pixel to satisfy upload/media
        const blob = new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA6ie6hQAAAABJRU5ErkJggg==', 'base64')], { type: 'image/png' });
        
        const mediaForm = new FormData();
        mediaForm.append('alt', item.title);
        mediaForm.append('source', 'external');
        mediaForm.append('externalUrl', item.coverImageUrl);
        mediaForm.append('file', blob, `external-${item.slug}.png`);

        const mediaRes = await fetch(`${config.url}/api/media`, {
          method: 'POST',
          headers: { Authorization: `JWT ${token}` },
          body: mediaForm,
        });

        if (!mediaRes.ok) {
          const errMsg = await mediaRes.text();
          throw new Error(`Media creation failed: ${mediaRes.statusText} (${errMsg})`);
        }

        const mediaDoc = await mediaRes.json();
        articlePayload.coverImage = mediaDoc.doc.id;

        const createArticleRes = await fetch(`${config.url}/api/articles`, {
          method: 'POST',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articlePayload),
        });

        if (!createArticleRes.ok) {
          const errMsg = await createArticleRes.text();
          throw new Error(`Article creation failed: ${createArticleRes.statusText} (${errMsg})`);
        }
        console.log(`  ✓ Successfully created!`);
      } else {
        const existingDoc = checkData.docs[0];
        console.log(`🔄 Updating article: "${item.title}"`);
        
        const mediaId = typeof existingDoc.coverImage === 'object' ? existingDoc.coverImage.id : existingDoc.coverImage;

        if (mediaId) {
          // Update external media record
          const updateMediaRes = await fetch(`${config.url}/api/media/${mediaId}`, {
            method: 'PATCH',
            headers: {
              Authorization: `JWT ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              alt: item.title,
              source: 'external',
              externalUrl: item.coverImageUrl,
            }),
          });
          if (!updateMediaRes.ok) console.warn(`  ⚠️ Warning: Failed to update media record: ${updateMediaRes.statusText}`);
        }

        const updateArticleRes = await fetch(`${config.url}/api/articles/${existingDoc.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articlePayload),
        });

        if (!updateArticleRes.ok) {
          const errMsg = await updateArticleRes.text();
          throw new Error(`Article update failed: ${updateArticleRes.statusText} (${errMsg})`);
        }
        console.log(`  ✓ Successfully updated!`);
      }
    } catch (err) {
      console.error(`  ❌ Error processing "${item.title}":`, err.message);
    }
  }

  console.log('🎉 API News Migration completed successfully!');
}

main();
