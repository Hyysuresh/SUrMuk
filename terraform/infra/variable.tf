variable "aws_region" {
    description = "the aws region to deploy resources"
    type = string
}
variable "env" {
  description = "Deployment environment"
  type = string
}
variable "key_name" {
    description = "Name of the AWS key pair"
    type = string
}
variable "ami_id" {
    description = "AMI ID for the EC2instance"
    type = string
}
variable "instance_type" {
    description = "Type of EC2 instance"
    type = string
} 
variable "bucket_name" {
  description = "the name of the s3 bucket"
  type = string
}