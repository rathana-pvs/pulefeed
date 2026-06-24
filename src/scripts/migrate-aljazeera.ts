import { getPayload } from 'payload';
import config from '../../payload.config';

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

async function runMigration() {
  console.log('🏁 Starting Al Jazeera news migration script...');
  const payload = await getPayload({ config });

  // 1. Find or create the Al Jazeera Staff author
  console.log('👤 Finding or creating "Al Jazeera Staff" author...');
  let authorId: string | number;
  const existingAuthor = await payload.find({
    collection: 'authors',
    where: { slug: { equals: 'aljazeera-staff' } },
  });

  const authorData = {
    name: 'Al Jazeera Staff',
    slug: 'aljazeera-staff',
    bio: "Latest news, analysis and features from Al Jazeera's global network.",
    role: 'International News Network',
    email: 'news@aljazeera.net',
  };

  if (existingAuthor.docs.length === 0) {
    const createdAuthor = await payload.create({
      collection: 'authors',
      data: authorData,
      draft: false,
    });
    authorId = createdAuthor.id;
    console.log(`✓ Created author "Al Jazeera Staff" (ID: ${authorId})`);
  } else {
    authorId = existingAuthor.docs[0].id;
    // Update to make sure fields match
    await payload.update({
      collection: 'authors',
      id: authorId,
      data: authorData,
      draft: false,
    });
    console.log(`✓ Found and updated author "Al Jazeera Staff" (ID: ${authorId})`);
  }

  // 2. Loop through and create/update articles
  console.log(`📰 Processing ${aljazeeraArticles.length} articles...`);
  for (const item of aljazeeraArticles) {
    const existingArticle = await payload.find({
      collection: 'articles',
      where: { slug: { equals: item.slug } },
    });

    const articleData: any = {
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

    if (existingArticle.docs.length === 0) {
      console.log(`➕ Creating article: "${item.title}"`);
      
      // Create external media record
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: item.title,
          source: 'external',
          externalUrl: item.coverImageUrl,
        },
        file: {
          data: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA6ie6hQAAAABJRU5ErkJggg==', 'base64'),
          name: `external-${item.slug}.png`,
          mimetype: 'image/png',
          size: 70,
        },
      });

      articleData.coverImage = media.id;

      await payload.create({
        collection: 'articles',
        data: articleData,
        draft: false,
      });
      console.log(`  ✓ Successfully created article!`);
    } else {
      console.log(`🔄 Updating article: "${item.title}"`);
      const doc = existingArticle.docs[0];
      const mediaId = typeof doc.coverImage === 'object' ? (doc.coverImage as any).id : doc.coverImage;

      if (mediaId) {
        // Update external media record
        await payload.update({
          collection: 'media',
          id: mediaId,
          data: {
            alt: item.title,
            source: 'external',
            externalUrl: item.coverImageUrl,
          },
        });
      }

      await payload.update({
        collection: 'articles',
        id: doc.id,
        data: articleData,
        draft: false,
      });
      console.log(`  ✓ Successfully updated article!`);
    }
  }

  console.log('🎉 Migration completed successfully!');
  process.exit(0);
}

runMigration().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
