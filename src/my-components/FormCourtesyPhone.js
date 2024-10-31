import { useState } from 'react';

function FormCourtesyPhone({ passDataToParent, sendLoanDetails }) {
    const courtesyList = [
        { id: 0, type: 'none', name: 'none', bond: 0 },
        { id: 1, type: 'phone', name: 'iphone 10', bond: 275 },
        { id: 2, type: 'phone', name: 'iphone 14', bond: 300 },
        { id: 3, type: 'phone', name: 'iphone 16', bond: 500 },
        { id: 4, type: 'phone', name: 'samsung galaxy', bond: 200 },
        { id: 5, type: 'phone', name: 'nokia', bond: 150 },
        { id: 6, type: 'phone', name: 'xiaomi', bond: 100 },
        { id: 7, type: 'charger', name: 'iphone charger', bond: 45 },
        { id: 8, type: 'charger', name: 'samsung charger', bond: 30 },
        { id: 9, type: 'charger', name: 'nokia charger', bond: 25 },
        { id: 10, type: 'charger', name: 'xiaomi', bond: 25 }];

    const [phoneBorrow, setPhoneBorrow] = useState(0);  // Default to "None"
    const [chargerBorrow, setChargerBorrow] = useState(0); // Default to "None"

    // Update bond and send loan details to parent
    const updateBond = (phoneId, chargerId) => {
        const phoneBond = courtesyList.find(item => item.id === phoneId)?.bond || 0;
        const chargerBond = courtesyList.find(item => item.id === chargerId)?.bond || 0;
        const totalBond = phoneBond + chargerBond;
        
        passDataToParent(totalBond); // Update bond in Home
        sendLoanDetails(
            courtesyList.find(item => item.id === phoneId),
            courtesyList.find(item => item.id === chargerId)
        );
    };

    const handlePhoneChange = (e) => {
        const selectedPhoneId = Number(e.target.value);
        setPhoneBorrow(selectedPhoneId);
        updateBond(selectedPhoneId, chargerBorrow);
    };

    const handleChargerChange = (e) => {
        const selectedChargerId = Number(e.target.value);
        setChargerBorrow(selectedChargerId);
        updateBond(phoneBorrow, selectedChargerId);
    };

    return (
        <>
            <h2>Courtesy Phone</h2>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Phone</label>
                <select className="col-12 col-md-12 col-lg-7" onChange={handlePhoneChange}>
                    {courtesyList.filter(item => item.type === 'phone').map(phone => (
                        <option key={phone.id} value={phone.id}>{phone.name}</option>
                    ))}
                </select>
            </div>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Charger</label>
                <select className="col-12 col-md-12 col-lg-7" onChange={handleChargerChange}>
                    {courtesyList.filter(item => item.type === 'charger').map(charger => (
                        <option key={charger.id} value={charger.id}>{charger.name}</option>
                    ))}
                </select>
            </div>

            {/* Table displaying selected items */}
            <div className="row mt-2 ms-3 me-3 bg-white">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Display selected phone */}
                        {phoneBorrow !== 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === phoneBorrow)?.name}</td>
                                <td>${courtesyList.find(item => item.id === phoneBorrow)?.bond}</td>
                            </tr>
                        )}
                        {/* Display selected charger */}
                        {chargerBorrow !== 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === chargerBorrow)?.name}</td>
                                <td>${courtesyList.find(item => item.id === chargerBorrow)?.bond}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormCourtesyPhone;
