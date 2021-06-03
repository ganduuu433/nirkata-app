resource "google_cloudbuild_trigger" "github_push_master_trigger" {
  name     = "github-push-master-trigger"
  filename = "cloudbuild.yaml"

  trigger_template {
    branch_name = "master"
    repo_name   = var.gcp_cloud_source_repo
  }
}