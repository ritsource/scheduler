const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const keys = require('../api/src/config/keys');

process.env.TEST_AUTH_EMAIL = keys.test_auth_email;
process.env.TEST_AUTH_PASSWORD = keys.test_auth_password;

Enzyme.configure({ adapter: new Adapter() });