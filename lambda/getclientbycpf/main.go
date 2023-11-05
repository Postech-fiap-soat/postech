package main

import (
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

type Client struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Cpf   string `json:"cpf"`
	Email string `json:"email"`
}

func GetClientByCpf(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	var client Client
	// err := json.Unmarshal([]byte(request.Body), &client)
	// if err != nil {
	// 	return events.APIGatewayProxyResponse{
	// 		Body: err.Error(), StatusCode: http.StatusInternalServerError,
	// 	}
	// }
	// os.Getenv("DB_USER")
	// os.Getenv("DB_PASSWORD")
	// os.Getenv("DB_HOST")
	// os.Getenv("DB_PORT")
	// os.Getenv("DB_NAME")
	// db, err := sql.Open("mysql", "soatuser:soatpassword@tcp(localhost:3306)/soatdb")
	// if err != nil {
	// 	panic(err)
	// }
	// defer db.Close()
	client.ID = 1
	client.Name = "Joao"
	client.Cpf = "123456"
	client.Email = "joao@email.com"
	return events.APIGatewayProxyResponse{
		Body:       client.Name,
		Headers:    map[string]string{"Content-Type": "application/json"},
		StatusCode: http.StatusOK,
	}
}

func main() {
	lambda.Start(GetClientByCpf)
}
