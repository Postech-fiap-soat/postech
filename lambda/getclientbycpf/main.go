package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

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
	_, err = getClientDB(db)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	clientJson, err := json.Marshal(dbConfig)
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

var dbConfig DbConfig

type DbConfig struct {
	DbUser     string
	dbPassword string
	dbHost     string
	dbPort     string
	dbName     string
}

func getConnection() (*sql.DB, error) {
	dbConfig = DbConfig{
		DbUser:     os.Getenv("DB_USER"),
		dbPassword: os.Getenv("DB_PASSWORD"),
		dbHost:     os.Getenv("DB_HOST"),
		dbPort:     os.Getenv("DB_PORT"),
		dbName:     os.Getenv("DB_NAME"),
	}
	// dbUser := os.Getenv("DB_USER")
	// dbPassword := os.Getenv("DB_PASSWORD")
	// dbHost := os.Getenv("DB_HOST")
	// dbPort := os.Getenv("DB_PORT")
	// dbName := os.Getenv("DB_NAME")
	db, err := sql.Open("mysql", "soatuser:soatpassword@tcp(terraform-20231104215550504400000002.cv6estrfzfc7.us-east-1.rds.amazonaws.com:3306)/soatdb")

	// db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName))
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
