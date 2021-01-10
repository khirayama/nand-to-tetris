use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Symbol {
    pub name: String,
    pub addr: usize,
}

impl Symbol {
    pub fn new(name: String, addr: usize) -> Symbol {
        Symbol {
            name,
            addr,
        }
    }
}

pub struct Symbols {
    table: HashMap<String, Symbol>,
    offset: usize,
}

const DEFINED_SYMBOLS: &[(&str, usize)] = &[
    ("SP", 0),
    ("LCL", 1),
    ("ARG", 2),
    ("THIS", 3),
    ("THAT", 4),
    ("SCREEN", 16384),
    ("KBD", 24576),
];

impl Symbols {
    pub fn new() -> Symbols {
        let mut table: HashMap<String, Symbol> = HashMap::new();

        DEFINED_SYMBOLS.into_iter().for_each(|(name, addr)| {
            let name = String::from(*name);
            table.insert(
                name.clone(),
                Symbol {
                    name,
                    addr: *addr,
                },
            );
        });

        for n in 0..16 {
            let name = format!("R{}", n);
            table.insert(
                name.clone(),
                Symbol {
                    name,
                    addr: n,
                },
            );
        }

        Symbols {
            table,
            offset: 16,
        }
    }
}
