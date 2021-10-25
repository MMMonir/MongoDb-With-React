"# MongoDb-With-React" 

## 5 Basic things in Node express(index.js)
	```
	const express = require('express');
	const app = express();
	const port = process.env.PORT || 5000;

	app.get('/', (req, res) => {
   	 res.send('Running my server')
	});

	app.listen(port, () =>{
    	console.log('Running server on port', port);
	})
	```
