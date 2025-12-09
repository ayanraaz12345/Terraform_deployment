provider "aws" {
  region = "us-east-1"
}

# Get default VPC
data "aws_vpc" "default" {
  default = true
}

# Get default VPC subnets (required for EC2 placement)
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

############ Security Group ############
resource "aws_security_group" "ec2_sg" {
  name        = "ec2_security_group"
  description = "Allow Nginx and SSH"
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
  ami                         = "ami-0c02fb55956c7d316"   # Valid Amazon Linux 2 AMI (us-east-1)
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]

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
