const express = require('express');

const router = express.Router();

const BlogPost = require('./blogPostManager')


// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/blogs',(request, response, next) => {
	next();
});


// post todos
router.post('/blogs', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	BlogPost.createItem(requestBody);

	next();

});

// put todo
router.put('/blog/:id', (request, response, next) => {
	console.log('HERE')
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;

	BlogPost.updateItem(id, 'data.isDone', dataPayload.isDone);

	next();
}); // blog

// delete blog
router.delete('/blog/:id', (request, response, next) => {
	const id = request.params.id;

	BlogPost.deleteItem(id);

	next();
}); // delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(BlogPost.getItems());
});

module.exports = router;
