import {expect} from 'chai';
import aStar from '../../../../src/neuron/ai/path/aStar.js';
import MockMapPoint2d from '../../physics/mockMapPoint2d.js';

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

				expect(path).to.have.lengthOf(5);

				expect(map[path[0].x][path[0].y]).to.equal(0);
				expect(path[0].x).to.equal(0);
				expect(path[0].y).to.equal(0);

				expect(map[path[1].x][path[1].y]).to.equal(1);
				expect(path[1].x).to.equal(0);
				expect(path[1].y).to.equal(1);

				expect(map[path[2].x][path[2].y]).to.equal(2);
				expect(path[2].x).to.equal(0);
				expect(path[2].y).to.equal(2);

				expect(map[path[3].x][path[3].y]).to.equal(5);
				expect(path[3].x).to.equal(1);
				expect(path[3].y).to.equal(2);

				expect(map[path[4].x][path[4].y]).to.equal(8);
				expect(path[4].x).to.equal(2);
				expect(path[4].y).to.equal(2);
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

				expect(path).to.have.lengthOf(5);

				expect(map[path[0].x][path[0].y]).to.equal(0);
				expect(path[0].x).to.equal(0);
				expect(path[0].y).to.equal(0);

				expect(map[path[1].x][path[1].y]).to.equal(1);
				expect(path[1].x).to.equal(1);
				expect(path[1].y).to.equal(0);

				expect(map[path[2].x][path[2].y]).to.equal(2);
				expect(path[2].x).to.equal(2);
				expect(path[2].y).to.equal(0);

				expect(map[path[3].x][path[3].y]).to.equal(5);
				expect(path[3].x).to.equal(2);
				expect(path[3].y).to.equal(1);

				expect(map[path[4].x][path[4].y]).to.equal(8);
				expect(path[4].x).to.equal(2);
				expect(path[4].y).to.equal(2);
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

				expect(path).to.have.lengthOf(5);

				expect(map[path[0].x][path[0].y]).to.equal(0);
				expect(path[0].x).to.equal(0);
				expect(path[0].y).to.equal(0);

				expect(map[path[1].x][path[1].y]).to.equal(1);
				expect(path[1].x).to.equal(0);
				expect(path[1].y).to.equal(1);

				expect(map[path[2].x][path[2].y]).to.equal(2);
				expect(path[2].x).to.equal(1);
				expect(path[2].y).to.equal(1);

				expect(map[path[3].x][path[3].y]).to.equal(5);
				expect(path[3].x).to.equal(1);
				expect(path[3].y).to.equal(2);

				expect(map[path[4].x][path[4].y]).to.equal(8);
				expect(path[4].x).to.equal(2);
				expect(path[4].y).to.equal(2);
		});
});

var h = (pos, g) => pos.distance(g);
