import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ethers } from 'ethers';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [petName, setPetName] = useState('');
  const [adopterName, setAdopterName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const upiId = "8147247980@ybl";

  // Load data from navigation state
  useEffect(() => {
    if (location.state) {
      const { userId, petName, adopterName, amount } = location.state;
      setUserId(userId || '');
      setPetName(petName || '');
      setAdopterName(adopterName || '');
      setAmount(amount || '');
    }
  }, [location]);

  const getRandomScheduleDate = () => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    today.setDate(today.getDate() + randomDays);
    return today.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "MetaMask") {
      handleMetaMaskPayment();
    } else if (paymentMethod === "UPI") {
      setReceipt({
        receiptNumber: `TXN-${Math.floor(Math.random() * 1000000)}`,
        adopterName,
        petName,
        amount,
        paymentMethod,
        paymentDate: new Date().toISOString(),
        scheduleDate: getRandomScheduleDate(),
      });
    } else {
      try {
        const response = await axios.post('http://localhost:5001/api/payment/pay', {
          userId,
          petName,
          adopterName,
          amount,
          paymentMethod,
        });

        setReceipt({ ...response.data.receipt, scheduleDate: getRandomScheduleDate() });
        setError('');
      } catch (err) {
        setError('Payment failed. Please try again.');
        setReceipt(null);
      }
    }
  };

  const handleMetaMaskPayment = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install it to proceed.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const senderAddress = await signer.getAddress();

      const transaction = await signer.sendTransaction({
        to: "0x8F356f33F2b04D911f758e3a9c3e292e607B0f4E",
        value: ethers.parseEther(amount),
      });

      await transaction.wait();
      setTransactionHash(transaction.hash);

      setReceipt({
        receiptNumber: `TXN-${Math.floor(Math.random() * 1000000)}`,
        adopterName,
        petName,
        amount,
        paymentMethod,
        paymentDate: new Date().toISOString(),
        scheduleDate: getRandomScheduleDate(),
        transactionHash: transaction.hash,
      });

      setError("");
    } catch (error) {
      console.log(error);
      setError("MetaMask transaction failed. Please try again.");
    }
  };

  const generatePDF = () => {
    if (!receipt) return;

    const doc = new jsPDF();
    doc.text('Payment Receipt', 20, 10);

    doc.autoTable({
      startY: 20,
      head: [['Field', 'Details']],
      body: [
        ['Receipt Number', receipt.receiptNumber],
        ['Adopter Name', receipt.adopterName],
        ['Pet Name', receipt.petName],
        ['Amount', `₹${receipt.amount}`],
        ['Payment Method', receipt.paymentMethod],
        ['Payment Date', new Date(receipt.paymentDate).toLocaleString()],
        ['Schedule Date', new Date(receipt.scheduleDate).toLocaleDateString()],
        ...(receipt.transactionHash ? [['Transaction Hash', receipt.transactionHash]] : []),
      ],
    });

    doc.save(`Receipt_${receipt.receiptNumber}.pdf`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Pet Adoption Payment</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">User ID:</label>
          <input 
            className="w-full p-2 border rounded bg-gray-100" 
            type="text" 
            value={userId} 
            readOnly 
          />
        </div>
        <div>
          <label className="block font-medium">Pet Name:</label>
          <input 
            className="w-full p-2 border rounded bg-gray-100" 
            type="text" 
            value={petName} 
            readOnly 
          />
        </div>
        <div>
          <label className="block font-medium">Adopter Name:</label>
          <input 
            className="w-full p-2 border rounded bg-gray-100" 
            type="text" 
            value={adopterName} 
            readOnly 
          />
        </div>
        <div>
          <label className="block font-medium">Amount (ETH):</label>
          <input 
            className="w-full p-2 border rounded bg-gray-100" 
            type="text" 
            value={amount} 
            readOnly 
          />
        </div>
        <div>
          <label className="block font-medium">Payment Method:</label>
          <select 
            className="w-full p-2 border rounded" 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="MetaMask">MetaMask</option>
          </select>
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
          Submit Payment
        </button>
      </form>

      {paymentMethod === "UPI" && (
        <div className="mt-6 p-4 border rounded bg-gray-100 text-center">
          <h2 className="text-lg font-semibold mb-2">Scan to Pay via UPI</h2>
          <QRCodeCanvas value={`upi://pay?pa=${upiId}&pn=PetAdoption&am=${amount}&cu=INR`} size={150} />
          <p className="mt-2">UPI ID: {upiId}</p>
        </div>
      )}

      {receipt && (
        <button 
          onClick={generatePDF} 
          className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
        >
          Download Receipt PDF
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PaymentForm;