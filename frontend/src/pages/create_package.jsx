import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './create_package.css';

const create_package = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ weight, height, width, length });
    };

    return (
        <>
            <div className="form-container">
                <h2>Senders Information</h2>
                <form>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="FName" id="FName" value={FName} onChange={(e)=> setFName(e.target.value)}/>
                    <label htmlFor="LName">Last Name</label>
                    <input type="text" name="LName" id="LName" value={LName} onChange={(e)=> setLName(e.target.value)}/>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"/>
                    <label htmlFor="street_address">Street Address</label>
                    <input type="text" name="street_address" id="street_name" />
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" />
                    <label htmlFor="state">State</label>
                    <input type="text" name="state" id="state" />
                    <label htmlFor="zip_code">Zip Code</label>
                    <input type="number" name="zip_code" id="zip_code" />
                </form>

                {/* <h2>Receiver Information</h2>
                <form>
                    <label htmlFor="FName">First Name</label>
                    <label htmlFor="LName">Last Name</label>
                    <label htmlFor="street_address">Street Address</label>
                    <label htmlFor="city">City</label>
                    <label htmlFor="state">State</label>
                    <label htmlFor="zip_code">Zip Code</label>
                </form> */}

                <h2>Dimensions</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="weight">Weight</label>
                    <input type="number" step="0.01" name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)}/>
                    <label htmlFor="height">Height</label>
                    <input type="number" step="0.01" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)}/>
                    <label htmlFor="width">Width</label>
                    <input type="number" step="0.01" name="width" id="width" value={width} onChange={(e) => setWidth(e.target.value)}/>
                    <label htmlFor="length">Length</label>
                    <input type="number" step="0.01" name="length" id="length" value={length} onChange={(e) => setLength(e.target.value)}/>
                </form>


            </div>
        </>
    );
};

export default create_package;