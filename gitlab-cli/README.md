# Mango Gitlab CLI

Learn all the commands:
```bash
$ gitlab-cli help
```

List the subcommands within a single command:
```bash
$ gitlab-cli <subcommand> --help/-h
```

## config

Plz manually create a config.yaml in the User Root directory and contain the following:

```yaml
username: <your_gitlab_username>
password: <your_gitlab_pwd>
token: <your_gitlab-token>
```

## projects

A few examples:

List projects:
```bash
$ gitlab-cli projects
```

Get single project info:
```bash
$ gitlab-cli project get <pid>
```

Get branches of the project:
```bash
$ gitlab-cli branches <pid> 
```

## pipelines

List pipelines:
```bash
$ gitlab-cli pipelines <pid>
```

Get a pipeline info:
```bash
$ gitlab-cli pipeline get <pid> <pipeline_id>
```

Create a pipeline:
```bash
# Ref is name of the branch
$ gitlab-cli pipeline create <pid> <ref>
```

## commits

List commits of the project since 150 days(default) before:
```bash
$ gitlab-cli commits <pid>
```



