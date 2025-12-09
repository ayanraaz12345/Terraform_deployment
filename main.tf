provider "aws" {
  region = "us-east-1"
}

############ Fetch Default VPC ############
data "aws_vpc" "default" {
  default = true
}

############ Security Group ############
resource "aws_security_group" "ec2_sg" {
  name        = "ec2_security_group_new"     # new unique name
  description = "Allow SSH + Nginx"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

############ EC2 Instance ############
resource "aws_instance" "app_ec2" {
  ami                    = "ami-0ecb62995f68bb549"
  instance_type          = "t3.micro"
  key_name               = var.key_pair
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "github-actions-ec2"
  }

  user_data = <<EOF
#!/bin/bash
yum update -y
yum install -y nginx
systemctl enable nginx
systemctl start nginx
EOF
}

############ Outputs ############
output "public_ip" {
  value = aws_instance.app_ec2.public_ip
}

output "url" {
  value = "http://${aws_instance.app_ec2.public_ip}"
}
