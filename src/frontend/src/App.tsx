import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import {
  CheckCircle,
  ChevronDown,
  DollarSign,
  Facebook,
  Flame,
  Instagram,
  Leaf,
  Menu,
  Minus,
  Plus,
  Shield,
  ShoppingCart,
  Trash2,
  Twitter,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/* ─── Types ─── */
interface MenuItem {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  price: number;
  image: string;
  category: "high-protein" | "weight-loss" | "muscle-gain";
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

/* ─── Data ─── */
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Chicken Bowl",
    kcal: 450,
    protein: 40,
    price: 299,
    image: "/assets/generated/grilled-chicken-bowl.dim_600x400.jpg",
    category: "high-protein",
  },
  {
    id: 2,
    name: "Paneer Protein Bowl",
    kcal: 380,
    protein: 32,
    price: 249,
    image: "/assets/generated/paneer-protein-bowl.dim_600x400.jpg",
    category: "high-protein",
  },
  {
    id: 3,
    name: "Salmon Veggie Bowl",
    kcal: 520,
    protein: 45,
    price: 349,
    image: "/assets/generated/salmon-veggie-bowl.dim_600x400.jpg",
    category: "high-protein",
  },
  {
    id: 4,
    name: "Quinoa Salad",
    kcal: 280,
    protein: 18,
    price: 199,
    image: "/assets/generated/quinoa-salad.dim_600x400.jpg",
    category: "weight-loss",
  },
  {
    id: 5,
    name: "Egg White Omelette",
    kcal: 220,
    protein: 28,
    price: 179,
    image: "/assets/generated/egg-white-omelette.dim_600x400.jpg",
    category: "weight-loss",
  },
  {
    id: 6,
    name: "Paneer Weight Bowl",
    kcal: 320,
    protein: 30,
    price: 229,
    image: "/assets/generated/paneer-protein-bowl.dim_600x400.jpg",
    category: "weight-loss",
  },
  {
    id: 7,
    name: "Beef Muscle Bowl",
    kcal: 680,
    protein: 55,
    price: 399,
    image: "/assets/generated/beef-muscle-bowl.dim_600x400.jpg",
    category: "muscle-gain",
  },
  {
    id: 8,
    name: "Grilled Chicken Bowl",
    kcal: 450,
    protein: 40,
    price: 299,
    image: "/assets/generated/grilled-chicken-bowl.dim_600x400.jpg",
    category: "muscle-gain",
  },
  {
    id: 9,
    name: "Salmon Veggie Bowl",
    kcal: 520,
    protein: 45,
    price: 349,
    image: "/assets/generated/salmon-veggie-bowl.dim_600x400.jpg",
    category: "muscle-gain",
  },
];

const plans = [
  {
    id: "weekly",
    name: "Weekly Starter",
    price: "₹1,499",
    period: "/week",
    popular: false,
    // Replace with your Stripe Payment Link
    stripeUrl: "https://buy.stripe.com/test_placeholder_weekly",
    features: [
      "5 meals per week",
      "1 cuisine type",
      "Basic macro tracking",
      "Email support",
      "Standard delivery",
    ],
  },
  {
    id: "monthly-pro",
    name: "Monthly Pro",
    price: "₹4,999",
    period: "/month",
    popular: true,
    // Replace with your Stripe Payment Link
    stripeUrl: "https://buy.stripe.com/test_placeholder_monthly_pro",
    features: [
      "20 meals per month",
      "3 cuisine types",
      "Full macro tracking",
      "Priority support",
      "Flexible scheduling",
    ],
  },
  {
    id: "monthly-elite",
    name: "Monthly Elite",
    price: "₹8,999",
    period: "/month",
    popular: false,
    // Replace with your Stripe Payment Link
    stripeUrl: "https://buy.stripe.com/test_placeholder_monthly_elite",
    features: [
      "30 meals per month",
      "All cuisines",
      "Custom macro targets",
      "Dedicated coach",
      "Free delivery always",
    ],
  },
];

const whyUs = [
  {
    icon: CheckCircle,
    label: "Macro-Counted Meals",
    text: "Every dish is precision-tracked for calories, protein, carbs & fat.",
  },
  {
    icon: DollarSign,
    label: "Affordable Pricing",
    text: "Premium nutrition without the premium price tag. Plans from ₹179.",
  },
  {
    icon: Flame,
    label: "Fresh Daily Cooking",
    text: "Prepared fresh every morning by certified nutrition-trained chefs.",
  },
  {
    icon: Shield,
    label: "No Preservatives",
    text: "100% natural ingredients. Zero artificial additives or preservatives.",
  },
];

