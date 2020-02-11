import { Animal, determineIfIsAnimal, Person } from '../typeCheck';

describe("Test that jest testing works with typescript", () => {
    it("can sum up two numbers and expect the result etc", () => {

        const tonio: Person = {
            name: "Tonio",
            age: 35
        };
        const toniosCat: Animal = {
            name: "Nala",
            type: 'cat'
        };

        expect(determineIfIsAnimal(tonio)).toBeFalsy()
        expect(determineIfIsAnimal(toniosCat)).toBeTruthy()

        expect(determineIfIsAnimal(null)).toBeFalsy();
        expect(determineIfIsAnimal(undefined)).toBeFalsy();
        expect(determineIfIsAnimal(0)).toBeFalsy();
        expect(determineIfIsAnimal([])).toBeFalsy();
        expect(determineIfIsAnimal({})).toBeFalsy();

        expect(determineIfIsAnimal(
            {
                name: 'Fester',
                type: 'dog',
                owner: {
                    name: 'Magnus',
                    age: 33
                }
            }
            )).toBeTruthy();
    })
});