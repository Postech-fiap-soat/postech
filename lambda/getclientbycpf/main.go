package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
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

func GetClientByCpf(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	db, err := getConnection()
	if err != nil {
		log.Println("Erro ao estabeler conexao:", err.Error())
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	err = db.Ping()
	if err != nil {
		log.Println("Erro ao pingar conexao:", err.Error())
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	defer db.Close()
	client, err := getClientDB(db)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	clientJson, err := json.Marshal(client)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	return events.APIGatewayProxyResponse{
		Body:       string(clientJson),
		Headers:    map[string]string{"Content-Type": "application/json"},
		StatusCode: http.StatusOK,
	}, nil
}

func main() {
	lambda.Start(GetClientByCpf)
}

type DbConfig struct {
	DbUser     string
	DbPassword string
	DbHost     string
	DbPort     string
	DbName     string
}

func getConnection() (*sql.DB, error) {

	var dbConfig DbConfig
	// dbConfig = DbConfig{
	// 	DbUser:     os.Getenv("DB_USER"),
	// 	DbPassword: os.Getenv("DB_PASSWORD"),
	// 	DbHost:     os.Getenv("DB_HOST"),
	// 	DbPort:     os.Getenv("DB_PORT"),
	// 	DbName:     os.Getenv("DB_NAME"),
	// }
	dbConfig = DbConfig{
		DbUser:     "soatuser",
		DbPassword: "soatpassword",
		DbHost:     "terraform-20231104215550504400000002.cv6estrfzfc7.us-east-1.rds.amazonaws.com",
		DbPort:     "3306",
		DbName:     "soatdb",
	}
	// db, err := sql.Open("mysql", "soatuser:soatpassword@tcp(terraform-20231104215550504400000002.cv6estrfzfc7.us-east-1.rds.amazonaws.com:3306)/soatdb")
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbConfig.DbUser, dbConfig.DbPassword, dbConfig.DbHost, dbConfig.DbPort, dbConfig.DbName))
	if err != nil {
		return nil, err
	}
	return db, nil
}

func getClientDB(db *sql.DB) (*Client, error) {
	stmt, err := db.Prepare("select id, name, cpf, email from client where cpf = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var client Client
	err = stmt.QueryRow("04787035116").Scan(&client.ID, &client.Name, &client.Cpf, &client.Email)
	if err != nil {
		return nil, err
	}
	return &client, nil
}
