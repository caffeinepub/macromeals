import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Copy,
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
  Sliders,
  Trash2,
  Twitter,
  UserCheck,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const aboutImage = "/assets/generated/chef-photo.dim_700x500.jpg";
const kitchenImage = "/assets/generated/kitchen-photo.dim_700x500.jpg";
const beefMuscleBowl = "/assets/generated/beef-muscle-bowl.dim_600x400.jpg";
const eggWhiteOmelette = "/assets/generated/egg-white-omelette.dim_600x400.jpg";
const grilledChickenBowl =
  "/assets/generated/grilled-chicken-bowl.dim_600x400.jpg";
const heroBg = "/assets/generated/hero-bg-new.dim_1600x900.jpg";
const paneerProteinBowl =
  "/assets/generated/paneer-protein-bowl.dim_600x400.jpg";
const quinoaSalad = "/assets/generated/quinoa-salad.dim_600x400.jpg";
const salmonVeggieBowl = "/assets/generated/salmon-veggie-bowl.dim_600x400.jpg";
const paneerWeightBowl = "/assets/generated/paneer-weight-bowl.dim_600x400.jpg";
const chickenBowl = "/assets/generated/chicken-bowl.dim_600x400.jpg";
const eggMeal = "/assets/generated/egg-meal.dim_600x400.jpg";
const paneerBowl = "/assets/generated/paneer-bowl.dim_600x400.jpg";
const fishMeal = "/assets/generated/fish-meal.dim_600x400.jpg";
const freshSalad = "/assets/generated/fresh-salad.dim_600x400.jpg";

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
    image: grilledChickenBowl,
    category: "high-protein",
  },
  {
    id: 2,
    name: "Paneer Protein Bowl",
    kcal: 380,
    protein: 32,
    price: 249,
    image: paneerProteinBowl,
    category: "high-protein",
  },
  {
    id: 3,
    name: "Salmon Veggie Bowl",
    kcal: 520,
    protein: 45,
    price: 349,
    image: salmonVeggieBowl,
    category: "high-protein",
  },
  {
    id: 4,
    name: "Quinoa Salad",
    kcal: 280,
    protein: 18,
    price: 199,
    image: quinoaSalad,
    category: "weight-loss",
  },
  {
    id: 5,
    name: "Egg White Omelette",
    kcal: 220,
    protein: 28,
    price: 179,
    image: eggWhiteOmelette,
    category: "weight-loss",
  },
  {
    id: 6,
    name: "Paneer Weight Bowl",
    kcal: 320,
    protein: 30,
    price: 229,
    image: paneerWeightBowl,
    category: "weight-loss",
  },
  {
    id: 7,
    name: "Beef Muscle Bowl",
    kcal: 680,
    protein: 55,
    price: 399,
    image: beefMuscleBowl,
    category: "muscle-gain",
  },
  {
    id: 8,
    name: "Grilled Chicken Bowl",
    kcal: 450,
    protein: 40,
    price: 299,
    image: grilledChickenBowl,
    category: "muscle-gain",
  },
  {
    id: 9,
    name: "Salmon Veggie Bowl",
    kcal: 520,
    protein: 45,
    price: 349,
    image: salmonVeggieBowl,
    category: "muscle-gain",
  },
  {
    id: 10,
    name: "Chicken Masala Bowl",
    kcal: 420,
    protein: 38,
    price: 279,
    image: chickenBowl,
    category: "high-protein",
  },
  {
    id: 11,
    name: "Egg Power Plate",
    kcal: 260,
    protein: 30,
    price: 199,
    image: eggMeal,
    category: "high-protein",
  },
  {
    id: 12,
    name: "Paneer Tikka Bowl",
    kcal: 350,
    protein: 28,
    price: 239,
    image: paneerBowl,
    category: "muscle-gain",
  },
  {
    id: 13,
    name: "Grilled Fish Plate",
    kcal: 480,
    protein: 42,
    price: 329,
    image: fishMeal,
    category: "high-protein",
  },
  {
    id: 14,
    name: "Fresh Garden Salad",
    kcal: 180,
    protein: 8,
    price: 159,
    image: freshSalad,
    category: "weight-loss",
  },
];

