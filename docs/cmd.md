#### make HASHED_PASSWORD
```bash
printf "thisismypassword" | sha256sum | cut -d' ' -f1
```

```bash
# Mac OS
$ brew install sha3sum
$ printf "thisismypassword" | sha3sum | cut -d' ' -f1
```