use std::env;
use std::process;

fn main() {
    let filename = get_filename();
    println!("{}", filename);
}

fn get_filename() -> String {
    let args: Vec<String> = env::args().collect();
    let name = args.get(1).unwrap_or_else(|| {
        println!("Require arguments.");
        process::exit(1);
    });
    return String::from(name);
}
