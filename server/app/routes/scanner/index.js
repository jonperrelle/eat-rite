'use strict';
const router = require('express').Router();
const digitEyes = require('../../../env').digitEyes;
const request = require('request');
const utils = require('../../../utils');

module.exports = router;

router.post('/',function(req,res,next){
	console.log('Here', req.headers);
	let upc = req.body.upc;
	let signature = utils.getDigitEyesSignature(upc, digitEyes.authKey)
	let url = `https://www.digit-eyes.com/gtin/v2_0/?upcCode=${upc}&field_names=description,ingredients&language=en&app_key=${digitEyes.appKey}&signature=${signature}`
	request(url, function (err, response, body) {
		if (err) next(err);
		else {
			let newBody = JSON.parse(body);
			let product = newBody.description;
			let ingredientsArray = utils.formatIngredients(newBody.ingredients);
			let contentsArray = utils.checkFoodDictionary(ingredientsArray);
			res.json({
				product: product,
				ingredients: ingredientsArray,
				contents: contentsArray
			});
		}
	})


});
