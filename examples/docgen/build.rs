fn main() {
  std::fs::write_file("test.txt", &vec![], 0o666);
}
