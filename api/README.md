# postect-soat

Pós Tech - SOAT1

Notion - Wiki

https://cultured-maple-e0d.notion.site/0d54e29fb7ce4a7d9111c8378c8f9e2e?v=646535e51d35443881df3e5d84db68f7&pvs=4

Miro 

https://miro.com/app/board/uXjVM9qlyR4=/?share_link_id=621731042903

Acesso a API no EKS

http://a83f27ccb59044e86b3144b62c748d2c-888176295.us-east-2.elb.amazonaws.com/api


# How to run

## kubernets
Os arquivos de configuração yml se encontram na pasta ./manifest

## prod
Subir o docker compose 
```
docker compose up
```

## dev
Subir o docker compose dev
```
 docker compose -f docker-compose.dev.yml up
```

O docker compose ira subir a aplicação na porta 3000 e o banco de dados (mySql).
Para acessar o swagger da aplicação basta acessar http://localhost:3000/api

