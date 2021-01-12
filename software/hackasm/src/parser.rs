use super::a_command::*;
use super::c_command::*;
use super::l_command::*;

use anyhow::Result;

#[derive(Debug)]
pub enum Node {
    A(ACommand),
    C(CCommand),
    L(LCommand),
}

pub type ParseResult = (Vec<Node>, Vec<anyhow::Error>);

pub fn parse(contents: &str, symbols: &mut Symbols) -> ParseResult {
    let sources = parse_lines(contents);
}

fn parse_lines() -> Vec<Source> {
}
