export type Binary = 0 | 1;

export type Binary2 = [Binary, Binary];

export type Binary3 = [Binary, Binary, Binary];

export type Binary4 = [...Binary2, ...Binary2];

export type Binary8 = [...Binary4, ...Binary4];

export type Binary12 = [...Binary8, ...Binary4];

export type Binary13 = [...Binary12, Binary];

export type Binary15 = [...Binary12, ...Binary3];

export type Binary16 = [...Binary8, ...Binary8];

export type Word = Binary16;
