import React, { useState, useEffect } from 'react';

function FormRepairDetail({ passDataToParent, sendRepairDetails }) {
    const [purchaseDate, setPurchaseDate] = useState('');
    const [repairDate, setRepairDate] = useState('');
    const [imei, setImei] = useState('');
    const [warrantyDisabled, setWarrantyDisabled] = useState(false);
    const [make, setMake] = useState('Apple');
    const [model, setModel] = useState('');
    const [fault, setFault] = useState('Battery');
    const [description, setDescription] = useState('');

    useEffect(() => {
        sendRepairDetails({
            purchaseDate,
            repairDate,
            imei,
            make,
            model,
            fault,
            description
        });
    }, [purchaseDate, repairDate, imei, make, model, fault, description, sendRepairDetails]);

    const handlePurchaseDateChange = (e) => {
        setPurchaseDate(e.target.value);
        const selectedPurchaseDate = new Date(e.target.value);
        const currentDate = new Date();
        const monthsDifference = (currentDate - selectedPurchaseDate) / (1000 * 3600 * 24 * 30);
        setWarrantyDisabled(monthsDifference > 24);
    };

    const handleRepairDateChange = (e) => setRepairDate(e.target.value);
    const handleImeiChange = (e) => /^\d{0,15}$/.test(e.target.value) && setImei(e.target.value);
    
    return (
        <>
            <h2>Repair Details</h2>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={purchaseDate}
                    onChange={handlePurchaseDateChange}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={repairDate}
                    onChange={handleRepairDateChange}
                    required
                />
            </div>
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <input
                        type="checkbox"
                        id="warranty"
                        onChange={(event) => passDataToParent(event.target.checked)}
                        disabled={warrantyDisabled}
                    />
                </fieldset>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    value={imei}
                    onChange={handleImeiChange}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Make *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                >
                    <option value="Apple">Apple</option>
                    <option value="LG">LG</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                    <option value="MakeOther">Other</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Model Number *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    value={fault}
                    onChange={(e) => setFault(e.target.value)}
                    required
                >
                    <option value="Battery">Battery</option>
                    <option value="Charging">Charging</option>
                    <option value="Screen">Screen</option>
                    <option value="SD-storage">SD-storage</option>
                    <option value="Software">Software</option>
                    <option value="FaultOther">Other</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Description *</label>
                <textarea
                    className="col-12 col-md-12 col-lg-7"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
        </>
    );
}

export default FormRepairDetail;
