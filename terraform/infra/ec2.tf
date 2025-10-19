resource "aws_key_pair" "surmuk_key" {
    key_name = var.key_name
    public_key = file("your_public_key.pub")
    tags = {
        Environment = var.env
    }
}
resource "aws_default_vpc" "default" {

}
resource "aws_security_group" "surmuk_sg" {
    name = "surmuk_security_group"
    description = "Security group for surmuk EC2 instances"
    vpc_id = aws_default_vpc.default.id
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Allow SSH access from anywhere"
    }
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Allow HTTP access from anywhere"
    }
    ingress {
        from_port = 443
        to_port = 443
        cidr_blocks = ["0.0.0.0/0"]
        protocol = "tcp"
        description = "HTTPS"
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        description  = "OutBound"
    }

}
resource "aws_instance" "surmuk_ec2" {
    ami = var.ami_id
    instance_type = var.instance_type
    key_name = aws_key_pair.surmuk_key.key_name
    security_groups = [aws_security_group.surmuk_sg.name]
    root_block_device {
        volume_size = var.env == "dev" ? 30 : 10
        volume_type = "gp3"
    }
    tags = {
        Name = "surmuk_ec2_instance"
        Environment = var.env
    }

}