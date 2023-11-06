package infra

import (
	"database/sql"
	"fmt"

	"github.com/Postech-fiap-soat/postech/lambda/model"
)

type DbConfig struct {
	DbUser     string
	DbPassword string
	DbHost     string
	DbPort     string
	DbName     string
}

func GetConnection() (*sql.DB, error) {
	dbConfig := DbConfig{
		DbUser:     "soatuser",
		DbPassword: "soatpassword",
		DbHost:     "terraform-20231104215550504400000002.cv6estrfzfc7.us-east-1.rds.amazonaws.com",
		DbPort:     "3306",
		DbName:     "soatdb",
	}
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbConfig.DbUser, dbConfig.DbPassword, dbConfig.DbHost, dbConfig.DbPort, dbConfig.DbName))
	if err != nil {
		return nil, err
	}
	return db, nil
}

func GetClient(db *sql.DB, client model.Client) (*model.Client, error) {
	stmt, err := db.Prepare("select id, name, cpf, email from client where cpf = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var storedClient model.Client
	err = stmt.QueryRow(client.Cpf).Scan(&storedClient.ID, &storedClient.Name, &storedClient.Cpf, &storedClient.Email)
	if err != nil {
		return nil, err
	}
	return &storedClient, nil
}
