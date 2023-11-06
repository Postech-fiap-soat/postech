package infra

type JwtWrapper struct {
	Token string `json:"token"`
}

func GetJWTSecret() []byte {
	return []byte("c29hdGxhbWJkYXNlY3JldA==")
}
