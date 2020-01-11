import {expect} from 'chai';
import aStar from '../../../../src/neuron/ai/path/aStar.js';
import MockMapPoint2d from '../../physics/mockMapPoint2d.js';
import MockMapCylindricalPoint2d from '../../physics/mockMapCylindricalPoint2d.js';

describe('aStar function', function() {
	it('is a simple path (0,0) => (0,2) => (2,2)',() => {
		let map = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8]
		];

		let start = new MockMapPoint2d(0,0,map);
		let goal = new MockMapPoint2d(2,2,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:0,y:1},
			{x:0,y:2},
			{x:1,y:2},
			{x:2,y:2}
		];
		pathChecker(expected, path);
	});

	it('is a simple path (0,0) => (2,0) => (2,2)',() => {
		let map = [
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8]
		];

		let start = new MockMapPoint2d(0,0,map);
		let goal = new MockMapPoint2d(2,2,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:1,y:0},
			{x:2,y:0},
			{x:2,y:1},
			{x:2,y:2}
		];
		pathChecker(expected, path);
	});

	it('is a ladder movement',() => {
		let map = [
			[0, 1, 6],
			[3, 2, 5],
			[4, 7, 8]
		];

		let start = new MockMapPoint2d(0,0,map);
		let goal = new MockMapPoint2d(2,2,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:0,y:1},
			{x:1,y:1},
			{x:1,y:2},
			{x:2,y:2}
		];
		pathChecker(expected, path);
	});

	it('is a bigger movement',() => {
		let map = [
			[0,1,9,9,9,9,9,9,9,9],
			[9,1,1,1,1,9,9,9,9,9],
			[9,9,9,9,1,9,9,9,9,9],
			[9,9,9,9,1,9,9,9,9,9],
			[9,9,9,1,1,9,9,9,9,9],
			[9,9,9,1,9,9,9,9,9,9],
			[9,9,9,1,1,1,1,9,9,9],
			[9,9,9,9,9,9,1,9,9,9],
			[9,9,9,9,9,9,1,1,1,1],
			[9,9,9,9,9,9,9,9,9,1]
		];

		let start = new MockMapPoint2d(0,0,map);
		let goal = new MockMapPoint2d(9,9,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:0,y:1},
			{x:1,y:1},
			{x:1,y:2},
			{x:1,y:3},
			{x:1,y:4},
			{x:2,y:4},
			{x:3,y:4},
			{x:4,y:4},
			{x:4,y:3},
			{x:5,y:3},
			{x:6,y:3},
			{x:6,y:4},
			{x:6,y:5},
			{x:6,y:6},
			{x:7,y:6},
			{x:8,y:6},
			{x:8,y:7},
			{x:8,y:8},
			{x:8,y:9},
			{x:9,y:9}
		];
		pathChecker(expected, path);
	});

	it('is a simple path with cylindrical movement',() => {
		let map = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8]
		];

		let start = new MockMapCylindricalPoint2d(0,0,map);
		let goal = new MockMapCylindricalPoint2d(2,0,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:2,y:0}
		];
		pathChecker(expected, path);
	});

	it('is a bigger path with cylindrical movement',() => {
		let map = [
			[0,0,9,0,0,0,9,0,9,0],
			[9,9,9,9,9,9,9,0,0,0],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,9,9,9,9,9,9,9,9,9],
			[9,0,0,0,9,0,0,0,9,9]
		];

		let start = new MockMapCylindricalPoint2d(0,0,map);
		let goal = new MockMapCylindricalPoint2d(9,9,map);
		let path = aStar(start, goal, h).reverse();

		let expected = [
			{x:0,y:0},
			{x:0,y:1},
			{x:9,y:1},
			{x:9,y:2},
			{x:9,y:3},
			{x:0,y:3},
			{x:0,y:4},
			{x:0,y:5},
			{x:9,y:5},
			{x:9,y:6},
			{x:9,y:7},
			{x:0,y:7},
			{x:1,y:7},
			{x:1,y:8},
			{x:1,y:9},
			{x:0,y:9},
			{x:9,y:9}
		];
		pathChecker(expected, path);
	});
});

var h = (pos, g) => pos.distance(g);

var pathChecker = (actual, expected) => {
	expect(actual).to.have.lengthOf(expected.length);
	for (let i = 0; i < expected.length; ++i) {
		expect(actual[i].x).to.equal(expected[i].x);
		expect(actual[i].y).to.equal(expected[i].y);
	}
}
