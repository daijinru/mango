package utils

import "reflect"

func MangoPrintTemplate(m interface{}) string {
	typ := reflect.TypeOf(m)
	val := reflect.ValueOf(m)

	mangoClosedChar := "🥭<mango>"
	num := val.NumField()
	for i := 0; i < num; i++ {
		typName := typ.Field(i).Name
		tagName := typ.Field(i).Tag.Get("json")
		mangoClosedChar += "" + typName + "&&${" + tagName + "},"
	}
	mangoClosedChar += "</mango>"
	return mangoClosedChar
}
