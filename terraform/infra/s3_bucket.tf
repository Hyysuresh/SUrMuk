resource "aws_s3_bucket" "surmuk_bucket" {
    bucket = var.bucket_name
    tags = {
        Name = "surmuk"
        Environment = var.env
    }
    
}
