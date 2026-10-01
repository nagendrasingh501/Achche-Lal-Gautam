export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div>
        <div className="pill">⌖ District Unnao, Uttar Pradesh</div>
        <h1>
          Justice with <em>clarity.</em>
        </h1>
        <p className="lead">
          I am <strong>Achche Lal Gautam</strong>, a District Court Lawyer in Unnao. I assist clients
          across criminal, land &amp; property, matrimonial, civil and related legal matters.
        </p>
        <div className="actions">
          <a className="btn" href="#consult">Request Consultation →</a>
          <a className="btn outline" href="#services">Explore Practice Areas</a>
        </div>
        <div className="stats">
          <div><span>Direct consultation</span></div>
          <div><span>Court representation</span></div>
          <div><span>Case-focused strategy</span></div>
        </div>
      </div>
      <div className="portrait-card">
        <img
          className="portrait"
          src="/assets/advocate-profile-achche-lal.png"
          alt="Achche Lal Gautam, District Court Lawyer"
        />
        <div className="caption">
          <strong>Achche Lal Gautam</strong>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>District Court • Unnao</span>
        </div>
      </div>
    </section>
  );
}
