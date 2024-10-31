// Function Component
function FormCost(props) {
    // Component UI: HTML Rendering
    return (
        <>
            <h2>Cost</h2>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>

                {/* Conditionally set bond based on customerType */}
                {(() => {
                    const bond = props.sharedPropCustomerType === 'business' ? 0 : props.sharedPropBond;
                    return (
                        <input
                            className="col-12 col-md-12 col-lg-7"
                            type="number"
                            id="bond"
                            value={bond}
                            readOnly
                        />
                    );
                })()}
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="number"
                    id="serviceFee"
                    value={(props.sharedPropCustomerType === 'business' || props.sharedPropWarranty) ? 0 : 85}
                    readOnly
                />
            </div>
            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total ($)</label>

                {/* Calculate total based on bond and service fee */}
                {(() => {
                    const serviceFee = (props.sharedPropCustomerType === 'business' || props.sharedPropWarranty) ? 0 : 85;
                    const bond = props.sharedPropCustomerType === 'business' ? 0 : props.sharedPropBond;
                    return (
                        <input
                            className="col-12 col-md-12 col-lg-7"
                            type="number"
                            id="totalFee"
                            value={bond + serviceFee}
                            readOnly
                        />
                    );
                })()}
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">GST: </label>

                {/* Calculate GST based on bond + serviceFee */}
                {(() => {
                    const serviceFee = (props.sharedPropCustomerType === 'business' || props.sharedPropWarranty) ? 0 : 85;
                    const bond = props.sharedPropCustomerType === 'business' ? 0 : props.sharedPropBond;
                    const gst = (bond + serviceFee) * 0.15;
                    return (
                        <input
                            className="col-12 col-md-12 col-lg-7"
                            type="number"
                            id="gst"
                            value={gst.toFixed(2)}  // Ensure the value is fixed to 2 decimal places
                            readOnly
                        />
                    );
                })()}
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total (+GST) ($)</label>

                {/* Calculate the total including GST */}
                {(() => {
                    const serviceFee = (props.sharedPropCustomerType === 'business' || props.sharedPropWarranty) ? 0 : 85;
                    const bond = props.sharedPropCustomerType === 'business' ? 0 : props.sharedPropBond;
                    const gst = (bond + serviceFee) * 0.15;
                    const totalWithGst = (bond + serviceFee) + gst;
                    return (
                        <input
                            className="col-12 col-md-12 col-lg-7"
                            type="number"
                            id="totalgst"
                            value={totalWithGst.toFixed(2)}
                            readOnly
                        />
                    );
                })()}
            </div>
        </>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;
