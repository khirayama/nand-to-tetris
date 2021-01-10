use anyhow::Result;

pub type ParseResult = (Vec<Node>, Vec<anyhow::Error>)

pub fn parse(contents: &str, symbols: &mut Symbols) -> ParseResult {
    let sources = parse_lines(contents);
}

fn parse_lines() -> Vec<Source> {
}
