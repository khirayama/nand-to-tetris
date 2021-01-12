use hackasm::symbols::Symbols;
use hackasm::parser;

use std::env;
use std::process;
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let filename = get_filename();

    validate_filename(&filename);

    let contents = read_source(&filename);
    println!("{}", contents);

    let mut symbols = Symbols::new();

    let (nodes, errors) = parser::parse(&contents, &mut symbols);
}

fn get_filename() -> String {
    let args: Vec<String> = env::args().collect();
    let name = args.get(1).unwrap_or_else(|| {
        println!("Require arguments.");
        process::exit(1);
    });
    String::from(name)
}

fn validate_filename(filename: &str) {
    if !filename.ends_with(".asm") {
        println!("Invalid filename. Expected '*.asm': {:?}", filename);
        process::exit(1);
    }
}

fn read_source(filename: &str) -> String {
    let mut contents = String::new();
    File::open(filename).unwrap_or_else(|err| {
        println!("Cannot read file: {}", err);
        process::exit(1);
    })
    .read_to_string(&mut contents)
        .unwrap_or_else(|err| {
        println!("Cannot read file: {}", err);
        process::exit(1);
        });
    contents
}
