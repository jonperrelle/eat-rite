'use strict';

const CryptoJS = require('crypto-js');
const foodDict = require('./foodDictionary');

module.exports = {
	getDigitEyesSignature: function (upc, auth) {
		let signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(upc, auth));
		return signature;
	},

	cleanString: function (str) {
		let string = str.replace(/[\.|;|:]/g, ",")
			.replace(/(\s\(|\s\{)/g, ", ")
			.replace(/\)|\}/g, "");

		return string;
	},

	formatIngredients: function (ings) {
		ings = this.cleanString(ings);

		let splitIngs = ings.split(',').map(ing => {
			ing = ing.toLowerCase();
			if (ing[0] && ing[0].match(/\s/)) {
				ing = ing.substr(1);
			}
			if (ing.indexOf('contains 2% or less of ') !== -1) {
				ing = ing.substr(23);
			}
			if (ing.indexOf('bht') !== -1) {
				ing = 'bht';
			}

			return ing;
		});
		return splitIngs;
	},

	checkFoodDictionary: function(array) {
		let contentsObj = {}
		array.forEach(i => {
			if (foodDict[i]) {
				contentsObj[i] = foodDict[i];
			}
		});
		return contentsObj;
	}

}