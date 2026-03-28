import Array "mo:base/Array";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor {

  /* ─── Types ─── */
  type OrderItem = { name: Text; qty: Nat; price: Nat };

  type Order = {
    id: Nat;
    customerName: Text;
    phone: Text;
    items: [OrderItem];
    total: Nat;
    timestamp: Int;
  };

  type Consultation = {
    id: Nat;
    name: Text;
    email: Text;
    phone: Text;
    goal: Text;
    preferredTime: Text;
    timestamp: Int;
  };

  /* ─── State ─── */
  stable var orders: [Order] = [];
  stable var consultations: [Consultation] = [];
  stable var nextOrderId: Nat = 1;
  stable var nextConsultId: Nat = 1;
  stable var adminPrincipal: ?Principal = null;

  /* ─── Admin ─── */
  func isAdmin(caller: Principal): Bool {
    switch (adminPrincipal) {
      case (?p) { p == caller };
      case null { false };
    };
  };

  public shared(msg) func claimAdmin(): async Bool {
    switch (adminPrincipal) {
      case (?_) { false };
      case null {
        adminPrincipal := ?msg.caller;
        true;
      };
    };
  };

  public query(msg) func checkAdmin(): async Bool {
    isAdmin(msg.caller);
  };

  /* ─── Orders ─── */
  public func submitOrder(customerName: Text, phone: Text, items: [OrderItem], total: Nat): async Nat {
    let order: Order = {
      id = nextOrderId;
      customerName;
      phone;
      items;
      total;
      timestamp = Time.now();
    };
    orders := Array.append(orders, [order]);
    nextOrderId += 1;
    order.id;
  };

  public query(msg) func getOrders(): async [Order] {
    assert isAdmin(msg.caller);
    orders;
  };

  /* ─── Consultations ─── */
  public func submitConsultation(name: Text, email: Text, phone: Text, goal: Text, preferredTime: Text): async Nat {
    let c: Consultation = {
      id = nextConsultId;
      name;
      email;
      phone;
      goal;
      preferredTime;
      timestamp = Time.now();
    };
    consultations := Array.append(consultations, [c]);
    nextConsultId += 1;
    c.id;
  };

  public query(msg) func getConsultations(): async [Consultation] {
    assert isAdmin(msg.caller);
    consultations;
  };

};
