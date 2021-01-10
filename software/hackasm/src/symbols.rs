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
