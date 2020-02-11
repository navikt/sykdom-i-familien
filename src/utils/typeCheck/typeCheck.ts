export interface Person {
    name: string;
    age: number;
}
export interface Animal {
    name: string;
    type: 'cat' | 'dog'
}

export type PersonOrAnimal = Person | Animal

// typeguard that returns a type predicate
export const determineIfIsAnimal = (toBeDetermined: any): toBeDetermined is Animal => {
    return !!(toBeDetermined && (toBeDetermined as Animal).type);
};

export const typeCheckOf = <T extends any>(t: T): boolean => {
    return true;
};
