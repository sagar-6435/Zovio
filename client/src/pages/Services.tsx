import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wrench, Snowflake, Car, Sparkles, Scissors, Laptop, 
  Truck, PartyPopper, GraduationCap, HeartPulse, Briefcase, 
  Store, Home, TreePine, ChevronRight, ArrowRight
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Route } from '../routes/services';

const serviceCategories = [
  {
    name: "Home & Repair",
    icon: <Wrench className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    hoverBorder: "hover:border-amber-300",
    services: [
      { name: "Electrician", image: "/images/electrician.jpg" },
      { name: "Plumber", image: "/images/plumber.jpg" },
      { name: "Carpenter", image: "/images/carpentry.jpg" },
      { name: "Painter", image: "/images/painting.jpg" },
      { name: "Mason", image: "https://loremflickr.com/400/300/mason,brick" },
      { name: "Tile Worker", image: "https://loremflickr.com/400/300/tiles" },
      { name: "False Ceiling Worker", image: "https://loremflickr.com/400/300/ceiling" },
      { name: "Waterproofing", image: "https://loremflickr.com/400/300/waterproofing" },
      { name: "Welding", image: "https://loremflickr.com/400/300/welding" },
      { name: "Glass & Aluminium Work", image: "https://loremflickr.com/400/300/glasswork" },
      { name: "Furniture Assembly", image: "https://loremflickr.com/400/300/furniture" },
      { name: "Furniture Repair", image: "https://loremflickr.com/400/300/woodworking" },
      { name: "Door & Window Repair", image: "https://loremflickr.com/400/300/door" },
      { name: "Modular Kitchen Work", image: "https://loremflickr.com/400/300/kitchen" },
      { name: "Interior Work", image: "https://loremflickr.com/400/300/interior" },
      { name: "Home Renovation", image: "https://loremflickr.com/400/300/renovation" },
      { name: "CCTV Installation", image: "https://loremflickr.com/400/300/cctv" },
      { name: "Solar Panel Installation", image: "https://loremflickr.com/400/300/solarpanel" },
      { name: "Water Tank Cleaning", image: "https://loremflickr.com/400/300/watertank" },
      { name: "Pest Control", image: "/images/pest_control.jpg" }
    ]
  },
  {
    name: "AC & Home Appliances",
    icon: <Snowflake className="w-6 h-6" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    hoverBorder: "hover:border-cyan-300",
    services: [
      { name: "AC Repair", image: "/images/ac_repair.jpg" },
      { name: "AC Installation", image: "https://loremflickr.com/400/300/airconditioner" },
      { name: "AC Gas Filling", image: "https://loremflickr.com/400/300/hvac" },
      { name: "AC Service", image: "https://loremflickr.com/400/300/acservice" },
      { name: "Refrigerator Repair", image: "https://loremflickr.com/400/300/refrigerator" },
      { name: "Washing Machine Repair", image: "https://loremflickr.com/400/300/washingmachine" },
      { name: "TV Repair", image: "https://loremflickr.com/400/300/television" },
      { name: "Microwave Repair", image: "https://loremflickr.com/400/300/microwave" },
      { name: "Chimney Repair", image: "https://loremflickr.com/400/300/chimney" },
      { name: "Gas Stove Repair", image: "https://loremflickr.com/400/300/gasstove" },
      { name: "Mixer Grinder Repair", image: "https://loremflickr.com/400/300/mixer" },
      { name: "RO/Water Purifier Repair", image: "https://loremflickr.com/400/300/waterpurifier" },
      { name: "Geyser Repair", image: "https://loremflickr.com/400/300/waterheater" },
      { name: "Cooler Repair", image: "https://loremflickr.com/400/300/aircooler" },
      { name: "Home Appliance Installation", image: "https://loremflickr.com/400/300/appliances" }
    ]
  },
  {
    name: "Vehicle Services",
    icon: <Car className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    hoverBorder: "hover:border-blue-300",
    services: [
      { name: "Car Mechanic", image: "https://loremflickr.com/400/300/mechanic" },
      { name: "Bike Mechanic", image: "https://loremflickr.com/400/300/motorcycle" },
      { name: "Auto Mechanic", image: "https://loremflickr.com/400/300/autorepair" },
      { name: "Car Service", image: "https://loremflickr.com/400/300/carservice" },
      { name: "Bike Service", image: "https://loremflickr.com/400/300/bikeservice" },
      { name: "Car Wash", image: "https://loremflickr.com/400/300/carwash" },
      { name: "Bike Wash", image: "https://loremflickr.com/400/300/bikewash" },
      { name: "Car Detailing", image: "https://loremflickr.com/400/300/cardetailing" },
      { name: "Denting & Painting", image: "https://loremflickr.com/400/300/autobody" },
      { name: "Tyre/Puncture Service", image: "https://loremflickr.com/400/300/tires" },
      { name: "Wheel Alignment", image: "https://loremflickr.com/400/300/wheelalignment" },
      { name: "Battery Replacement", image: "https://loremflickr.com/400/300/carbattery" },
      { name: "Car AC Repair", image: "https://loremflickr.com/400/300/carac" },
      { name: "Towing Service", image: "https://loremflickr.com/400/300/towtruck" },
      { name: "Roadside Assistance", image: "https://loremflickr.com/400/300/roadsideassistance" },
      { name: "Car/Bike Pickup & Drop", image: "https://loremflickr.com/400/300/transport" }
    ]
  },
  {
    name: "Cleaning & Maintenance",
    icon: <Sparkles className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    hoverBorder: "hover:border-purple-300",
    services: [
      { name: "House Cleaning", image: "/images/house_cleaning.jpg" },
      { name: "Deep Cleaning", image: "https://loremflickr.com/400/300/deepcleaning" },
      { name: "Bathroom Cleaning", image: "https://loremflickr.com/400/300/bathroom" },
      { name: "Kitchen Cleaning", image: "https://loremflickr.com/400/300/kitchencleaning" },
      { name: "Sofa Cleaning", image: "https://loremflickr.com/400/300/sofa" },
      { name: "Carpet Cleaning", image: "https://loremflickr.com/400/300/carpetcleaning" },
      { name: "Mattress Cleaning", image: "https://loremflickr.com/400/300/mattress" },
      { name: "Window Cleaning", image: "https://loremflickr.com/400/300/windowcleaning" },
      { name: "Water Tank Cleaning", image: "https://loremflickr.com/400/300/tankcleaning" },
      { name: "Office Cleaning", image: "https://loremflickr.com/400/300/officecleaning" },
      { name: "Commercial Cleaning", image: "https://loremflickr.com/400/300/commercialcleaning" },
      { name: "Move-in/Move-out Cleaning", image: "https://loremflickr.com/400/300/moving" },
      { name: "Garbage Removal", image: "https://loremflickr.com/400/300/garbage" }
    ]
  },
  {
    name: "Beauty & Personal Care",
    icon: <Scissors className="w-6 h-6" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    hoverBorder: "hover:border-pink-300",
    services: [
      { name: "Barber", image: "https://loremflickr.com/400/300/barber" },
      { name: "Hair Stylist", image: "https://loremflickr.com/400/300/hairstylist" },
      { name: "Salon at Home", image: "https://loremflickr.com/400/300/salon" },
      { name: "Beautician", image: "https://loremflickr.com/400/300/beautician" },
      { name: "Makeup Artist", image: "https://loremflickr.com/400/300/makeup" },
      { name: "Bridal Makeup", image: "https://loremflickr.com/400/300/bride" },
      { name: "Mehendi Artist", image: "https://loremflickr.com/400/300/mehendi" },
      { name: "Manicure/Pedicure", image: "https://loremflickr.com/400/300/manicure" },
      { name: "Hair Spa", image: "https://loremflickr.com/400/300/hairspa" },
      { name: "Facial", image: "https://loremflickr.com/400/300/facial" },
      { name: "Grooming Services", image: "https://loremflickr.com/400/300/grooming" }
    ]
  },
  {
    name: "Technology & Electronics",
    icon: <Laptop className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    hoverBorder: "hover:border-indigo-300",
    services: [
      { name: "Mobile Repair", image: "https://loremflickr.com/400/300/smartphone" },
      { name: "Laptop Repair", image: "https://loremflickr.com/400/300/laptop" },
      { name: "Computer Repair", image: "https://loremflickr.com/400/300/computer" },
      { name: "Printer Repair", image: "https://loremflickr.com/400/300/printer" },
      { name: "Software Installation", image: "https://loremflickr.com/400/300/software" },
      { name: "Windows Installation", image: "https://loremflickr.com/400/300/windows" },
      { name: "Data Recovery", image: "https://loremflickr.com/400/300/datarecovery" },
      { name: "CCTV Installation", image: "https://loremflickr.com/400/300/cctvcamera" },
      { name: "Wi-Fi Setup", image: "https://loremflickr.com/400/300/wifi" },
      { name: "Networking", image: "https://loremflickr.com/400/300/network" },
      { name: "Smart TV Setup", image: "https://loremflickr.com/400/300/smarttv" },
      { name: "Home Theatre Installation", image: "https://loremflickr.com/400/300/hometheater" },
      { name: "Computer Accessories", image: "https://loremflickr.com/400/300/keyboard" },
      { name: "Website Developer", image: "https://loremflickr.com/400/300/webdeveloper" },
      { name: "Graphic Designer", image: "https://loremflickr.com/400/300/graphicdesign" }
    ]
  },
  {
    name: "Moving & Logistics",
    icon: <Truck className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    hoverBorder: "hover:border-orange-300",
    services: [
      { name: "Movers & Packers", image: "https://loremflickr.com/400/300/movingboxes" },
      { name: "House Shifting", image: "https://loremflickr.com/400/300/movingtruck" },
      { name: "Office Shifting", image: "https://loremflickr.com/400/300/office" },
      { name: "Local Delivery", image: "https://loremflickr.com/400/300/delivery" },
      { name: "Mini Truck", image: "https://loremflickr.com/400/300/truck" },
      { name: "Auto/Transport Booking", image: "https://loremflickr.com/400/300/transportation" },
      { name: "Furniture Transportation", image: "https://loremflickr.com/400/300/movingfurniture" },
      { name: "Loading & Unloading", image: "https://loremflickr.com/400/300/loading" },
      { name: "Courier Services", image: "https://loremflickr.com/400/300/courier" },
      { name: "Packing Services", image: "https://loremflickr.com/400/300/packing" }
    ]
  },
  {
    name: "Events & Functions",
    icon: <PartyPopper className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    hoverBorder: "hover:border-red-300",
    services: [
      { name: "Event Planner", image: "https://loremflickr.com/400/300/event" },
      { name: "Photographer", image: "https://loremflickr.com/400/300/photographer" },
      { name: "Videographer", image: "https://loremflickr.com/400/300/videographer" },
      { name: "Wedding Photographer", image: "https://loremflickr.com/400/300/weddingphoto" },
      { name: "Birthday Photographer", image: "https://loremflickr.com/400/300/birthday" },
      { name: "DJ", image: "https://loremflickr.com/400/300/dj" },
      { name: "Caterer", image: "https://loremflickr.com/400/300/catering" },
      { name: "Decoration", image: "https://loremflickr.com/400/300/decoration" },
      { name: "Balloon Decoration", image: "https://loremflickr.com/400/300/balloons" },
      { name: "Flower Decoration", image: "https://loremflickr.com/400/300/flowers" },
      { name: "Stage Decoration", image: "https://loremflickr.com/400/300/stage" },
      { name: "Sound System", image: "https://loremflickr.com/400/300/speaker" },
      { name: "Lighting", image: "https://loremflickr.com/400/300/lighting" },
      { name: "Anchor/Host", image: "https://loremflickr.com/400/300/microphone" },
      { name: "Invitation Designer", image: "https://loremflickr.com/400/300/invitation" },
      { name: "Wedding Planner", image: "https://loremflickr.com/400/300/weddingplanner" }
    ]
  },
  {
    name: "Education & Training",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    hoverBorder: "hover:border-teal-300",
    services: [
      { name: "Home Tutor", image: "https://loremflickr.com/400/300/tutor" },
      { name: "School Tutor", image: "https://loremflickr.com/400/300/school" },
      { name: "College Tutor", image: "https://loremflickr.com/400/300/college" },
      { name: "Spoken English", image: "https://loremflickr.com/400/300/english" },
      { name: "Coding Trainer", image: "https://loremflickr.com/400/300/coding" },
      { name: "Computer Trainer", image: "https://loremflickr.com/400/300/computerclass" },
      { name: "Music Teacher", image: "https://loremflickr.com/400/300/music" },
      { name: "Dance Teacher", image: "https://loremflickr.com/400/300/dance" },
      { name: "Drawing Teacher", image: "https://loremflickr.com/400/300/drawing" },
      { name: "Fitness Trainer", image: "https://loremflickr.com/400/300/fitness" },
      { name: "Exam Preparation", image: "https://loremflickr.com/400/300/exam" },
      { name: "Skill Trainer", image: "https://loremflickr.com/400/300/training" }
    ]
  },
  {
    name: "Health & Wellness",
    icon: <HeartPulse className="w-6 h-6" />,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    hoverBorder: "hover:border-rose-300",
    services: [
      { name: "Physiotherapist", image: "https://loremflickr.com/400/300/physiotherapy" },
      { name: "Fitness Trainer", image: "https://loremflickr.com/400/300/gym" },
      { name: "Yoga Trainer", image: "https://loremflickr.com/400/300/yoga" },
      { name: "Nutrition Consultant", image: "https://loremflickr.com/400/300/nutrition" },
      { name: "Home Nursing", image: "https://loremflickr.com/400/300/nursing" },
      { name: "Elder Care", image: "https://loremflickr.com/400/300/eldercare" },
      { name: "Caretaker", image: "https://loremflickr.com/400/300/caregiver" },
      { name: "Pharmacy/Medical Stores", image: "https://loremflickr.com/400/300/pharmacy" },
      { name: "Diagnostic Services", image: "https://loremflickr.com/400/300/diagnostic" }
    ]
  },
  {
    name: "Professional Services",
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    hoverBorder: "hover:border-slate-300",
    services: [
      { name: "Accountant", image: "https://loremflickr.com/400/300/accountant" },
      { name: "Tax Consultant", image: "https://loremflickr.com/400/300/taxes" },
      { name: "Lawyer", image: "https://loremflickr.com/400/300/lawyer" },
      { name: "Legal Consultant", image: "https://loremflickr.com/400/300/law" },
      { name: "Architect", image: "https://loremflickr.com/400/300/architect" },
      { name: "Interior Designer", image: "https://loremflickr.com/400/300/interiordesign" },
      { name: "Graphic Designer", image: "https://loremflickr.com/400/300/design" },
      { name: "Web Developer", image: "https://loremflickr.com/400/300/programming" },
      { name: "Digital Marketer", image: "https://loremflickr.com/400/300/marketing" },
      { name: "Content Writer", image: "https://loremflickr.com/400/300/writing" },
      { name: "Photographer", image: "https://loremflickr.com/400/300/camera" },
      { name: "Videographer", image: "https://loremflickr.com/400/300/video" },
      { name: "Resume/CV Designer", image: "https://loremflickr.com/400/300/resume" },
      { name: "Career Consultant", image: "https://loremflickr.com/400/300/career" }
    ]
  },
  {
    name: "Local Businesses",
    icon: <Store className="w-6 h-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    hoverBorder: "hover:border-emerald-300",
    services: [
      { name: "Grocery Store", image: "https://loremflickr.com/400/300/grocery" },
      { name: "Supermarket", image: "https://loremflickr.com/400/300/supermarket" },
      { name: "Mobile Shop", image: "https://loremflickr.com/400/300/mobileshop" },
      { name: "Electronics Shop", image: "https://loremflickr.com/400/300/electronics" },
      { name: "Hardware Store", image: "https://loremflickr.com/400/300/hardware" },
      { name: "Furniture Shop", image: "https://loremflickr.com/400/300/furnitureshop" },
      { name: "Clothing Store", image: "https://loremflickr.com/400/300/clothing" },
      { name: "Bakery", image: "https://loremflickr.com/400/300/bakery" },
      { name: "Restaurant", image: "https://loremflickr.com/400/300/restaurant" },
      { name: "Cafe", image: "https://loremflickr.com/400/300/cafe" },
      { name: "Pharmacy", image: "https://loremflickr.com/400/300/pharmacy" },
      { name: "Salon", image: "https://loremflickr.com/400/300/salon" },
      { name: "Gym", image: "https://loremflickr.com/400/300/gym" },
      { name: "Coaching Center", image: "https://loremflickr.com/400/300/coaching" },
      { name: "Repair Shop", image: "https://loremflickr.com/400/300/repair" },
      { name: "Printing Shop", image: "https://loremflickr.com/400/300/printing" },
      { name: "Gift Shop", image: "https://loremflickr.com/400/300/gifts" },
      { name: "Florist", image: "https://loremflickr.com/400/300/florist" }
    ]
  },
  {
    name: "Real Estate & Rentals",
    icon: <Home className="w-6 h-6" />,
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    hoverBorder: "hover:border-sky-300",
    services: [
      { name: "Houses for Sale", image: "/images/property_selling.jpg" },
      { name: "Houses for Rent", image: "https://loremflickr.com/400/300/house" },
      { name: "Apartments", image: "https://loremflickr.com/400/300/apartment" },
      { name: "Flats", image: "https://loremflickr.com/400/300/flat" },
      { name: "Plots", image: "https://loremflickr.com/400/300/land" },
      { name: "Commercial Property", image: "https://loremflickr.com/400/300/commercial" },
      { name: "PG", image: "https://loremflickr.com/400/300/hostel" },
      { name: "Hostels", image: "https://loremflickr.com/400/300/hostel" },
      { name: "Shops for Rent", image: "https://loremflickr.com/400/300/shop" },
      { name: "Office Space", image: "https://loremflickr.com/400/300/office" },
      { name: "Land for Sale", image: "https://loremflickr.com/400/300/land" },
      { name: "Rental Property", image: "https://loremflickr.com/400/300/rental" },
      { name: "Real Estate Agents", image: "https://loremflickr.com/400/300/realtor" },
      { name: "Property Dealers", image: "https://loremflickr.com/400/300/realestate" }
    ]
  },
  {
    name: "Outdoor & Other Services",
    icon: <TreePine className="w-6 h-6" />,
    color: "text-lime-600",
    bgColor: "bg-lime-100",
    hoverBorder: "hover:border-lime-300",
    services: [
      { name: "Gardener", image: "https://loremflickr.com/400/300/gardener" },
      { name: "Landscaping", image: "https://loremflickr.com/400/300/landscape" },
      { name: "Tree Cutting", image: "https://loremflickr.com/400/300/tree" },
      { name: "Plant Maintenance", image: "https://loremflickr.com/400/300/plants" },
      { name: "Farm Workers", image: "https://loremflickr.com/400/300/farming" },
      { name: "Borewell Services", image: "https://loremflickr.com/400/300/waterwell" },
      { name: "Drilling Services", image: "https://loremflickr.com/400/300/drilling" },
      { name: "Security Guard", image: "https://loremflickr.com/400/300/security" },
      { name: "House Help", image: "https://loremflickr.com/400/300/maid" },
      { name: "Cook", image: "https://loremflickr.com/400/300/cooking" },
      { name: "Maid", image: "https://loremflickr.com/400/300/maid" },
      { name: "Driver", image: "https://loremflickr.com/400/300/driver" },
      { name: "Babysitter", image: "https://loremflickr.com/400/300/babysitter" },
      { name: "Pet Care", image: "https://loremflickr.com/400/300/pets" },
      { name: "Dog Walker", image: "https://loremflickr.com/400/300/dogwalker" },
      { name: "Pet Grooming", image: "https://loremflickr.com/400/300/petgrooming" }
    ]
  }
];

