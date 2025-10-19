module "surmuk-infra" {
  source = "./infra/"
  env = "dev"
  bucket_name = "surmuk-bucket-inc"
  key_name = "surmuk-wesite-key"
  ami_id = "ami-03aa99ddf5498ceb9"
  instance_type = "t3.micro"
  hash_key = "StudentID"
}