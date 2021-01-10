use std::env;
use std::process;

fn main() {
    let filename = get_filename();
    println!("{}", filename);

    validate_filename(&filename);
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
