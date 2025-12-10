#!/bin/bash
apt update -y
apt install fontconfig openjdk-17-jre -y

wget -O /usr/share/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | \
    tee /etc/apt/sources.list.d/jenkins.list > /dev/null

apt update -y
apt install jenkins -y

systemctl enable jenkins
systemctl start jenkins

# Install nginx
apt install nginx -y
systemctl start nginx
systemctl enable nginx
