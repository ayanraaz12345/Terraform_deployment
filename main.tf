provider "aws" {
  region = "us-east-1"
}

############ Generate Random ID ############
resource "random_id" "rand" {
  byte_length = 4
}

############ Fetch Default VPC ############
data "aws_vpc" "default" {
  default = true
}

############ Security Group ############
resource "aws_security_group" "ec2_sg" {
  name        = "terraform-sg-${random_id.rand.hex}"
  description = "Allow SSH + HTTP + Jenkins"
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

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   # Jenkins Port
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

############ S3 Bucket ############
resource "aws_s3_bucket" "my_bucket" {
  bucket        = "terraform-deploy-${random_id.rand.hex}"
  force_destroy = true
}

############ EC2 Instance (Install Jenkins + Nginx) #########
resource "aws_instance" "app_ec2" {
  ami                    = "ami-0ecb62995f68bb549"
  instance_type          = "t3.micro"
  key_name               = var.key_pair
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "terraform-jenkins-ec2"
  }

  user_data = file("jenkins.sh")
}

############ Outputs ############
output "jenkins_url" {
  value = "http://${aws_instance.app_ec2.public_ip}:8080"
}

output "public_ip" {
  value = aws_instance.app_ec2.public_ip
}
