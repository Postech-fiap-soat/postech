package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
)

type Client struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Cpf   string `json:"cpf"`
	Email string `json:"email"`
}

type JwtWrapper struct {
	Token string `json:"token"`
}

func GetClientByCpf(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var client Client
	err := json.Unmarshal([]byte(request.Body), &client)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusBadRequest,
		}, nil
	}
	db, err := getConnection()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	err = db.Ping()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	defer db.Close()
	storedClient, err := getClientDB(db, client)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: `{"errorMessage": "user not found"}`, StatusCode: http.StatusNotFound,
		}, nil
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    storedClient.ID,
		"name":  storedClient.Name,
		"cpf":   storedClient.Cpf,
		"email": storedClient.Email,
	})
	tokenString, err := token.SignedString(getJWTSecret())
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	jwtWrapperJson, err := json.Marshal(JwtWrapper{Token: tokenString})
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	return events.APIGatewayProxyResponse{
		Body:       string(jwtWrapperJson),
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
	// dbConfig = DbConfig{
	// 	DbUser:     os.Getenv("DB_USER"),
	// 	DbPassword: os.Getenv("DB_PASSWORD"),
	// 	DbHost:     os.Getenv("DB_HOST"),
	// 	DbPort:     os.Getenv("DB_PORT"),
	// 	DbName:     os.Getenv("DB_NAME"),
	// }
	dbConfig := DbConfig{
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

func getClientDB(db *sql.DB, client Client) (*Client, error) {
	stmt, err := db.Prepare("select id, name, cpf, email from client where cpf = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var storedClient Client
	err = stmt.QueryRow(client.Cpf).Scan(&storedClient.ID, &storedClient.Name, &storedClient.Cpf, &storedClient.Email)
	if err != nil {
		return nil, err
	}
	return &storedClient, nil
}

func getJWTSecret() []byte {
	return []byte("c29hdGxhbWJkYXNlY3JldA==")
}
