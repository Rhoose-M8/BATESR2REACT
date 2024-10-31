// Import all dependencies, other Components
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Home() {
    // State for data shared across components
    const [sharedBond, setSharedBond] = useState(0);
    const [sharedWarranty, setSharedWarranty] = useState(false);
    const [sharedCustomerType, setSharedCustomerType] = useState('customer');
    const [customerDetails, setCustomerDetails] = useState({
        title: "Mr", firstname: "", lastname: "", street: "", suburb: "", city: "", postcode: ""
    });
    const [repairDetails, setRepairDetails] = useState({
        purchaseDate: "", repairDate: "", imei: "", make: "", model: "", fault: "", description: ""
    });
    const [loanDeviceDetails, setLoanDeviceDetails] = useState({ phone: null, charger: null });

    // Handlers to update state based on child component inputs
    const updateSharedState = (value) => setSharedBond(value);
    const updateWarranty = (value) => setSharedWarranty(value);
    const updateCustomerType = (value) => setSharedCustomerType(value);
    const updateLoanDeviceDetails = (phone, charger) => setLoanDeviceDetails({ phone, charger });

    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const attachedData = {
                sharedBond,
                sharedCustomerType,
                sharedWarranty,
                customerDetails,
                repairDetails,
                loanDeviceDetails,
            };
            navigate("/invoice", { state: { attachedData } });
        } catch (e) {
            alert('ERROR!!!');
        }
    };

    return (
        <div className='container-fluid'>
            <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                    <FormCustomerDetail 
                        passDataToParent={updateCustomerType}
                        sendCustomerDetails={setCustomerDetails}
                    />
                </div>
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}>
                    <FormRepairDetail 
                        passDataToParent={updateWarranty}
                        sendRepairDetails={setRepairDetails}
                    />
                </div>
                <div className="col-12 col-lg-4 p-0 m-0">
                    <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
                        <FormCourtesyPhone passDataToParent={updateSharedState} sendLoanDetails={updateLoanDeviceDetails} />
                    </div>
                    <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
                        <FormCost 
                            sharedPropBond={sharedBond}
                            sharedPropWarranty={sharedWarranty}
                            sharedPropCustomerType={sharedCustomerType} 
                        />
                    </div>
                </div>
                <div className="p-4 text-center" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
                    <FormButtons />
                </div>
            </form>
        </div>
    );
}

export default Home;
