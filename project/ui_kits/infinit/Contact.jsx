// Contact.jsx — Contact view with form
function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="inf-contact">
      <div className="inf-contact__left">
        <div className="inf-eyebrow">Contact</div>
        <h2 className="inf-contact__head">
          Tell us what<br/>you're building.
        </h2>
        <p className="inf-contact__body">
          We typically reply within two business days. For engagements,
          please share scope, timeline and the practice you're considering — Studio or Advisory.
        </p>
        <div className="inf-contact__meta">
          <div><span className="inf-eyebrow">Studio &amp; Advisory</span><a>hello@weareinfinit.com</a></div>
          <div><span className="inf-eyebrow">Direct</span><a>+34 689 022 383</a></div>
          <div><span className="inf-eyebrow">Based</span><span>Barcelona · Remote</span></div>
        </div>
      </div>
      <form className="inf-contact__form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
        {sent ? (
          <div className="inf-contact__sent">
            <div className="inf-eyebrow">Received</div>
            <h3>Thanks. Gràcies. Merci.</h3>
            <p>We'll be in touch shortly.</p>
          </div>
        ) : (
          <>
            <label>Name<input required placeholder="Jane Doe"/></label>
            <label>Company<input placeholder="Acme Group"/></label>
            <label>Email<input required type="email" placeholder="jane@acme.com"/></label>
            <label>Practice
              <select defaultValue="studio">
                <option value="studio">Studio — Strategy, Identity, Digital</option>
                <option value="advisory">Advisory — Architecture, Data, AI</option>
                <option value="both">Both</option>
              </select>
            </label>
            <label className="inf-contact__brief">Brief<textarea rows={5} placeholder="Tell us what you're building, and what you'd like Infinit's role to be."/></label>
            <button className="inf-btn inf-btn--primary" type="submit">Send <span className="inf-arrow">→</span></button>
          </>
        )}
      </form>
    </section>
  );
}
window.Contact = Contact;
