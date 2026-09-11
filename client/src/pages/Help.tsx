import { Mail, Phone, MessageSquare, ChevronDown, HelpCircle, FileText } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does Zovio work?",
    answer: "Zovio connects you with trusted local professionals by listing their profiles with details like skills, experience, ratings, and contact info. Browse, find the right worker, and contact them directly."
  },
  {
    question: "Are the professionals verified?",
    answer: "Yes, all listed professionals undergo a strict background check and verification process to ensure your safety and quality of service."
  },
  {
    question: "What areas do you currently serve?",
    answer: "We currently list professionals within a 15km radius of Kakinada, Kathipudi, Annavaram, and Tuni."
  },
  {
    question: "How do I contact a worker?",
    answer: "Once you find a worker whose profile matches your needs, you can directly reach out to them using the contact details provided on their profile."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach out to us via WhatsApp at +91-9381534213, call us at +91-8897536435, or email us at support@zovio.com."
  }
];

export function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-surface-cream text-brand-deep-navy">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center justify-center rounded-full bg-brand-teal-soft p-3 text-brand-teal">
            <HelpCircle className="h-8 w-8" />
          </span>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-brand-deep-navy">
            How can we <span className="text-brand-orange-strong">help you?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-ink-soft">
            Find answers to common questions or reach out to our support team for assistance.
          </p>
        </div>

        {/* Contact Options */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-brand-deep-navy/10 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange-strong">
              <MessageSquare className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-extrabold">WhatsApp</h3>
            <p className="mt-2 text-sm text-ink-soft">Chat with our support team instantly.</p>
            <a href="https://wa.me/919381534213" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-xl bg-brand-orange px-5 py-2 text-sm font-extrabold text-brand-deep-navy transition-transform hover:-translate-y-0.5">
              Start Chat
            </a>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-brand-deep-navy/10 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal-soft text-brand-teal">
              <Mail className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-extrabold">Email Support</h3>
            <p className="mt-2 text-sm text-ink-soft">Get answers within 24 hours.</p>
            <a href="mailto:support@zovio.com" className="mt-4 font-bold text-brand-teal hover:underline">
              support@zovio.com
            </a>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-brand-deep-navy/10 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange-strong">
              <Phone className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-extrabold">Phone Support</h3>
            <p className="mt-2 text-sm text-ink-soft">Available 9 AM - 6 PM, Mon-Sat.</p>
            <a href="tel:+918897536435" className="mt-4 font-bold text-brand-orange-strong hover:underline">
              +91-8897536435
            </a>
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-teal" />
            <h2 className="font-display text-2xl font-extrabold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`overflow-hidden rounded-2xl border transition-colors ${openFaq === index ? 'border-brand-teal bg-white shadow-md' : 'border-brand-deep-navy/10 bg-white hover:border-brand-deep-navy/30'}`}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-brand-deep-navy">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-ink-soft transition-transform ${openFaq === index ? 'rotate-180 text-brand-teal' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
