package cmd

import (
	"fmt"
	"net"
	"net/rpc"

	command "github.com/daijinru/mango-packages-command"

	// "github.com/daijinru/mango/mango-cli/runner"
	mangoRPC "github.com/daijinru/mango/mango-cli/rpc"
	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

func NewServiceRPC() *command.Command {
  cmd := &command.Command{
    Use: "rpc",
    Args: command.ExactArgs(1),
    RunE: func(cmd *command.Command, args[]string) error {
      return nil
    },
  }
  cmd.AddCommand(NewServiceRpcStart())
  cmd.AddCommand(NewServiceRpcStop())
  return cmd
}

func NewServiceRpcStart() *command.Command {
  return &command.Command{
    Use: "start",
    Args: command.ExactArgs(1),
    RunE: func(cmd *command.Command, args[]string) error {
      ciService := &mangoRPC.CiService{}
      rpc.Register(ciService)
      
      port := ":" + args[0]
      listener, err := net.Listen("tcp", port)
      utils.ReportErr(err, "❌unable start RPC service: %s")
      defer listener.Close()
      
      fmt.Println("🌏Now listening for RPC request at port: " + args[0])
    
      for {
        conn, err := listener.Accept()
        if err != nil {
          utils.ReportErr(err, "❌connect error: %s")
          continue
        }
        go rpc.ServeConn(conn)
      }
    },
  }
}

func NewServiceRpcStop() *command.Command {
  return &command.Command{
    Use: "kill",
    Args: command.ExactArgs(1),
    RunE: func(cmd *command.Command, args[] string) error {
      pid := &runner.Pid{}
      pid.ThinClient(&runner.PidOption{
        Path: args[0],
      })
      err := pid.ProcessKill()
      if err != nil {
        fmt.Printf("failed to kill process: %v\n", err)
      }
      return nil
    },
  }
}
