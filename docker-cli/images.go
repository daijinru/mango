package main

import (
	"docker-cli/docker"
	command "github.com/daijinru/mango-packages-command"
	"log"
)

func NewCmdImages() *command.Command {
	root := &command.Command{
		Use:  "images",
		Args: command.ExactArgs(0),
		RunE: func(cmd *command.Command, args []string) error {
			c := &docker.Client{}
			c.NewClient()
			var images = c.ListImages()
			//log.Print(images.Size)
			for _, unit := range images.List {
				log.Println(unit.ID)
				//log.Println(unit.Labels)
				//log.Println(unit.Created)
				//log.Println(unit.RepoTags)
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
			log.Println(args)
			return nil
		},
	}
}
