import React, { useEffect, useRef } from 'react';

//normally, would save this in a config file or env
const API_URL = 'https://3ic8ifp6ye.execute-api.ap-southeast-2.amazonaws.com/prod/userData';

const App = props => {
	//refs
	const inputRef = useRef();

	useEffect(async () => {
		const res = await fetch(API_URL, {
			method: 'GET',
			headers: {
				"x-api-key": process.env.API_KEY
			}
		});

		if (!res.ok) {
			throw await res.text();
		}

		//
		inputRef.current.value = (await res.json()).url;
	}, []);

	//render
	return (
		<form onSubmit={async e => { e.preventDefault(); inputRef.current.value = await onSubmit(inputRef.current.value); }}>
			<input ref={inputRef} type='text' />
			<button type='submit'>Save URL</button>
		</form>
	)
};

const onSubmit = async url => {
	if (url.length > 200) {
		throw new Error('URL too long');
	}

	//send
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			"x-api-key": process.env.API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url: url
		})
	});

	//check
	if (!res.ok) {
		throw await res.text();
	}

	return (await res.json()).url;
};

export default App;