import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CreditCard, Calendar, Lock, DollarSign, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  const { id } = useParams();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!paymentInfo.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!paymentInfo.cardHolder) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    if (!paymentInfo.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expirationDate = 'Expiration date must be in MM/YY format';
    }
    if (!paymentInfo.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    if (!paymentInfo.amount || isNaN(paymentInfo.amount) || Number(paymentInfo.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the payment info to your payment processor
      console.log('Payment submitted:', paymentInfo);
      alert('Payment processed successfully!');
      // Redirect to a confirmation page or back to the pet profile
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
          <p className="mt-1 text-sm text-gray-600">
            {id ? `Adoption fee for Pet ID: ${id}` : 'Make a donation'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.cardNumber ? 'border-red-300' : ''}`}
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              {errors.cardNumber && <p className="mt-2 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>

            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                Card Holder Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cardHolder"
                  id="cardHolder"
                  className={`block w-full sm:text-sm border-gray-300 rounded-md ${errors.cardHolder ? 'border-red-300' : ''}`}
                  placeholder="John Doe"
                  value={paymentInfo.cardHolder}
                  onChange={handleInputChange}
                />
              </div>
              {errors.cardHolder && <p className="mt-2 text-sm text-red-600">{errors.cardHolder}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="expirationDate"
                    id="expirationDate"
                    className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.expirationDate ? 'border-red-300' : ''}`}
                    placeholder="MM/YY"
                    value={paymentInfo.expirationDate}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.expirationDate && <p className="mt-2 text-sm text-red-600">{errors.expirationDate}</p>}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.cvv ? 'border-red-300' : ''}`}
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.cvv && <p className="mt-2 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.amount ? 'border-red-300' : ''}`}
                  placeholder="100.00"
                  value={paymentInfo.amount}
                  onChange={handleInputChange}
                />
              </div>
              {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Pay Now
            </button>
          </div>
        </form>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to={id ? `/pet/${id}` : '/'}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

