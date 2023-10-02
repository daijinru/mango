# Mango CLI

## Build

```bash
$ go build
# or
$ go build -o path/mango-cli
```
## Use Guider

Add it the content below to your `[project-root]/meta-info/.mango-ci.yaml`.
```yaml
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

Execute at the command line.
```bash
$ mango-cli rpc start 1234
```

### How to call by RPC

```go
func main() {
  client, err := rpc.Dial("tcp", "localhost:1234")
  // ...
  defer client.Close()
  // ...
  var reply = &Reply{}
  // ...
  err = client.Call("CiService.Run", reqOption, reply)
  if err != nil {
    fmt.Println("call fail: ", err)
  }
}
```