import ConstructionUnit	from './constructionUnit.js';

const unitFactory = {}

unitFactory['constructionRobot'] = (city) => new ConstructionUnit(city);

export default unitFactory;

