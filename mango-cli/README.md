# Mango Gitlab CLI

## Build

```bash
$ go build
# or
$ go build -o path/mango-cli
```

## Config

Plz manually create a config.yaml in the User Root directory and contain the following:

```yaml
username: <your_gitlab_username>
password: <your_gitlab_pwd>
token: <your_gitlab-token>
baseUrl: <your_gitlab_instance_web_url>
```

## Usage

### Projects

A few examples:

List projects:
```bash
$ mango-cli projects
```

Get single project info:
```bash
$ mango-cli project get <pid>
```

Get branches of the project:
```bash
$ mango-cli branches <pid> 
```

## Pipelines

List pipelines:
```bash
$ mango-cli pipelines <pid>
```

Get a pipeline info:
```bash
$ mango-cli pipeline get <pid> <pipeline_id>
```

Create a pipeline:
```bash
# Ref is name of the branch
$ mango-cli pipeline create <pid> <ref>
```

## Commits

List commits of the project since 150 days(default) before:
```bash
$ mango-cli commits <pid>
```

## Mango Ci Yaml

```bash
Version: "abc"
Stages:
  - start
  - build

job-dev:
  stage: start
  script:
    - echo "dev success"

build-job:
  stage: build
  script:
    - echo "build success"
```


