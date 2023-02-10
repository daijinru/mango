package main

import (
	"docker-cli/command"
	"fmt"
	docker "github.com/fsouza/go-dockerclient"
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
			log.Println(args)
			client, err := docker.NewClientFromEnv()
			cmd.LogFatal(err)
			imgs, err := client.ListImages(docker.ListImagesOptions{All: false})
			cmd.LogFatal(err)
			for _, img := range imgs {
				fmt.Println("ID: ", img.ID)
				fmt.Println("RepoTags: ", img.RepoTags)
				fmt.Println("Created: ", img.Created)
				fmt.Println("Size: ", img.Size)
				fmt.Println("VirtualSize: ", img.VirtualSize)
				fmt.Println("ParentId: ", img.ParentID)
			}
			return nil
		},
	})
	rootCommand.Execute()
}
