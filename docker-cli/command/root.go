package command

import (
	"errors"
	"log"
	"os"
	"strings"
)

type Command struct {
	Use      string                                  `json:"use"`
	RunE     func(cmd *Command, args []string) error `json:"runE"`
	commands []*Command                              `json:"commands"`
	parent   *Command                                `json:"parent"`
	args     []string                                `json:"args"`
}

func (c *Command) LogFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func (c *Command) Execute() error {
	err := c.ExecuteC()
	return err
}

func (c *Command) FlagsString() string {
	var out string
	for _, f := range c.args {
		out = out + f + ","
	}
	return out
}

func (c *Command) ExecuteC() error {
	args := os.Args[1:]
	cmd, flags, err := c.Find(args)
	if err != nil {
		c.LogFatal(err)
	}
	c.args = flags
	if cmd != nil {
		err = cmd.execute(flags)
		c.LogFatal(err)
	} else {
		c.LogFatal(errors.New(c.args[0] + " flag not exist: " + c.FlagsString()))
	}

	return err
}

func (c *Command) execute(a []string) error {
	if c.RunE == nil {
		c.LogFatal(errors.New("RunE does not exist"))
	}
	err := c.RunE(c, a)
	c.LogFatal(err)
	return nil
}

func stripFlags(args []string) []string {
	if len(args) == 0 {
		return args
	}

	var commands []string

Loop:
	for len(args) > 0 {
		s := args[0]
		args = args[1:]
		switch {
		case s == "--":
			break Loop
		case strings.HasPrefix(s, "--"):
			fallthrough
		case strings.HasPrefix(s, "-"):
			if len(args) <= 1 {
				break Loop
			} else {
				args = args[1:]
				continue
			}
		case s != "" && !strings.HasPrefix(s, "-"):
			commands = append(commands, s)
		}
	}

	return commands
}

func (c *Command) Find(args []string) (*Command, []string, error) {
	flags := stripFlags(args)
	commandFound := c.findSubCommand(flags[0])
	return commandFound, flags, nil
}

func (c *Command) Name() string {
	name := c.Use
	i := strings.Index(name, " ")
	if i >= 0 {
		name = name[:i]
	}
	return name
}

func (c *Command) findSubCommand(next string) *Command {
	for _, cmd := range c.commands {
		if cmd.Name() == next {
			return cmd
		}
	}
	return nil
}

func (c *Command) AddCommand(cmd *Command) {
	cmd.parent = c
	c.commands = append(c.commands, cmd)
}