const plans = [
  {
    id: "weekly",
    name: "Weekly Starter",
    price: "₹1,499",
    period: "/week",
    popular: false,
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

/* ─── UPI Payment Modal ─── */
function UPIPaymentModal({
  open,
  onClose,
  amount,
}: {
  open: boolean;
  onClose: () => void;
  amount: number;
}) {
  const upiId = "7337054254@freecharge";
  const [paid, setPaid] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID copied!");
  };

  const handleUPIApp = (app: "gpay" | "phonepe" | "paytm") => {
    const params = `pa=${upiId}&pn=Bhargav Parimi&am=${amount}&cu=INR`;
    const deepLinks: Record<string, string> = {
      gpay: `tez://upi/pay?${params}`,
      phonepe: `phonepe://pay?${params}`,
      paytm: `paytmmp://upi/pay?${params}`,
    };
    window.location.href = deepLinks[app];
  };

  const handleDone = () => {
    setPaid(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setPaid(false);
          onClose();
        }
      }}
    >
      <DialogContent
        data-ocid="upi_payment.dialog"
        className="max-w-sm w-full p-0 overflow-hidden rounded-3xl"
      >
        {paid ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-500 text-sm mb-1">
              Thank you for your payment.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              We'll confirm your order shortly.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-3 mb-8">
              <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
              <p className="text-3xl font-black text-green-600">₹{amount}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPaid(false);
                onClose();
              }}
              className="btn-green w-full py-3.5 font-black tracking-wide"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              className="px-6 pt-6 pb-4 text-white text-center"
              style={{ backgroundColor: "oklch(0.27 0.09 152)" }}
            >
              <DialogHeader>
                <DialogTitle className="text-white text-xl font-black tracking-wide">
                  Pay via UPI
                </DialogTitle>
              </DialogHeader>
              <p className="text-white/70 text-sm mt-1">MacroMeals</p>
              <div className="mt-3 inline-block bg-white/15 px-5 py-2 rounded-full">
                <span className="text-3xl font-black text-white">
                  ₹{amount}
                </span>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-3 shadow-sm">
                  <img
                    src="/assets/generated/upi-qr-new.dim_300x300.png"
                    alt="UPI QR Code"
                    width={176}
                    height={176}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Scan with any UPI app
                </p>
              </div>

              {/* UPI ID */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{
                  backgroundColor: "oklch(0.97 0.02 152)",
                  borderColor: "oklch(0.88 0.05 152)",
                }}
              >
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">
                    UPI ID
                  </p>
                  <p className="font-bold text-gray-900 text-sm">{upiId}</p>
                </div>
                <button
                  type="button"
                  data-ocid="upi_payment.copy.button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "oklch(0.47 0.13 152)",
                    color: "white",
                  }}
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>

              {/* UPI App Buttons */}
              <div>
                <p className="text-xs font-semibold text-gray-500 text-center mb-3 tracking-wide">
                  OR PAY WITH
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    data-ocid="upi_payment.gpay.button"
                    onClick={() => handleUPIApp("gpay")}
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#4285F4" }}
                  >
                    G Pay
                  </button>
                  <button
                    type="button"
                    data-ocid="upi_payment.phonepe.button"
                    onClick={() => handleUPIApp("phonepe")}
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#6739B7" }}
                  >
                    PhonePe
                  </button>
                  <button
                    type="button"
                    data-ocid="upi_payment.paytm.button"
                    onClick={() => handleUPIApp("paytm")}
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#00BAF2" }}
                  >
                    Paytm
                  </button>
                </div>
              </div>

              {/* Done Button */}
              <button
                type="button"
                data-ocid="upi_payment.done.button"
                onClick={handleDone}
                className="btn-green w-full py-3.5 font-black tracking-wide"
              >
                ✅ Done / I've Paid
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
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
  const [upiOpen, setUpiOpen] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setUpiOpen(true);
  };

  return (
    <>
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
                <span className="font-black text-xl text-gray-900">
                  ₹{total}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Taxes & delivery fee calculated at checkout.
              </p>
              {/* Payment methods */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Pay via
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                  G Pay
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-600">
                  PhonePe
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-50 text-cyan-600">
                  Paytm
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

      {/* UPI Modal */}
      <UPIPaymentModal
        open={upiOpen}
        onClose={() => setUpiOpen(false)}
        amount={total}
      />
    </>
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
    { label: "CUSTOMIZE", href: "#customize" },
    { label: "SUBSCRIBE", href: "#plans" },
    { label: "WHY US", href: "#why-us" },
    { label: "CONSULT", href: "#consult" },
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
          <a href="#home" className="flex items-center group">
            <span className="text-xl font-bold text-green-700">MacroMeals</span>
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
        backgroundImage: `url(${heroBg})`,
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
            Fueled. Balanced. Ready.
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
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="MacroMeals head chef"
                  className="rounded-3xl w-full object-cover shadow-card"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 text-center">
                  <p className="font-black text-gray-900 text-xs">Head Chef</p>
                  <p className="text-xs text-gray-500">
                    Certified Nutritionist
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={kitchenImage}
                  alt="MacroMeals cloud kitchen"
                  className="rounded-3xl w-full object-cover shadow-card"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle
                      className="w-3 h-3"
                      style={{ color: "oklch(0.47 0.13 152)" }}
                    />
                    <p className="font-black text-gray-900 text-xs">
                      FSSAI Certified
                    </p>
                  </div>
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
  const [upiOpen, setUpiOpen] = useState(false);
  const [upiAmount, setUpiAmount] = useState(0);

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    const amount = Number(plan.price.replace(/[₹,]/g, ""));
    setUpiAmount(amount);
    setUpiOpen(true);
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

      {/* UPI Modal */}
      <UPIPaymentModal
        open={upiOpen}
        onClose={() => setUpiOpen(false)}
        amount={upiAmount}
      />
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

/* ─── Customize Meal ─── */
const bases = [
  { id: "brown-rice", label: "Brown Rice", kcal: 120, price: 0 },
  { id: "quinoa", label: "Quinoa", kcal: 100, price: 20 },
  { id: "oats", label: "Oats", kcal: 90, price: 0 },
  { id: "roti", label: "Roti", kcal: 80, price: 0 },
];
const proteins = [
  {
    id: "chicken",
    label: "Grilled Chicken",
    kcal: 165,
    protein: 31,
    price: 80,
  },
  { id: "paneer", label: "Paneer", kcal: 150, protein: 11, price: 60 },
  { id: "tofu", label: "Tofu", kcal: 70, protein: 8, price: 50 },
  { id: "egg-white", label: "Egg White", kcal: 52, protein: 11, price: 40 },
  { id: "salmon", label: "Salmon", kcal: 200, protein: 25, price: 100 },
];
const carbOptions = [
  { id: "sweet-potato", label: "Sweet Potato", kcal: 86, price: 30 },
  { id: "pasta", label: "Pasta", kcal: 130, price: 20 },
  { id: "salad", label: "Salad", kcal: 25, price: 10 },
  { id: "no-carbs", label: "No Carbs", kcal: 0, price: 0 },
];
const extras = [
  { id: "avocado", label: "Avocado", kcal: 80, protein: 1, price: 30 },
  {
    id: "extra-protein",
    label: "Extra Protein",
    kcal: 50,
    protein: 10,
    price: 50,
  },
  { id: "seeds-mix", label: "Seeds Mix", kcal: 40, protein: 2, price: 20 },
  { id: "nuts", label: "Nuts", kcal: 60, protein: 2, price: 25 },
];

function CustomizeSection({
  addToCart,
}: { addToCart: (item: CartItem) => void }) {
  const [selectedBase, setSelectedBase] = useState(bases[0].id);
  const [selectedProtein, setSelectedProtein] = useState(proteins[0].id);
  const [selectedCarb, setSelectedCarb] = useState(carbOptions[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const baseItem = bases.find((b) => b.id === selectedBase)!;
  const proteinItem = proteins.find((p) => p.id === selectedProtein)!;
  const carbItem = carbOptions.find((c) => c.id === selectedCarb)!;
  const extraItems = extras.filter((e) => selectedExtras.includes(e.id));

  const totalKcal =
    baseItem.kcal +
    proteinItem.kcal +
    carbItem.kcal +
    extraItems.reduce((s, e) => s + e.kcal, 0);
  const totalProtein =
    proteinItem.protein + extraItems.reduce((s, e) => s + (e.protein ?? 0), 0);
  const basePrice = 149;
  const totalPrice =
    basePrice +
    baseItem.price +
    proteinItem.price +
    carbItem.price +
    extraItems.reduce((s, e) => s + e.price, 0);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const handleAddToCart = () => {
    const name = `Custom Meal (${proteinItem.label} + ${baseItem.label})`;
    const id = Date.now();
    addToCart({ id, name, price: totalPrice, qty: 1, image: "" });
    toast.success(`${name} added to cart!`);
  };

  const SelectOption = ({
    items,
    selected,
    onSelect,
    label,
  }: {
    items: { id: string; label: string; price?: number }[];
    selected: string;
    onSelect: (id: string) => void;
    label: string;
  }) => (
    <div>
      <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              selected === item.id
                ? "border-green-600 bg-green-600 text-white shadow-md"
                : "border-gray-200 bg-white text-gray-700 hover:border-green-400"
            }`}
          >
            {item.label}
            {item.price ? ` +₹${item.price}` : ""}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="customize" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">BUILD YOUR PLATE</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            CUSTOMISE YOUR MEAL
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pick your base, protein, carbs, and extras. We'll prepare it fresh,
            just the way you want.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Builder Panel */}
          <div className="lg:col-span-2 space-y-8 reveal">
            <SelectOption
              items={bases}
              selected={selectedBase}
              onSelect={setSelectedBase}
              label="Choose Base"
            />
            <SelectOption
              items={proteins}
              selected={selectedProtein}
              onSelect={setSelectedProtein}
              label="Choose Protein"
            />
            <SelectOption
              items={carbOptions}
              selected={selectedCarb}
              onSelect={setSelectedCarb}
              label="Choose Carbs"
            />
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Extras (optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {extras.map((extra) => (
                  <button
                    key={extra.id}
                    type="button"
                    data-ocid="customize.extras.toggle"
                    onClick={() => toggleExtra(extra.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                      selectedExtras.includes(extra.id)
                        ? "border-green-600 bg-green-600 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-green-400"
                    }`}
                  >
                    {extra.label} +₹{extra.price}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="reveal">
            <div className="rounded-3xl border-2 border-green-100 bg-gradient-to-b from-green-50 to-white p-6 shadow-lg sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <Sliders className="w-5 h-5 text-green-600" />
                <h3 className="font-black text-gray-900 text-lg">
                  Your Meal Summary
                </h3>
              </div>
              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base</span>
                  <span className="font-semibold text-gray-900">
                    {baseItem.label}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Protein</span>
                  <span className="font-semibold text-gray-900">
                    {proteinItem.label}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Carbs</span>
                  <span className="font-semibold text-gray-900">
                    {carbItem.label}
                  </span>
                </div>
                {extraItems.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Extras</span>
                    <span className="font-semibold text-gray-900">
                      {extraItems.map((e) => e.label).join(", ")}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-green-100 pt-4 mb-5 grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-green-700">
                    {totalKcal}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">kcal</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-green-700">
                    {totalProtein}g
                  </p>
                  <p className="text-xs text-gray-500 font-medium">protein</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-gray-500 text-sm">Total Price</span>
                <span className="text-2xl font-black text-green-700">
                  ₹{totalPrice}
                </span>
              </div>
              <button
                type="button"
                data-ocid="customize.add_to_cart.button"
                onClick={handleAddToCart}
                className="btn-green w-full py-3.5 font-black text-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Consult a Dietitian ─── */
function ConsultSection() {
  const { actor: _actorRaw } = useActor();
  const actor = _actorRaw as any;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
    preferredTime: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const goals = [
    "Weight Loss",
    "Muscle Gain",
    "Maintenance",
    "Sports Performance",
    "Medical Nutrition",
  ];
  const timeSlots = ["Morning 8-10am", "Afternoon 12-2pm", "Evening 5-7pm"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await actor.submitConsultation(
        form.name,
        form.email,
        form.phone,
        form.goal,
        form.preferredTime,
      );
      toast.success("Consultation request submitted! We'll contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        goal: "",
        preferredTime: "",
        message: "",
      });
    } catch (_err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="consult"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(0.975 0.005 152)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">EXPERT GUIDANCE</p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            CONSULT A DIETITIAN
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Get a personalised nutrition plan from our certified dietitians.
            Book a free consultation today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Panel */}
          <div className="reveal space-y-6">
            <div className="rounded-3xl overflow-hidden bg-white shadow-lg p-8 border border-green-100">
              <UserCheck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                Why Consult Our Dietitians?
              </h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Personalised meal plans tailored to your body type",
                  "Expert guidance for medical nutrition therapy",
                  "Ongoing support to track your progress",
                  "Science-backed strategies for sustainable results",
                  "Free 30-minute initial consultation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "50+", label: "Dietitians" },
                { num: "10k+", label: "Clients Served" },
                { num: "4.9★", label: "Avg. Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-4 text-center shadow border border-green-100"
                >
                  <p className="text-2xl font-black text-green-700">
                    {stat.num}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            data-ocid="consult.form"
            onSubmit={handleSubmit}
            className="reveal bg-white rounded-3xl p-8 shadow-lg border border-green-100 space-y-5"
          >
            <h3 className="text-xl font-black text-gray-900 mb-1">
              Book Your Free Consultation
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="consult-name"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="consult-name"
                  type="text"
                  data-ocid="consult.name.input"
                  required
                  placeholder="Arjun Sharma"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="consult-phone"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="consult-phone"
                  type="tel"
                  data-ocid="consult.phone.input"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="consult-email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="consult-email"
                type="email"
                data-ocid="consult.email.input"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all text-sm"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="consult-goal"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Fitness Goal
                </label>
                <select
                  id="consult-goal"
                  data-ocid="consult.goal.select"
                  required
                  value={form.goal}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, goal: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 bg-white transition-all text-sm"
                >
                  <option value="" disabled>
                    Select goal...
                  </option>
                  {goals.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="consult-time"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Preferred Time Slot
                </label>
                <select
                  id="consult-time"
                  data-ocid="consult.time.select"
                  required
                  value={form.preferredTime}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, preferredTime: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 bg-white transition-all text-sm"
                >
                  <option value="" disabled>
                    Select time...
                  </option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="consult-message"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Message (Optional)
              </label>
              <textarea
                id="consult-message"
                data-ocid="consult.message.textarea"
                rows={3}
                placeholder="Share any health conditions, goals, or questions..."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-900 placeholder-gray-400 transition-all resize-none text-sm"
              />
            </div>
            <button
              type="submit"
              data-ocid="consult.submit.button"
              disabled={submitting}
              className="btn-green w-full py-3.5 text-sm font-black disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "BOOK FREE CONSULTATION"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Admin Dashboard ─── */
function AdminDashboard() {
  const { actor: _actor } = useActor();
  const actor = _actor as any;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [orders, setOrders] = useState<
    {
      id: bigint;
      customerName: string;
      phone: string;
      items: { name: string; qty: bigint; price: bigint }[];
      total: bigint;
      timestamp: bigint;
    }[]
  >([]);
  const [consultations, setConsultations] = useState<
    {
      id: bigint;
      name: string;
      email: string;
      phone: string;
      goal: string;
      preferredTime: string;
      timestamp: bigint;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor.checkAdmin().then((is) => setAuthed(is));
  }, [actor]);

  const handleClaim = async () => {
    setClaiming(true);
    if (!actor) return;
    const ok = await actor.claimAdmin();
    if (ok) {
      setAuthed(true);
    } else {
      toast.error("Admin already claimed or error.");
    }
    setClaiming(false);
  };

  useEffect(() => {
    if (!authed || !actor) return;
    setLoading(true);
    Promise.all([actor.getOrders(), actor.getConsultations()])
      .then(([o, c]) => {
        setOrders(o);
        setConsultations(c);
      })
      .finally(() => setLoading(false));
  }, [authed, actor]);

  const formatTs = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleString();

  if (authed === null)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking admin status...
      </div>
    );

  if (!authed)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-3xl font-black text-gray-900">Admin Access</h1>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          Only the first person to claim admin can access this dashboard.
        </p>
        <button
          type="button"
          onClick={handleClaim}
          disabled={claiming}
          className="btn-green px-8 py-3 font-black"
        >
          {claiming ? "Claiming..." : "Claim Admin"}
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-7 h-7 text-green-700" />
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
        </div>
        {loading ? (
          <div
            data-ocid="admin.loading_state"
            className="text-center py-20 text-gray-400"
          >
            Loading data...
          </div>
        ) : (
          <Tabs defaultValue="orders" data-ocid="admin.panel">
            <TabsList className="mb-6">
              <TabsTrigger data-ocid="admin.orders.tab" value="orders">
                Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.consultations.tab"
                value="consultations"
              >
                Consultations ({consultations.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              {orders.length === 0 ? (
                <div
                  data-ocid="admin.orders.empty_state"
                  className="text-center py-20 text-gray-400"
                >
                  No orders yet.
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={String(order.id)}
                          data-ocid={`admin.orders.item.${i + 1}`}
                        >
                          <TableCell className="font-mono text-xs">
                            #{String(order.id)}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {order.customerName}
                          </TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell className="text-xs">
                            {order.items
                              .map((it) => `${it.name} x${it.qty}`)
                              .join(", ")}
                          </TableCell>
                          <TableCell className="font-bold text-green-700">
                            ₹{String(order.total)}
                          </TableCell>
                          <TableCell className="text-xs text-gray-500">
                            {formatTs(order.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            <TabsContent value="consultations">
              {consultations.length === 0 ? (
                <div
                  data-ocid="admin.consultations.empty_state"
                  className="text-center py-20 text-gray-400"
                >
                  No consultations yet.
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Goal</TableHead>
                        <TableHead>Preferred Time</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultations.map((c, i) => (
                        <TableRow
                          key={String(c.id)}
                          data-ocid={`admin.consultations.item.${i + 1}`}
                        >
                          <TableCell className="font-semibold">
                            {c.name}
                          </TableCell>
                          <TableCell>{c.email}</TableCell>
                          <TableCell>{c.phone}</TableCell>
                          <TableCell>{c.goal}</TableCell>
                          <TableCell>{c.preferredTime}</TableCell>
                          <TableCell className="text-xs text-gray-500">
                            {formatTs(c.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
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

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === "#admin");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  if (isAdmin)
    return (
      <div className="font-poppins">
        <Toaster position="top-right" richColors />
        <AdminDashboard />
      </div>
    );

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
        <CustomizeSection addToCart={addToCart} />
        <Plans />
        <WhyUs />
        <ConsultSection />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
