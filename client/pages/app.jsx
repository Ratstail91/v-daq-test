import React from 'react';

const App = props => {
	console.log(process.env);
	return <p>{process.env.API_KEY}</p>;
};

export default App;