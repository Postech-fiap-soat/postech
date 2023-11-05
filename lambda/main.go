package lambda

import "encoding/json"

type Client struct {
	Id    int
	Name  string
	Cpf   string
	Email string
}

func GetClientByCpf(cpf string) []byte {
	client := Client{
		Id:    1,
		Name:  "Joao",
		Cpf:   cpf,
		Email: "joao@email.com",
	}
	result, _ := json.Marshal(&client)
	return result
}