const footerSocials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
];

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );

    const els = document.querySelectorAll(".reveal");
    for (const el of els) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

/* ─── CartDrawer ─── */
function CartDrawer({
  cart,
  updateQty,
  removeFromCart,
  clearCart,
}: {
  cart: CartItem[];
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    toast.success("Redirecting to secure payment...");
    // Replace with your Stripe Payment Link
    setTimeout(() => {
      window.location.href = "https://buy.stripe.com/test_placeholder";
    }, 800);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          data-ocid="cart.open_modal_button"
          aria-label="Open cart"
          className="relative p-2 rounded-lg text-gray-700 hover:text-green-700 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.47 0.13 152)" }}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        data-ocid="cart.sheet"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle className="flex items-center gap-2 font-black text-gray-900">
            <ShoppingCart
              className="w-5 h-5"
              style={{ color: "oklch(0.47 0.13 152)" }}
            />
            Your Cart
            {totalItems > 0 && (
              <span
                className="ml-1 px-2 py-0.5 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: "oklch(0.47 0.13 152)" }}
              >
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div
              data-ocid="cart.empty_state"
              className="flex flex-col items-center justify-center h-full text-center py-16"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "oklch(0.97 0.02 152)" }}
              >
                <ShoppingCart
                  className="w-10 h-10"
                  style={{ color: "oklch(0.65 0.1 152)" }}
                />
              </div>
              <p className="font-black text-gray-900 text-lg mb-1">
                Cart is empty
              </p>
              <p className="text-gray-500 text-sm">
                Add some delicious meals to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, i) => (
                <li
                  key={item.id}
                  data-ocid={`cart.item.${i + 1}`}
                  className="flex gap-3 items-start bg-white rounded-2xl border border-gray-100 p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                      {item.name}
                    </p>
                    <p
                      className="font-black text-sm mb-2"
                      style={{ color: "oklch(0.47 0.13 152)" }}
                    >
                      ₹{item.price}
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-ocid={`cart.qty_minus.button.${i + 1}`}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          item.qty <= 1
                            ? removeFromCart(item.id)
                            : updateQty(item.id, item.qty - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        data-ocid={`cart.qty_plus.button.${i + 1}`}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-black text-gray-900 text-sm">
                      ₹{item.price * item.qty}
                    </p>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${i + 1}`}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-black text-xl text-gray-900">₹{total}</span>
            </div>
            <p className="text-xs text-gray-400">
              Taxes & delivery fee calculated at checkout.
            </p>
            {/* Payment methods */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Pay via</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                💳 Card
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                📱 UPI
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                🏦 Net Banking
              </span>
            </div>
            {/* Place Order */}
            <button
              type="button"
              data-ocid="cart.place_order.button"
              className="btn-green w-full py-4 text-base font-black tracking-wide"
              onClick={handlePlaceOrder}
            >
              🛒 PLACE ORDER — ₹{total}
            </button>
            <button
              type="button"
              data-ocid="cart.clear.button"
              className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ─── Navbar ─── */
function Navbar({
  cart,
  updateQty,
  removeFromCart,
  clearCart,
}: {
  cart: CartItem[];
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "HOME", href: "#home" },
    { label: "MENU", href: "#menu" },
    { label: "SUBSCRIBE", href: "#plans" },
    { label: "WHY US", href: "#why-us" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.47 0.13 152)" }}
            >
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-xl font-black tracking-tight"
              style={{ color: "oklch(0.47 0.13 152)" }}
            >
              MacroMeals
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase().replace(" ", "-")}.link`}
                className="text-xs font-semibold tracking-widest text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#plans"
              data-ocid="nav.get_started.button"
              className="btn-green text-xs py-2.5 px-5"
            >
              GET STARTED
            </a>
            {/* Cart Icon */}
            <CartDrawer
              cart={cart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          </nav>

          {/* Mobile: cart + toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <CartDrawer
              cart={cart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700"
              onClick={() => setOpen(!open)}
              data-ocid="nav.mobile_menu.toggle"
              aria-label="Toggle navigation"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold tracking-wider text-gray-700 py-1"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  document
                    .getElementById("plans")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-green text-center"
              >
                GET STARTED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10, 20, 14, 0.7)" }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="section-label text-white/70 mb-4 tracking-[0.3em]">
            FITNESS DIET CLOUD KITCHEN
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none mb-4">
            <span style={{ color: "oklch(0.65 0.16 152)" }}>FUEL YOUR</span>
            <br />
            <span style={{ color: "oklch(0.65 0.16 152)" }}>FITNESS.</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            DELIVERED FRESH.
          </h2>
          <p className="text-lg sm:text-xl text-white/75 font-medium mb-10 tracking-wide">
            Eat Clean. Stay Lean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              data-ocid="hero.explore_menu.button"
              className="btn-green px-8 py-4 text-base"
            >
              EXPLORE MENU
            </a>
            <a
              href="#plans"
              data-ocid="hero.view_plans.button"
              className="btn-outline-white px-8 py-4 text-base"
            >
              VIEW PLANS
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="text-white/50 hover:text-white/80 transition-colors"
          >
            <ChevronDown className="w-7 h-7 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <p className="section-label mb-3">WHO WE ARE</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Precision Nutrition,
              <br />
              <span style={{ color: "oklch(0.47 0.13 152)" }}>
                Perfected For You.
              </span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              MacroMeals is India's first fitness-focused cloud kitchen that
              delivers chef-prepared, macro-balanced meals directly to your
              doorstep. We believe eating healthy should never be a compromise
              on taste or convenience.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Zap, label: "High Protein", value: "40g+" },
                { icon: Flame, label: "Low Calories", value: "220 kcal" },
                { icon: Leaf, label: "Fresh Daily", value: "100%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl"
                  style={{ backgroundColor: "oklch(0.97 0.02 152)" }}
                >
                  <stat.icon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "oklch(0.47 0.13 152)" }}
                  />
                  <p
                    className="text-xl font-black"
                    style={{ color: "oklch(0.47 0.13 152)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#menu"
              data-ocid="about.explore_menu.button"
              className="btn-green"
            >
              EXPLORE MENU
            </a>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="relative">
              <img
                src="/assets/generated/about-image.dim_700x500.jpg"
                alt="Fresh healthy meals prepared by MacroMeals chefs"
                className="rounded-3xl w-full object-cover shadow-card"
                style={{ aspectRatio: "7/5" }}
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.47 0.13 152)" }}
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">
                    FSSAI Certified
                  </p>
                  <p className="text-xs text-gray-500">
                    Safe & Hygienic Kitchen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Menu ─── */
type MenuCategory = "high-protein" | "weight-loss" | "muscle-gain";

const categoryLabels: Record<MenuCategory, string> = {
  "high-protein": "High Protein",
  "weight-loss": "Weight Loss",
  "muscle-gain": "Muscle Gain",
};

function MenuSection({ addToCart }: { addToCart: (item: CartItem) => void }) {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("high-protein");

  const filtered = menuItems.filter((m) => m.category === activeCategory);

  return (
    <section
      id="menu"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(0.975 0.005 152)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <p className="section-label mb-3">FRESH & NUTRITIOUS</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            EXPLORE OUR MENU
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every meal crafted with purpose. Choose your goal and let us fuel
            your journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {(Object.keys(categoryLabels) as MenuCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid={`menu.${cat}.tab`}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? "text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              style={
                activeCategory === cat
                  ? { backgroundColor: "oklch(0.47 0.13 152)" }
                  : {}
              }
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((item, i) => (
              <div
                key={`${item.id}-${item.category}`}
                data-ocid={`menu.item.${i + 1}`}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "oklch(0.95 0.03 152)",
                        color: "oklch(0.35 0.12 152)",
                      }}
                    >
                      🔥 {item.kcal} kcal
                    </span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "oklch(0.95 0.03 152)",
                        color: "oklch(0.35 0.12 152)",
                      }}
                    >
                      💪 {item.protein}g protein
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-black"
                      style={{ color: "oklch(0.27 0.09 152)" }}
                    >
                      ₹{item.price}
                    </span>
                    <button
                      type="button"
                      data-ocid={`menu.add_to_cart.button.${i + 1}`}
                      className="btn-green text-xs py-2 px-4"
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          qty: 1,
                          image: item.image,
                        });
                        toast.success(`${item.name} added to cart! 🛒`);
                      }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5 inline" />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Plans ─── */
function Plans() {
  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    toast.success(`Redirecting to checkout for ${plan.name}...`);
    // Replace with your Stripe Payment Link
    setTimeout(() => {
      window.location.href = plan.stripeUrl;
    }, 800);
  };

  return (
    <section id="plans" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">FLEXIBLE PRICING</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            SUBSCRIPTION PLANS
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose the plan that matches your fitness goals. Cancel or upgrade
            anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              data-ocid={`plans.item.${i + 1}`}
              className={`reveal reveal-delay-${i + 1} rounded-3xl overflow-hidden flex flex-col ${
                plan.popular
                  ? "shadow-card-hover scale-105 z-10"
                  : "shadow-card"
              }`}
            >
              <div
                className="p-7"
                style={{
                  backgroundColor: plan.popular
                    ? "oklch(0.27 0.09 152)"
                    : "oklch(0.97 0.02 152)",
                }}
              >
                {plan.popular && (
                  <span
                    className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full bg-white mb-4"
                    style={{ color: "oklch(0.27 0.09 152)" }}
                  >
                    ✦ MOST POPULAR
                  </span>
                )}
                <h3
                  className={`text-xl font-black mb-1 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span
                    className={`text-4xl font-black ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium mb-1.5 ${
                      plan.popular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="bg-white flex-1 p-7">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "oklch(0.47 0.13 152)" }}
                      />
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  data-ocid={`plans.select.button.${i + 1}`}
                  className="w-full btn-green py-3"
                  onClick={() => handleSelectPlan(plan)}
                >
                  SELECT PLAN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Us ─── */
function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(0.975 0.005 152)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">OUR PROMISE</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            WHY CHOOSE US
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're not just another meal delivery service. We're your fitness
            partner.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item, i) => (
            <div
              key={item.label}
              data-ocid={`why_us.item.${i + 1}`}
              className={`reveal reveal-delay-${i + 1} text-center bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "oklch(0.95 0.04 152)" }}
              >
                <item.icon
                  className="w-8 h-8"
                  style={{ color: "oklch(0.47 0.13 152)" }}
                />
              </div>
              <h3 className="font-black text-gray-900 text-base mb-2">
                {item.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Band ─── */
function CTABand() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "oklch(0.27 0.09 152)" }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center reveal">
        <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
          READY TO EAT HEALTHY?
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Join 10,000+ fitness enthusiasts who trust MacroMeals for their daily
          nutrition.
        </p>
        <a
          href="#plans"
          data-ocid="cta_band.get_meals.button"
          className="btn-outline-white px-10 py-4 text-base"
        >
          GET YOUR MEALS
        </a>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">GET IN TOUCH</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            CONTACT US
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <form
            data-ocid="contact.form"
            onSubmit={handleSubmit}
            className="reveal space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                data-ocid="contact.name.input"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                data-ocid="contact.email.input"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                required
                rows={5}
                placeholder="Tell us about your fitness goals..."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              data-ocid="contact.submit.button"
              disabled={submitting}
              className="btn-green w-full py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>

          <div className="reveal reveal-delay-2">
            <h3 className="text-xl font-black text-gray-900 mb-3">
              Connect With Us
            </h3>
            <p className="text-gray-500 mb-8">
              Follow us for daily macro tips, new menu launches, and fitness
              motivation.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-ocid={`contact.${s.label.toLowerCase()}.link`}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-card transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.95 0.04 152)" }}
                  >
                    <s.icon
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      style={{ color: "oklch(0.47 0.13 152)" }}
                    />
                  </div>
                  <span className="font-semibold text-gray-700 text-sm">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
            <div
              className="mt-8 p-6 rounded-2xl"
              style={{ backgroundColor: "oklch(0.97 0.02 152)" }}
            >
              <p className="font-bold text-gray-900 mb-1">📍 Our Kitchen</p>
              <p className="text-gray-600 text-sm">
                Vijayawada, Andhra Pradesh — 520001
              </p>
              <p className="font-bold text-gray-900 mt-3 mb-1">📞 Call Us</p>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
              <p className="font-bold text-gray-900 mt-3 mb-1">
                ⏰ Kitchen Hours
              </p>
              <p className="text-gray-600 text-sm">7:00 AM – 9:00 PM, Daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{ backgroundColor: "oklch(0.12 0.01 152)" }}
      className="text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.47 0.13 152)" }}
              >
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black">MacroMeals</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              India's premier fitness diet cloud kitchen. Macro-counted,
              chef-crafted meals delivered fresh to your door every day.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest text-white/50 uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {["Menu", "Plans", "Why Us", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-widest text-white/50 uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-5">
              {footerSocials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href={`https://${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
            <p className="text-white/50 text-xs">📧 hello@macromeals.in</p>
            <p className="text-white/50 text-xs mt-1">📞 +91 98765 43210</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {year} MacroMeals. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  useReveal();

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="font-poppins">
      <Toaster position="top-right" richColors />
      <Navbar
        cart={cart}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <main>
        <Hero />
        <About />
        <MenuSection addToCart={addToCart} />
        <Plans />
        <WhyUs />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
