import { useState, useEffect } from 'react';

function FormCustomerDetail({ passDataToParent, sendCustomerDetails }) {
    const [type, setType] = useState({ customer: "checked", business: "" });
    const [customerDetails, setCustomerDetails] = useState({
        title: "Mr", firstname: "", lastname: "", street: "", suburb: "", city: "", postcode: ""
    });

    const updateCustomerType = (event) => {
        const customerType = event.target.value;
        passDataToParent(customerType);
        setType({
            customer: customerType === "customer" ? "checked" : "",
            business: customerType === "business" ? "checked" : ""
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerDetails({
            ...customerDetails,
            [name]: value
        });
    };

    useEffect(() => {
        sendCustomerDetails(customerDetails);
    }, [customerDetails, sendCustomerDetails]);

    return (
        <>
            <h2>Customer Details</h2>
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                    <legend className="col-11 float-none w-auto">Customer type *</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Customer</label>
                        <input
                            type="radio"
                            name="customer-type"
                            value="customer"
                            checked={type.customer}
                            onChange={updateCustomerType}
                        />
                    </div>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Business</label>
                        <input
                            type="radio"
                            name="customer-type"
                            value="business"
                            checked={type.business}
                            onChange={updateCustomerType}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="row mt-2">
                <label className="col-12 col-md-12 col-lg-4">Title *</label>
                <select className="col-12 col-md-12 col-lg-7" name="title" onChange={handleChange} required>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">First Name *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="firstname" onChange={handleChange} required />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="lastname" onChange={handleChange} required />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Street *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="street" onChange={handleChange} required />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Suburb</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="suburb" onChange={handleChange} />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">City *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="city" onChange={handleChange} required />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Post Code</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="postcode" onChange={handleChange} />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Email *</label>
                <input className="col-12 col-md-12 col-lg-7" type="email" required />
            </div>
        </>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail;
