# Mango Docker Client

This cli only runs locally, plz install docker at first, and run as follows:

```bash
$ docker-cli <flag> <args>
```

## docker-cli/command

A tool supports adding sub commands.
```go
rootCmd := &command.Command{
	Use: "root"
}

// new a subcmd
subCmd := &command.Command{
	use: "next"
}
subCmd.addCommand(&command.Command{
	use: "next_sub",
})

// add the sub to root
rootCmd.addCommand(subCmd)
rootCmd.Execute()
```

## images

List images:
```bash
$ docker-cli images
```

Get image with id:
```bash
$ docker-cli images get <id>
```

