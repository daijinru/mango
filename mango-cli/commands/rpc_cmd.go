package cmd

import (
	"fmt"
	"net"
	"net/rpc"

	command "github.com/daijinru/mango-packages-command"
	mangoRPC "github.com/daijinru/mango/mango-cli/rpc"
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
      if err != nil {
        fmt.Printf("❌unable start RPC service: %s", err)
      }
      defer listener.Close()
      
      fmt.Println("🌏 Now listening for RPC request at port: " + args[0])
    
      for {
        conn, err := listener.Accept()
        if err != nil {
          fmt.Printf("❌connect error: %s", err)
          continue
        }
        go rpc.ServeConn(conn)
      }
    },
  }
}
