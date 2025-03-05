import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CheckCircle, MapPin, Truck, ShoppingBag, CreditCard, Edit } from "lucide-react";
import { emptyCart } from "../redux/action";
import "../styles/CheckOut.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartData);
  const user = useSelector((state) => state.auth.user);

  const taxRate = 0.05;
  const discountRate = 0.1;
  const shippingOptions = {
    Standard: { cost: 0, estimate: "5-7 days" },
    Express: { cost: 10, estimate: "2-3 days" },
  };

  const [shipping, setShipping] = useState("Standard");
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [editSection, setEditSection] = useState(null);
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    phoneNumber: "",
    alternatePhone: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [addressFilled, setAddressFilled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [paymentMethodChanged, setPaymentMethodChanged] = useState(false); 

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * discountRate + discountAmount;
  const tax = (subtotal - discount) * taxRate;
  const shippingCost = shippingOptions[shipping].cost;
  const finalAmount = subtotal - discount + tax + shippingCost;

  useEffect(() => {
    // Show QR Code when UPI is selected
    if (paymentMethod === "UPI") {
      setShowQr(true);
    } else {
      setShowQr(false);
    }
  }, [paymentMethod]);

  const handleAddressChange = (e) => {
    setAddressDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveAddress = () => {
    if (!Object.values(addressDetails).every((val) => val.trim() !== "")) {
      toast.error("Please fill in all address details!", { position: "top-center", autoClose: 1000 });
      return;
    }
    setAddressFilled(true);
    setEditSection(null);
    toast.success("Address saved!", { position: "top-center", autoClose: 1000 });
  };

  const handlePlaceOrder = () => {
    if (!user) {
      toast.error("Please login before placing an order!", { position: "top-center", autoClose: 1000 });
      return;
    }
    if (!Object.values(addressDetails).every((val) => val.trim() !== "")) {
      toast.error("Please fill in all address details!", { position: "top-center", autoClose: 1000 });
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method!", { position: "top-center", autoClose: 1000 });
      return;
    }
    if (paymentMethod === "Credit Card" && (cardNumber.length !== 16 || !expiryDate || cvv.length !== 3)) {
      toast.error("Please enter valid card details!", { position: "top-center", autoClose: 1000 });
      return;
    }
    if (paymentMethod === "UPI" && !upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID!", { position: "top-center", autoClose: 1000 });
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalAmount: finalAmount.toFixed(2),
      address: addressDetails,
      paymentMethod,
      date: new Date().toLocaleDateString(),
      status: "Placed",
    };

    dispatch({ type: "ADD_ORDER", payload: newOrder });
    dispatch(emptyCart());

    toast.success("Order placed successfully!", { position: "top-center", autoClose: 1000 });
    setTimeout(() => navigate("/profile"), 1000);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentMethodChanged(true); 
  };

  if (!user) {
    return <p>Please log in to access the checkout process.</p>;
  }

  return (
    <div className="checkout-container">
      <ToastContainer />
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        <div className="left-section">
          <div className="address-section">
            <h3 className="checkout-h3" onClick={() => setEditSection(editSection === "address" ? null : "address")}>
              <MapPin size={20} /> Shipping Address <Edit size={18} className="edit-icon" />
            </h3>
            {editSection === "address" && (
              <div className="address-form">
                <input type="text" name="fullName" placeholder="Full Name" value={addressDetails.fullName} onChange={handleAddressChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={addressDetails.phoneNumber} onChange={handleAddressChange} />
                <input type="text" name="alternatePhone" placeholder="Alternate Phone" value={addressDetails.alternatePhone} onChange={handleAddressChange} />
                <input type="text" name="streetAddress" placeholder="Street Address" value={addressDetails.streetAddress} onChange={handleAddressChange} />
                <input type="text" name="landmark" placeholder="Landmark (optional)" value={addressDetails.landmark} onChange={handleAddressChange} />
                <input type="text" name="city" placeholder="City" value={addressDetails.city} onChange={handleAddressChange} />
                <input type="text" name="state" placeholder="State" value={addressDetails.state} onChange={handleAddressChange} />
                <input type="text" name="zipCode" placeholder="ZIP Code" value={addressDetails.zipCode} onChange={handleAddressChange} />
                <button onClick={saveAddress}>Save Address</button>
              </div>
            )}
            {addressFilled && (
              <div className="saved-address">
                <p><strong>{addressDetails.fullName}</strong></p>
                <p>{addressDetails.streetAddress}, {addressDetails.landmark}, {addressDetails.city}, {addressDetails.state} - {addressDetails.zipCode}</p>
                <p>Phone: {addressDetails.phoneNumber} | Alternate: {addressDetails.alternatePhone}</p>
              </div>
            )}
          </div>

          <div className="payment-section">
            <h3 className="checkout-h3" onClick={() => setEditSection(editSection === "payment" ? null : "payment")}>
              <CreditCard size={20} /> Payment Method <Edit size={18} className="edit-icon" />
            </h3>
            {editSection === "payment" && (
              <div className="payment-form">
                {!paymentMethodChanged ? (
                  <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="">Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                ) : (
                  <div className="selected-payment-method">
                    <p>Selected Payment Method: {paymentMethod}</p>
                    <button onClick={() => setPaymentMethodChanged(false)}>Change Payment Method</button>
                  </div>
                )}

                {paymentMethod === "Credit Card" && (
                  <div>
                    <input type="text" placeholder="Card Number" maxLength="16" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="month" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <input type="password" placeholder="CVV" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                  </div>
                )}
                {paymentMethod === "UPI" && (
                  <div>
                    <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                    {showQr && <img src="/path-to-your-qr-code.png" alt="Scan QR Code" />}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="summary-section">
          <h3 className="checkout-h3"><ShoppingBag size={20} /> Order Summary</h3>
          <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
          <p>Discount: <strong>-${discount.toFixed(2)}</strong></p>
          <p>Tax: <strong>+${tax.toFixed(2)}</strong></p>
          <p>Shipping ({shipping} - {shippingOptions[shipping].estimate}): <strong>${shippingCost}</strong></p>
          <p className="final-amount">Total: <strong>${finalAmount.toFixed(2)}</strong></p>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            <CheckCircle size={20} /> Place Order
          </button>
        </div>
      </div>
    </div>
  );
};


export default Checkout;
