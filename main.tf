provider "aws" {
  region = "us-east-1"
}

############ Security Group ############
resource "aws_security_group" "ec2_sg" {
  name   = "ec2_security_group"
  vpc_id = "default"

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
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

############ EC2 Instance ############
resource "aws_instance" "app_ec2" {
  ami                    = "" # Amazon Linux 2
  instance_type          = "t2.micro"
  key_name               = var.key_pair
  security_groups        = [aws_security_group.ec2_sg.name]

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
