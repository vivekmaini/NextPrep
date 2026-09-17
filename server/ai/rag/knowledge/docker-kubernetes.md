# Docker & Kubernetes Interview Guide

## 1. Docker Fundamentals
- **What is Docker?** A platform that uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries, and configuration files.
- **Image vs Container:** An Image is a read-only template with instructions for creating a Docker container. A Container is a runnable instance of an image.
- **Dockerfile:** A text document containing all the commands a user could call on the command line to assemble an image.
- **Docker Compose:** A tool for defining and running multi-container Docker applications using a YAML file.

## 2. Containerization vs Virtualization
- **Virtual Machines (VMs):** Include the application, the necessary binaries/libraries, and an entire guest operating system. Heavyweight and slow to boot.
- **Containers:** Include the application and all of its dependencies, but share the kernel with other containers. Lightweight, fast to boot, and highly portable.

## 3. Kubernetes (K8s) Basics
Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.
- **Pod:** The smallest and simplest Kubernetes object. A Pod represents a set of running containers on your cluster.
- **Node:** A worker machine in Kubernetes (can be virtual or physical).
- **Cluster:** A set of Node machines for running containerized applications.

## 4. Advanced K8s Concepts
- **Deployment:** Provides declarative updates for Pods and ReplicaSets. Allows you to describe an application’s life cycle, such as which images to use for the app, the number of pods, and the way to update them.
- **Service:** An abstract way to expose an application running on a set of Pods as a network service.
- **ConfigMaps & Secrets:** Used to store non-confidential data in key-value pairs (ConfigMaps) and sensitive data like passwords or tokens (Secrets) so they don't have to be hardcoded in the Pod specification.
