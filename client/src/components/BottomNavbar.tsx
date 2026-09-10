import { Link, useLocation } from "@tanstack/react-router";
import { Home, Wrench, CalendarDays, User } from "lucide-react";

export function BottomNavbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Services", to: "/services", icon: <Wrench className="w-5 h-5" /> },
    { name: "Bookings", to: "/customer", icon: <CalendarDays className="w-5 h-5" /> },
    { name: "Profile", to: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          
          return (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 ${
                isActive ? "text-brand-orange-strong" : "text-ink-soft hover:text-brand-deep-navy"
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-brand-orange/10 scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-semibold transition-all duration-300 ${isActive ? "font-bold" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
