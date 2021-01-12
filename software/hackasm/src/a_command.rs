#[derive(Debug, Clone)]
pub struct ACommand {
    pub symbol_name: Option<String>,
    pub addr: usize,
    pub value: i64,
    source: Source,
}

impl ACommand {
    pub fn new(addr: usize, sym: String, value: i64, source: Source) -> ACommand {
        ACommand {
            symbol_name: Some(sym),
            addr,
            value,
            source,
        }
    }

    pub fn new_with_value(addr: usize, value: i64, source: Source) -> ACommand {
        ACommand {
            symbol_name: None,
            addr,
            value,
            source,
        }
    }

    pub fn new_with_symbol(addr: usize, sym: String, source: Source) -> ACommand {
        ACommand {
            symbol_name: Some(sym),
            addr,
            value: -1,
            source,
        }
    }
}