export default function Services() {
  const { q } = Route.useSearch();
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].name);

  const displayCategories = useMemo(() => {
    if (!q) return serviceCategories;
    const lowerQ = q.toLowerCase();
    
    return serviceCategories.map(cat => ({
      ...cat,
      services: cat.services.filter(s => 
        s.name.toLowerCase().includes(lowerQ) || 
        cat.name.toLowerCase().includes(lowerQ)
      )
    })).filter(cat => cat.services.length > 0);
  }, [q]);

  useEffect(() => {
    if (displayCategories.length > 0 && !displayCategories.find(c => c.name === activeCategory)) {
      setActiveCategory(displayCategories[0].name);
    }
  }, [displayCategories, activeCategory]);

  return (
    <div className="relative min-h-screen bg-surface-cream text-foreground overflow-hidden font-sans">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl opacity-60"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto pb-16 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar Navigation */}
          <div className="lg:w-1/4 flex flex-col gap-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-4 px-2">Categories</h2>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 hide-scrollbar">
              {displayCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center text-left w-full whitespace-nowrap lg:whitespace-normal px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                    activeCategory === cat.name 
                      ? `${cat.bgColor} ${cat.color} shadow-sm border border-white/50` 
                      : 'text-ink-soft hover:bg-white/50 hover:text-brand-deep-navy'
                  }`}
                >
                  <div className={`mr-3 ${activeCategory === cat.name ? cat.color : 'text-gray-400'}`}>
                    {cat.icon}
                  </div>
                  <span className="flex-grow">{cat.name}</span>
                  {activeCategory === cat.name && (
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="lg:w-3/4">
            {displayCategories.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-brand-deep-navy mb-2">No services found</h3>
                <p className="text-ink-soft">We couldn't find any services matching "{q}". Try another search term.</p>
              </div>
            )}
            {displayCategories.map((cat) => (
              <div 
                key={cat.name} 
                className={activeCategory === cat.name ? 'block' : 'hidden'}
              >
                <div className="flex items-center gap-4 mb-8 border-b border-gray-200/50 pb-4">
                  <div className={`w-12 h-12 rounded-xl ${cat.bgColor} ${cat.color} flex items-center justify-center shadow-inner`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-brand-deep-navy">{cat.name}</h2>
                    <p className="text-sm text-ink-soft">{cat.services.length} services available</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cat.services.map((service, idx) => (
                    <Link 
                      key={idx}
                      to="/partners"
                      search={{ service: service.name }}
                      className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl p-0 border border-white shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full ${cat.hoverBorder}`}
                    >
                      <div className="relative h-32 overflow-hidden bg-gray-100">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="relative z-10 p-4 flex flex-col flex-grow bg-white">
                        <h3 className="font-semibold text-brand-deep-navy group-hover:text-brand-orange-strong transition-colors duration-300 line-clamp-2">
                          {service.name}
                        </h3>
                        <div className="mt-auto pt-3 flex items-center text-xs font-semibold text-brand-teal group-hover:text-brand-orange-strong transition-colors duration-300">
                          Book now
                          <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
