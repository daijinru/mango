## network

if curl 0.0.0.0 or other ip failed. But recommend to use the official version of gitlab.
```bash
$ docker network create gitlab-network
$ docker network connect gitlab-network gitlab
$ docker network connect gitlab-network gitlab-runner
```

## How to register for the official gitlab?

Broswer to https://gitlab.com/<user_name>/test-ci/-/settings/ci_cd.
And open `Show runner installation instruction` then follow it to register a runner in the local container.
After that to the edit page of the runner to check `indicates whether this runner can pick jobs without tags`.
