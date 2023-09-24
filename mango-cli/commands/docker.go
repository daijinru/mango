package cmd

import (
	"fmt"
	"log"
	command "github.com/daijinru/mango-packages-command"
)

func NewDockerConfig() *command.Command {
	cmd := &command.Command{
		Use: "docker",
		RunE: func(cmd *command.Command, args []string) error {
      log.Println(11)
			return nil
		},
	}
  cmd.AddCommand(NewDockerImages())
  cmd.AddCommand(NewDockerImage())
	return cmd
}

func NewDockerImages() *command.Command {
  cmd := &command.Command{
    Use: "images",
    RunE: func(cmd *command.Command, args []string) error {
      images := docker.ListImages()
      for _, unit := range images.List {
        log.Println(unit)
      }
      return nil
    },
  }
  return cmd
}

func NewDockerImage() *command.Command {
  cmd := &command.Command{
    Use: "inspect",
    Args: command.ExactArgs(1),
    RunE: func(cmd *command.Command, args []string) error {
      img := docker.InspectImage(args[0])
      fmt.Printf("%+v", img.Item)
      return nil
    },
  }
  return cmd
}
