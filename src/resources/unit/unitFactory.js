import RobotUnit	from './robotUnit.js';

const unitFactory = {}

unitFactory['robot'] = (city) => new RobotUnit(city);

export default unitFactory;

