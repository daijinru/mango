package tasks

import (
	"docker-cli/docker"
	"log"
	command "github.com/daijinru/mango-packages-command"
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
				log.Println(unit)
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
			c := &docker.Client{}
			c.NewClient()
			var img = c.InspectImage(args[0])
			println(img.Item.Container)
			return nil
		},
	}
}
