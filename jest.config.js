module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Transform JS/TS using Babel
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-elements|expo|@expo|@unimodules|@react-navigation|@react-native-community|@testing-library))",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to the src directory
  },
};
