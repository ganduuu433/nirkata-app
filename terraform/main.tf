terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  project     = var.gcp_project_id
  region      = "asia-southeast2"
  zone        = "asia-southeast2-a"
}