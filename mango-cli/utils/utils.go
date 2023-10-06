package utils

import (
  "bufio"
  "errors"
  "fmt"
  "io"
  "log"
  "os"
  "time"
  "path/filepath"
  "reflect"
  "github.com/google/uuid"
)

func TimeNow() string {
  return time.Now().Format("01-02-2006 15:04:05")
}

func GenerateUUIDFileName() string {
	u := uuid.New()

	fileName := u.String()
	fileName = fileName[:8] + fileName[9:13] + fileName[14:18] + fileName[19:23] + fileName[24:]

	return fileName
}

func CheckType(args ...interface{}) {
  var argType string = reflect.TypeOf(args[0]).Kind().String()
  var argName string = "unknown variable name"

  if len(args) > 1 && args[1] != nil {
    argName = args[1].(string)
  }

  switch argType {
    case "int":
      if args[0] == 0 {
        ReportErr(errors.New(argName + ": type is int but it is 0"))
      }
    case "string":
      if (args[0] == "") {
        ReportErr(errors.New(argName + ": type is string but it is empty"))
      }
    default:
      return
  }
}

// convert []string, output 1 string
func ConvertArrayToStr(arr []string) string {
  merged := ""
  for i := 0; i < len(arr); i++ {
    merged += arr[i]
  }
  return merged
}

func ReadFile(path string) []byte {
  file, e := os.OpenFile(filepath.Join(path), os.O_RDONLY, 0)
  if e != nil {
    log.Fatal(e)
  }

  defer file.Close()

  reader := bufio.NewReader(file)
  var res []byte
  for {
    line, err := reader.ReadByte()
    if err == io.EOF {
      break
    }
    res = append(res, line)
  }
  return res
}

func StructToMap(m interface{}) map[string]interface{} {
  out := map[string]interface{}{}
  if m == nil {
    return out
  }
  typ := reflect.TypeOf(m)
  value := reflect.ValueOf(m)
  value = reflect.Indirect(value)
  if typ.Kind() == reflect.Pointer {
    // tips: it equivalent to *Ptr. @2022/11/29
    typ = typ.Elem()
  }
  for i := 0; i < typ.NumField(); i++ {
    tag := typ.Field(i).Tag.Get("json")
    // todo: It panics if the Value was obtained by accessing unexported struct fields. "official note"
    field := value.Field(i).Interface()
    if tag != "" && tag != "-" {
      if value.Field(i).Type().Kind() == reflect.Struct {
        out[tag] = StructToMap(field)
      } else {
        out[tag] = field
      }
    }
  }
  return out
}

func ExpandMapToString(m map[string]interface{}) map[string]string {
  out := make(map[string]string)
  for k, v := range m {
    out[k] = fmt.Sprintf("%v", v)
  }
  return out
}
