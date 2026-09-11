import { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wrench
} from "lucide-react";
import heroImage from "@/assets/panimatra-home.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Zovio | Connect. Get It Done." },
      {
        name: "description",
        content: "Connect with trusted local services and get it done.",
      },
      { property: "og:title", content: "Zovio | Connect. Get It Done." },
      {
        property: "og:description",
        content: "Connect with trusted local services and get it done.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [location, setLocation] = useState("Kakinada");
  const [isInServiceArea, setIsInServiceArea] = useState<boolean | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsInServiceArea(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let withinRange = false;
        
        for (const city of STARTUP_CITIES) {
          const distance = getDistanceFromLatLonInKm(latitude, longitude, city.lat, city.lon);
          if (distance <= 15) {
            withinRange = true;
            setLocation(city.name);
            break;
          }
        }
        
        setIsInServiceArea(withinRange);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsInServiceArea(false);
      }
    );
  }, []);
  const [query, setQuery] = useState("");
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const navigate = useNavigate({ from: "/" });

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return services;
    return services.filter((service) => service.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const toggleSaved = (name: string) => {
    setSavedProperties((current) =>
      current.includes(name) ? current.filter((property) => property !== name) : [...current, name],
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-cream text-brand-deep-navy">


      <main id="top">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="relative z-10 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-brand-teal">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Trusted around you
            </div>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-brand-deep-navy">
              Connect.<br /><span className="text-brand-orange-strong">Get It Done.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-ink-soft sm:text-lg">
              Your everyday needs, handled by trusted local professionals. From a quick repair to your next home, Zovio is here.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/services", search: { q: query } });
              }}
              className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-brand-deep-navy/10 bg-background p-2 shadow-xl focus-within:border-brand-orange-strong focus-within:ring-4 focus-within:ring-brand-orange/15"
            >
              <Search className="ml-3 h-5 w-5 shrink-0 text-brand-orange-strong" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm font-medium text-brand-deep-navy outline-none placeholder:text-ink-soft/70"
                placeholder="What do you need help with?"
                aria-label="Search services"
              />
              <button type="submit" className="rounded-xl bg-brand-orange px-4 py-3 text-sm font-extrabold text-brand-deep-navy transition-transform hover:-translate-y-0.5 sm:px-5">
                Search
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-bold text-ink-soft">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-teal" /> Police verified</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-brand-teal" /> 30-min dispatch</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-brand-orange text-brand-orange" /> 4.8 average</span>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-brand-teal-soft shadow-xl sm:min-h-[480px] lg:min-h-[560px]">
            <img src={heroImage} alt="Trusted Zovio professional ready to help at home" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-cream/75 via-transparent to-transparent lg:from-surface-cream/45" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-background/30 bg-brand-deep-navy/90 px-4 py-3 text-background shadow-lg backdrop-blur-sm sm:bottom-7 sm:left-7">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-brand-deep-navy"><BadgeCheck className="h-5 w-5" /></span>
              <div><p className="text-sm font-extrabold">Verified professionals</p><p className="mt-0.5 text-xs text-background/70">You can count on us</p></div>
            </div>
          </div>
        </section>

        {isInServiceArea === null ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-teal border-t-transparent"></div>
            <p className="mt-4 text-sm font-bold text-ink-soft">Checking your location...</p>
          </div>
        ) : isInServiceArea === false ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange-strong">
              <MapPin className="h-10 w-10" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.045em] text-brand-deep-navy sm:text-4xl">
              We will be there soon...
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-ink-soft">
              Currently, Zovio services are only available within a 15km radius of Kakinada, Kathipudi, Annavaram, and Tuni.
            </p>
          </div>
        ) : (
          <>
            <section id="services" className="border-y border-brand-deep-navy/10 bg-background">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange-strong">What can we help with?</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Everything local, in one place.</h2></div>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-teal transition-colors hover:text-brand-orange-strong">View all services <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {filteredServices.slice(0, 8).map((service) => {
                const Icon = service.icon;
                return <button key={service.name} type="button" onClick={() => setQuery(service.name)} className="group flex min-h-[128px] flex-col items-start justify-between rounded-2xl border border-brand-deep-navy/10 bg-surface-cream p-4 text-left transition-all hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-lg sm:min-h-[140px]">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${service.tone}`}><Icon className="h-5 w-5" /></span>
                  <span className="text-sm font-extrabold text-brand-deep-navy">{service.name}</span>
                  <span className="text-xs font-semibold text-ink-soft">{service.count} nearby</span>
                </button>;
              })}
            </div>
          </div>
        </section>

        <section id="properties" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-teal">For your next move</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Properties around you.</h2></div><button type="button" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-teal hover:text-brand-orange-strong">Explore properties <ArrowRight className="h-4 w-4" /></button></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {properties.map((property) => <article key={property.name} className="group overflow-hidden rounded-2xl border border-brand-deep-navy/10 bg-background shadow-xl transition-shadow hover:shadow-2xl">
              <div className={`relative flex h-44 items-end overflow-hidden ${property.imageTone} p-4`}>
                <div className="absolute -right-4 -top-10 h-40 w-40 rounded-full border-[18px] border-background/25" /><div className="absolute bottom-0 right-7 h-24 w-20 rounded-t-[2rem] bg-background/30" /><div className="absolute bottom-0 right-12 h-16 w-2 bg-background/45" />
                <span className="relative rounded-full bg-background/90 px-2.5 py-1 text-xs font-extrabold text-brand-deep-navy">{property.badge}</span>
                <button type="button" aria-label={`${savedProperties.includes(property.name) ? "Remove" : "Save"} ${property.name}`} onClick={() => toggleSaved(property.name)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-brand-deep-navy transition-colors hover:bg-brand-orange"><Star className={`h-4 w-4 ${savedProperties.includes(property.name) ? "fill-brand-orange-strong text-brand-orange-strong" : ""}`} /></button>
              </div>
              <div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-lg font-extrabold tracking-[-0.03em]">{property.name}</h3><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-ink-soft"><MapPin className="h-3.5 w-3.5 text-brand-orange-strong" />{property.location}</p></div><span className="text-sm font-extrabold text-brand-orange-strong">{property.price}</span></div><div className="mt-5 flex items-center justify-between border-t border-brand-deep-navy/10 pt-4 text-xs font-bold text-ink-soft"><span>{property.details}</span><span className="inline-flex items-center gap-1 text-brand-teal"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span></div></div>
            </article>)}
          </div>
        </section>
          </>
        )}

        <section id="how-it-works" className="bg-brand-deep-navy text-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-16"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange">Simple by design</p><h2 className="mt-3 max-w-sm font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">A better way to get things done.</h2></div><div className="grid gap-7 sm:grid-cols-3">{steps.map((step, index) => <div key={step.title} className="border-t border-background/20 pt-4"><span className="font-display text-3xl font-extrabold text-brand-orange">0{index + 1}</span><h3 className="mt-5 text-base font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-background/65">{step.description}</p></div>)}</div></div>
        </section>
      </main>

      <footer className="bg-brand-deep-navy px-5 pb-8 text-background sm:px-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-background/15 pt-7 text-sm text-background/60 sm:flex-row sm:items-center sm:justify-between"><span className="font-display font-extrabold text-background">Zovio</span><span>Connect. Get It Done. · Made for local communities</span><span className="inline-flex items-center gap-2"><Home className="h-4 w-4" /> {location}</span></div></footer>
    </div>
  );
}

const locations = ["Kakinada", "Kathipudi", "Tuni", "Annavaram"];
const services = [
  { name: "AC Repair", count: "42 pros", icon: Wrench, tone: "bg-brand-orange/20 text-brand-orange-strong" },
  { name: "Electrician", count: "38 pros", icon: Sparkles, tone: "bg-brand-teal-soft text-brand-teal" },
  { name: "Plumber", count: "26 pros", icon: SlidersHorizontal, tone: "bg-brand-orange/20 text-brand-orange-strong" },
  { name: "Cleaning", count: "31 pros", icon: Sparkles, tone: "bg-brand-teal-soft text-brand-teal" },
  { name: "Carpenter", count: "19 pros", icon: Building2, tone: "bg-brand-orange/20 text-brand-orange-strong" },
  { name: "Painting", count: "22 pros", icon: Home, tone: "bg-brand-teal-soft text-brand-teal" },
  { name: "Events", count: "16 pros", icon: CalendarDays, tone: "bg-brand-orange/20 text-brand-orange-strong" },
  { name: "Travels", count: "14 pros", icon: MapPin, tone: "bg-brand-teal-soft text-brand-teal" },
];
const properties = [
  { name: "Riverfront Residency", location: "Bhimavaram · 1.2 km away", price: "₹18L", details: "2 BHK · Ready to move", badge: "New listing", imageTone: "bg-brand-teal/70" },
  { name: "Palm Grove Homes", location: "Bhimavaram · 2.8 km away", price: "₹25L", details: "3 BHK · 1,420 sq ft", badge: "Verified owner", imageTone: "bg-brand-orange/75" },
  { name: "Lakshmi Enclave", location: "Bhimavaram · 4.1 km away", price: "₹12,500", details: "2 BHK · For rent", badge: "Popular", imageTone: "bg-brand-deep-navy/80" },
];
const steps = [
  { title: "Tell us what you need", description: "Choose a service or browse homes available in your neighbourhood." },
  { title: "Pick your trusted pro", description: "Compare ratings, verification, availability, and transparent pricing." },
  { title: "Relax, it’s handled", description: "Track the job from start to finish with support whenever you need it." },
];

const STARTUP_CITIES = [
  { name: "Kakinada", lat: 16.9654, lon: 82.2392 },
  { name: "Kathipudi", lat: 17.2500, lon: 82.3333 },
  { name: "Annavaram", lat: 17.2833, lon: 82.3833 },
  { name: "Tuni", lat: 17.3590, lon: 82.5461 },
];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}