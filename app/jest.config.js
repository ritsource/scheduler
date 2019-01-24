module.exports = {
  "transform": {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest'
  },
  "modulePathIgnorePatterns": ["<rootDir>/src/"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.js",
}