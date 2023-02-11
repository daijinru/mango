package main

import (
	"docker-cli/command"
	"docker-cli/docker"
	"log"
)

func main() {
	rootCommand := &command.Command{
		Use: "docker cli",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
	rootCommand.AddCommand(&command.Command{
		Use: "images",
		RunE: func(cmd *command.Command, args []string) error {
			c := &docker.Client{}
			c.NewClient()
			var images = c.ListImages()
			log.Print(images.Size)
			for _, unit := range images.List {
				log.Println(unit.ID)
				log.Println(unit.Labels)
				log.Println(unit.Created)
				log.Println(unit.RepoTags)
			}
			return nil
		},
	})
	rootCommand.AddCommand(&command.Command{
		Use:  "image",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	})
	rootCommand.Execute()
}
