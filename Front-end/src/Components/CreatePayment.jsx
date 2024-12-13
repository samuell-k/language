import React, { useState } from 'react';

const CreatePayment = () => {
    const [formData, setFormData] = useState({
        paymentMethod: '',
        amount: '',
        cardNumber: '', 
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const dataToSend = {
                Payment_Method: formData.paymentMethod,
                Amount: formData.amount,
                ...(formData.paymentMethod === 'card' && { Card_Number: formData.cardNumber }), // Include card number only if payment method is 'card'
                Payment_Status: 'Pending',
            };

            const response = await fetch('http://localhost:8000/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message || 'Payment created successfully!');
                setErrorMessage('');
                setFormData({
                    paymentMethod: '',
                    amount: '',
                    cardNumber: '',
                });
            } else {
                setErrorMessage(data.error || 'Error creating payment');
            }
        } catch (error) {
            setErrorMessage('Server error. Please try again later.');
        }
    };

    const handleCancel = () => {
        setFormData({
            paymentMethod: '',
            amount: '',
            cardNumber: '',
        });
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Create Payment</h1>
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded">
                {/* Payment Method */}
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        className="form-control"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a payment method</option>
                        <option value="momo">Momo</option>
                        <option value="tigo">Tigo</option>
                        <option value="card">Card</option>
                    </select>
                </div>

                {/* Amount */}
                {(formData.paymentMethod === 'momo' || formData.paymentMethod === 'tigo' || formData.paymentMethod === 'card') && (
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="form-control"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Card Number */}
                {formData.paymentMethod === 'card' && (
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            className="form-control"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Confirm</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePayment;
