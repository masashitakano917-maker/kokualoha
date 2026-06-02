
import { useState, useEffect } from 'react';
import { ja as t } from './translations';


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GAS_URL = 'https://script.google.com/macros/s/AKfycby8OPSeTxlJUNqlxotg1KZZNwRkDr7jR4DC-_I2x3K3jiLeB-kSh9iLzID8K5wWX4Fz/exec';

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });

      setIsSubmitSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('送信中にエラーが発生しました。お手数ですが islandmakana@gmail.com まで直接ご連絡いただけますと幸いです。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'service', label: t.nav_service },
    { id: 'about', label: t.nav_about },
    { id: 'greeting', label: t.nav_greeting },
    { id: 'company', label: t.nav_company },
    { id: 'contact', label: t.nav_contact },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0c]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/90 backdrop-blur-md border-b border-[#d4af3715] safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between lg:grid lg:grid-cols-3">
          <div className="flex justify-start">
            <button onClick={() => scrollTo('top')} className="font-serif text-xl sm:text-2xl font-semibold tracking-wider gold-text">
              {t.brand}
            </button>
          </div>

          <nav className="hidden lg:flex items-center justify-center space-x-10 text-[11px] font-medium tracking-[0.25em]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="hover:text-[#d4af37] transition-colors duration-300 uppercase text-[#e6e4df]/80 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end">
            <button
              className="lg:hidden p-1.5 text-[#d4af37] hover:bg-[#d4af370d] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0b0b0c]/98 backdrop-blur-lg border-b border-[#d4af3715] transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="px-6 py-10 flex flex-col space-y-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-base uppercase font-medium tracking-[0.25em] border-l border-transparent hover:border-[#d4af37] hover:pl-4 transition-all duration-300 text-left text-[#e6e4df]/80"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&q=80&w=2000"
            alt="Hawaii Ocean View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/70 via-[#0b0b0c]/40 to-[#0b0b0c]" />
        </div>

        <div className="relative z-10 text-center w-full max-w-5xl px-4 sm:px-6 hero-animate">
          <h1 className="font-serif leading-[1.4] mb-10 tracking-wide"
              style={{
                fontSize: 'clamp(1.15rem, 6.2vw, 4rem)',
              }}>
            <div className="flex flex-col items-center px-4">
              <span className="block mb-3 whitespace-nowrap">
                {t.hero_title_line1}
              </span>
              <span className="block gold-text whitespace-nowrap">
                {t.hero_title_line2}
              </span>
            </div>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
            <button
              onClick={() => scrollTo('service')}
              className="w-64 sm:w-auto px-12 py-4 gold-btn text-[#0b0b0c] font-bold rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-[#d4af3720] text-sm tracking-wider"
            >
              サービスを見る
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="w-64 sm:w-auto px-12 py-4 border border-[#d4af3766] text-[#d4af37] font-bold rounded-xl hover:bg-[#d4af370d] hover:border-[#d4af37] transition-all duration-300 text-sm tracking-wider"
            >
              お問い合わせ
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 cursor-pointer" onClick={() => scrollTo('service')}>
          <div className="scroll-down-indicator" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 sm:py-40 px-4 sm:px-6 bg-[#0c0d0e]">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-6 sm:mb-10 tracking-wider">{t.about_title}</h2>
          <div className="w-20 h-[2px] gold-divider mx-auto mb-12 sm:mb-16" />
          <div className="space-y-12">
            <p className="text-xl sm:text-2xl gold-text font-medium leading-relaxed max-w-3xl mx-auto">
              Made in Hawaii を大切に、現地に根差した信頼できる<br />コンシェルジュサポートをご提供します。
            </p>
            <div className="space-y-8 opacity-70 leading-[1.9] text-sm sm:text-base max-w-3xl mx-auto text-left">
              {t.about_desc_long.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="service" className="py-24 sm:py-40 px-4 sm:px-6 bg-[#0b0b0c]">
        <div className="max-w-7xl mx-auto text-center mb-20 fade-in-section">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-5 tracking-wider">{t.service_title}</h2>
          <p className="gold-text tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-16 font-medium">{t.service_subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { title: t.svc1_title, desc: t.svc1_desc, icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c.456 1.621 1.152 3.026 2.188 4.238 1.04 1.216 2.356 2.028 3.691 2.689C13.69 13.51 11.233 11.751 11 9' },
              { title: t.svc2_title, desc: t.svc2_desc, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { title: t.svc3_title, desc: t.svc3_desc, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
              { title: t.svc4_title, desc: t.svc4_desc, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: t.svc5_title, desc: t.svc5_desc, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { title: t.svc6_title, desc: t.svc6_desc, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map((svc, i) => (
              <div key={i} className="group card-luxury bg-[#131415] p-9 sm:p-11 rounded-2xl border border-[#d4af3712] hover:border-[#d4af3740] text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#d4af370d] rounded-xl flex items-center justify-center mb-7 sm:mb-9 group-hover:bg-[#d4af37] transition-colors duration-500">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37] group-hover:text-[#0b0b0c] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svc.icon} />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 tracking-wide">{svc.title}</h3>
                <p className="opacity-50 text-xs sm:text-sm leading-[1.8]">{svc.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 opacity-30 italic text-xs sm:text-sm px-4 tracking-wide">{t.service_note_more}</p>
        </div>
      </section>

      {/* Greeting */}
      <section id="greeting" className="py-24 sm:py-40 px-4 sm:px-6 bg-[#0e0f10]">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-6 tracking-wider">{t.greeting_title}</h2>
          <div className="w-20 h-[2px] gold-divider mx-auto mb-14" />
          <div className="card-luxury bg-[#131415] p-10 sm:p-20 rounded-[2rem] border border-[#d4af3712] max-w-3xl mx-auto relative overflow-hidden">
            <p className="gold-text font-semibold text-lg sm:text-xl mb-12 leading-tight whitespace-pre-wrap relative z-10">{t.greeting_name}</p>
            <div className="space-y-7 opacity-70 leading-[1.9] text-sm sm:text-base italic text-left relative z-10">
              {t.greeting_body_long.split('\n\n').map((para, i) => (<p key={i}>"{para}"</p>))}
            </div>
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className="py-24 sm:py-40 px-4 sm:px-6 bg-[#0c0d0e]">
        <div className="max-w-4xl mx-auto fade-in-section">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-6 tracking-wider">{t.company_title}</h2>
            <div className="w-20 h-[2px] gold-divider mx-auto" />
          </div>

          <div className="card-luxury bg-[#131415] border border-[#d4af3712] rounded-[2rem] overflow-hidden">
            {[
              { label: t.company_name_label, value: t.company_name_value },
              { label: t.company_address_label, value: t.company_address_value },
              { label: t.company_rep_label, value: t.company_rep_value },
              { label: t.company_biz_label, value: t.company_biz_value },
            ].map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row border-b border-[#d4af370d] last:border-0`}>
                <div className="sm:w-1/3 bg-[#d4af3705] px-9 py-7 text-[#d4af37] font-medium text-xs tracking-[0.2em] uppercase">
                  {row.label}
                </div>
                <div className="sm:w-2/3 px-9 py-7 text-[#e6e4df]/70 text-sm sm:text-base leading-relaxed">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-40 px-4 sm:px-6 bg-[#0b0b0c]">
        <div className="max-w-4xl mx-auto fade-in-section text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-5 tracking-wider">{t.contact_title}</h2>
          <p className="gold-text mb-20 text-sm tracking-wider">{t.contact_subtitle}</p>

          {isSubmitSuccess ? (
            <div className="card-luxury bg-[#131415] border border-[#d4af3740] rounded-[2rem] p-14 sm:p-20">
              <div className="w-20 h-20 bg-[#d4af370d] rounded-full flex items-center justify-center mx-auto mb-10">
                <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold mb-5 gold-text">お問い合わせありがとうございます</h3>
              <p className="text-[#e6e4df]/70 mb-10 leading-[1.9]">
                内容を確認し、24時間以内に担当スタッフより折り返しご連絡させていただきます。<br className="hidden sm:block" />
                自動返信メールが届いておりますので、あわせてご確認ください。
              </p>
              <button
                onClick={() => setIsSubmitSuccess(false)}
                className="gold-text font-medium border-b border-[#d4af37] pb-1 hover:opacity-70 transition-opacity duration-300"
              >
                フォームに戻る
              </button>
            </div>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left" onSubmit={handleContactSubmit}>
              <input name="name" type="text" placeholder={t.contact_name} className="bg-[#131415] border border-[#d4af3715] rounded-xl px-6 py-5 focus:border-[#d4af3766] outline-none transition-all duration-300 text-sm text-[#e6e4df]" required />
              <input name="email" type="email" placeholder={t.contact_email} className="bg-[#131415] border border-[#d4af3715] rounded-xl px-6 py-5 focus:border-[#d4af3766] outline-none transition-all duration-300 text-sm text-[#e6e4df]" required />
              <input name="phone" type="tel" placeholder={t.contact_phone} className="bg-[#131415] md:col-span-2 border border-[#d4af3715] rounded-xl px-6 py-5 focus:border-[#d4af3766] outline-none transition-all duration-300 text-sm text-[#e6e4df]" />
              <textarea name="message" rows={6} placeholder={t.contact_message} className="bg-[#131415] md:col-span-2 border border-[#d4af3715] rounded-xl px-6 py-5 focus:border-[#d4af3766] outline-none transition-all duration-300 resize-none text-sm text-[#e6e4df]" required />
              <div className="md:col-span-2 flex justify-center pt-8">
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-16 py-5 gold-btn text-[#0b0b0c] font-bold rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-[#d4af3715] disabled:opacity-50 text-sm tracking-wider">
                  {isSubmitting ? '送信中...' : t.contact_send}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050607] pt-24 pb-14 px-6 border-t border-[#d4af370d]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <button onClick={() => scrollTo('top')} className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider mb-10 gold-text">{t.brand}</button>
          <div className="text-center opacity-25 text-[9px] sm:text-[10px] tracking-[0.3em] font-medium border-t border-[#d4af370d] pt-10 w-full max-w-lg">
            {t.footer_copyright} {t.footer_rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
