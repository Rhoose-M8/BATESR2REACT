import React from 'react';
import { useLocation } from "react-router-dom";

function Invoice() {
    const location = useLocation();
    const receivedData = location.state?.attachedData;

    if (!receivedData) {
        return <h2>ERROR! No data is passed on.</h2>;
    }

    const jobNumber = 3001; // Placeholder job number, increment logic can be added if needed
    const invoiceDate = new Date();
    const paymentDueDate = new Date(invoiceDate);
    paymentDueDate.setDate(invoiceDate.getDate() + 5);

    // Calculate total cost components
    const serviceFee = receivedData.sharedWarranty ? 0 : 85; // Example condition for service fee
    const bond = receivedData.sharedCustomerType === 'business' ? 0 : receivedData.sharedBond;
    const total = bond + serviceFee;
    const gst = total * 0.15;
    const totalWithGst = total + gst;

    return (
        <>
            <div style={{ minHeight: '60vh' }}>
                {/* Header */}
                <div className='bg-secondary p-3 row'>
                    <h1 className='col-6'>Repair Booking</h1>
                    <p className='col-6'>
                        Amount Due: <br />
                        <span style={{ fontSize: '23px' }}>${totalWithGst.toFixed(2)}</span>
                    </p>
                </div>

                {/* Customer and Job Details */}
                <div className='p-3 row'>
                    <div className='col-6'>
                        <h4>Customer Details:</h4>
                        <p>Title: {receivedData.customerDetails.title}</p>
                        <p>First Name: {receivedData.customerDetails.firstname}</p>
                        <p>Last Name: {receivedData.customerDetails.lastname}</p>
                        <p>Address: {receivedData.customerDetails.street}, {receivedData.customerDetails.suburb}, {receivedData.customerDetails.city}, {receivedData.customerDetails.postcode}</p>
                    </div>
                    <div className='col-6'>
                        <h4>Repair Job:</h4>
                        <p>Job Number: {jobNumber}</p>
                        <p>Invoice Date: {invoiceDate.toLocaleDateString()}</p>
                        <p>Payment Due: {paymentDueDate.toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Repair Details */}
                <hr />
                <div className='p-3'>
                    <h4>Repair Details:</h4>
                    <p>Purchase Date: {receivedData.repairDetails.purchaseDate}</p>
                    <p>Repair Date: {receivedData.repairDetails.repairDate}</p>
                    <p>Under Warranty: {receivedData.sharedWarranty ? "Yes" : "No"}</p>
                    <p>IMEI Number: {receivedData.repairDetails.imei}</p>
                    <p>Device Make: {receivedData.repairDetails.make}</p>
                    <p>Model Number: {receivedData.repairDetails.model}</p>
                    <p>Fault Category: {receivedData.repairDetails.fault}</p>
                    <p>Description: {receivedData.repairDetails.description}</p>
                </div>

                {/* Courtesy Loan Device Details */}
                <hr />
                <div className='p-3'>
                    <h4>Courtesy Loan Device Details:</h4>
                    <div className="mt-2 ms-3 me-3 bg-white">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receivedData.loanDeviceDetails.phone && (
                                    <tr>
                                        <td>{receivedData.loanDeviceDetails.phone.name}</td>
                                        <td>${receivedData.loanDeviceDetails.phone.bond}</td>
                                    </tr>
                                )}
                                {receivedData.loanDeviceDetails.charger && (
                                    <tr>
                                        <td>{receivedData.loanDeviceDetails.charger.name}</td>
                                        <td>${receivedData.loanDeviceDetails.charger.bond}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Totals */}
                <hr />
                <div className='p-3 row'>
                    <div className='col-6'></div>
                    <div className='col-6'>
                        <h4>TOTALS:</h4>
                        <p>Bond: ${bond.toFixed(2)}</p>
                        <p>Service Fee: ${serviceFee.toFixed(2)}</p>
                        <p>Total: ${total.toFixed(2)}</p>
                        <p>GST: ${gst.toFixed(2)}</p>
                        <p>Total (+GST): ${totalWithGst.toFixed(2)}</p>
                    </div>
                </div>

                {/* Footer */}
                <hr />
                <div className='p-3 row'>
                    <div className='col-6'>
                        <p className='fs-5'><strong>PHONE FIX SERVICES</strong></p>
                        <p>Address: 501 Gloucester Street <br />Taradale, Napier 4112</p>
                    </div>
                    <div className='col-6'>
                        <p className='fs-5'><strong>Contact Us:</strong></p>
                        <p>Phone: 06 974 8000</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Invoice;
