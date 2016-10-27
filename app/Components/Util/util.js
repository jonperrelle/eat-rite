'use strict';

module.exports = {

	checkFood (aversions, foodData) {
		let foodContentsMap = {};
		let result = [];
		for (let k in foodData.contents) {
			foodData.contents[k].forEach( i => {
				if (!foodContentsMap[i]) foodContentsMap[i] = [];
				foodContentsMap[i].push(k);
			});
		}
		console.log(foodContentsMap);
		aversions.forEach( food => {
			let lcName = food.name.toLowerCase();
			if (foodContentsMap[lcName]) {
				foodContentsMap[lcName].forEach( i => {
					result.push({
						food: food.name,
						aversion: food.aversion,
						ingredient: i
					});
				});
			}
		});

		return result;
	},

	formatFoodData(foodData) {

		let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

		let dataBlob = {}, sectionIDs = [], rowIDs = [];

		for (let sectionID = 0; sectionID < alphabet.length ; sectionID++) {
			let currChar = alphabet[sectionID];

			let foods = foodData.filter( food => {
				return food.name[0].toUpperCase() === alphabet[sectionID];
			});

			if (foods.length > 0) {
				foods.sort( (a, b) =>  b.name < a.name);

				sectionIDs.push(sectionID);
				dataBlob[sectionID] = {character: currChar};
				rowIDs.push([]);
				for (let i = 0 ; i < foods.length ; i++) {
					let rowID = `${sectionID}:${i}`;
					rowIDs[rowIDs.length -1].push(rowID);
					dataBlob[rowID] = foods[i];
				}
			}
		}

		console.log(dataBlob);

		return {dataBlob, sectionIDs, rowIDs};
	}

};