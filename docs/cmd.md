make HASHED_PASSWORD
```bash
printf "thisismypassword" | sha256sum | cut -d' ' -f1
```