import React, { useState, useEffect } from 'react';

const CollectJSConfiguration = {
    variant: 'inline',
    styleSniffer: 'false',
    fields: {
        ccnumber: {
            selector: "#collectjs-ccnumber",
            title: "Card Number",
            placeholder: "0000 0000 0000 0000",
        },
        ccexp: {
            selector: "#collectjs-ccexp",
            title: "Card Expiration",
            placeholder: "00 / 00",
        },
        cvv: {
            display: "show",
            selector: "#collectjs-cvv",
            title: "CVV Code",
            placeholder: "***",
        },
    },
};

function CrediCardForm () {

	const [callbackCalled, setCallbackCalled] = useState(false);
	const [fieldsCallbackCalled, setFieldsCallbackCalled] = useState(false);

	useEffect(() => {
		// No constructor needed!?!?
		// window.CollectJS.constructor();
		window.CollectJS.configure({
		    ...CollectJSConfiguration,
		    callback: () => setCallbackCalled(true),
		    fieldsAvailableCallback: () => setFieldsCallbackCalled(true),
		});
	}, []);

	return (
		<div>
			<h3>Fill in the form</h3>
			<form>
			    <div id="collectjs-ccnumber"></div>
			    <div id="collectjs-ccexp"></div>
			    <div id="collectjs-cvv"></div>
			</form>
			<button onClick={event => {
				event.preventDefault();
				window.CollectJS.startPaymentRequest();
			}}>
				Submit
			</button>
			<p>{ callbackCalled ? 'okay got the callback' : 'no callback just yet...'}</p>
			<p>{ fieldsCallbackCalled ? 'fields available' : 'no fields available just yet...'}</p>
		</div>
	)
}

function App() {

	let [showForm, setShowForm] = useState(false);

	return (
		<div>
			<h1>No constructor - no bug</h1>
			<p>It seems things don't break at all if we never call `CollectJS.constructor()`</p>
			<p>To try to reproduce the bug...</p>
			<ol>
				<li>Click Show form</li>
				<li>Fill the form below</li>
				<li>Hit submit</li>
				<li>Wait until the text changes from "no callback just yet..." to "okay got the callback"</li>
				<li>If it doesn't, there you have the bug</li>
				<li>If it does, please refresh and try again</li>
				<li>In our tests it seemed to happen in around one out of 5 or 10 times</li>
			</ol>

			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? 'hide' : 'show'} form
			</button>
			{ showForm && (
				<CrediCardForm/>
			)}
		</div>	
	);
}

export default App;
