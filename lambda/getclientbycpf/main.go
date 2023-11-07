package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/Postech-fiap-soat/postech/lambda/infra"
	"github.com/Postech-fiap-soat/postech/lambda/model"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
)

func GetClientByCpf(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var client model.Client
	err := json.Unmarshal([]byte(request.Body), &client)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusBadRequest,
		}, nil
	}
	db, err := infra.GetConnection()
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
	storedClient, err := infra.GetClient(db, client)
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
	tokenString, err := token.SignedString(infra.GetJWTSecret())
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: err.Error(), StatusCode: http.StatusInternalServerError,
		}, nil
	}
	jwtWrapperJson, err := json.Marshal(infra.JwtWrapper{Token: tokenString})
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
