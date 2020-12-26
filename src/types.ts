export type Binary = 0 | 1;

export type Binary2 = [Binary, Binary];

export type Binary3 = [Binary, Binary, Binary];

export type Binary4 = [...Binary2, ...Binary2];

export type Binary6 = [...Binary4, ...Binary2];

export type Binary8 = [...Binary4, ...Binary4];

export type Binary9 = [...Binary6, ...Binary3];

export type Binary12 = [...Binary8, ...Binary4];

export type Binary13 = [...Binary12, Binary];

export type Binary14 = [...Binary12, ...Binary2];

export type Binary15 = [...Binary12, ...Binary3];

export type Binary16 = [...Binary8, ...Binary8];

export type Word = Binary16;

export type Word8 = [Word, Word, Word, Word, Word, Word, Word, Word];

export type Word64 = [Word8, Word8, Word8, Word8, Word8, Word8, Word8, Word8];

export type Word512 = [Word64, Word64, Word64, Word64, Word64, Word64, Word64, Word64];

export type Word4K = [Word512, Word512, Word512, Word512, Word512, Word512, Word512, Word512];

export type Word16K = [Word4K, Word4K, Word4K, Word4K, Word4K, Word4K, Word4K, Word4K];
