package main

import (
	"docker-cli/docker"
	command "github.com/daijinru/mango-packages-command"
)

func NewCmdImages() *command.Command {
	root := &command.Command{
		Use:  "images",
		Args: command.ExactArgs(0),
		RunE: func(cmd *command.Command, args []string) error {
			c := &docker.Client{}
			var images = c.ListImages()
			out := ""
			//log.Print(images.Size)
			for _, unit := range images.List {
				for k, v := range unit.Labels {
					out += " " + k + ": " + v
				}
				Lime(out)
			}
			return nil
		},
	}
	root.AddCommand(newCmdImageGet())
	return root
}

func newCmdImageGet() *command.Command {
	return &command.Command{
		Use:  "get",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			c := &docker.Client{}
			c.NewClient()
			var img = c.InspectImage(args[0])
			println(img.Item.Container)
			return nil
		},
	}
}
