'use strict';

module.exports = {

	checkFood (aversions, foodContents) {
		let foodContentsMap = {};
		let result = []
		foodContents.forEach( a => {
			foodContentsMap[a] = 1;
		});
		aversions.forEach( food => {
			if (foodContentsMap[food.name.toLowerCase()]) {
				result.push(food);
			}
		});

		return result;
	}

};