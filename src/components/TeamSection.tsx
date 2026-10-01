const TEAM = [
  {
    src: '/assets/advocate-ajay-gautam.png',
    alt: 'Advocate Ajay Gautam',
    name: 'Advocate Ajay Gautam',
    role: 'LL.B. • JUNIOR ASSOCIATE',
    desc: 'Assisting in case preparation, legal research, and district court proceedings under continuous mentorship.',
  },
  {
    src: '/assets/advocate-sandeep-gautam.png',
    alt: 'Advocate Sandeep Gautam',
    name: 'Advocate Sandeep Gautam',
    role: 'LL.B. • JUNIOR ASSOCIATE',
    desc: 'Assisting in case preparation, legal research, and district court proceedings under continuous mentorship.',
  },
  {
    src: '/assets/advocate-neeraj-singh.jpg',
    alt: 'Advocate Neeraj Singh',
    name: 'Advocate Neeraj Singh',
    role: 'LL.B. • JUNIOR ASSOCIATE',
    desc: 'Assisting in case preparation, legal research, and district court proceedings under continuous mentorship.',
  },
];

export default function TeamSection() {
  return (
    <section id="team" style={{ padding: '80px 5%', background: '#fcf8f0', borderTop: '1px solid #0001' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ color: '#b96818' }}>Team &amp; Mentorship</div>
        <h2>Guided Legal Minds.</h2>
        <p className="lead" style={{ marginBottom: 40, maxWidth: 700 }}>
          These advocates are my juniors. They work, learn, and grow under my direct guidance, ensuring thorough
          research and dedicated support for our clients.
        </p>
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TEAM.map((m) => (
            <div
              key={m.name}
              style={{
                background: '#fff',
                padding: 30,
                borderRadius: 12,
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: 320,
                textAlign: 'center',
              }}
            >
              <img
                src={m.src}
                alt={m.alt}
                style={{
                  width: '100%',
                  aspectRatio: '9/16',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  borderRadius: 8,
                  marginBottom: 20,
                  display: 'block',
                }}
              />
              <h3 style={{ margin: '0 0 5px', fontSize: 22 }}>{m.name}</h3>
              <div style={{ color: '#d9822b', fontWeight: 'bold', fontSize: 14, marginBottom: 12, letterSpacing: 1 }}>
                {m.role}
              </div>
              <p style={{ font: '15px/1.6 Arial', color: '#444' }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
