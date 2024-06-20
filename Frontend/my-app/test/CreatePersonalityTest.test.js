const CreatePersonalityTest = require('../src/data/CreatePersonalityTest');

test("Create Personality Test should return an array of length 2", () => {
    expect(CreatePersonalityTest()).toHaveLength(2);
})