#Postgres

docker run \
  --name kuanto-kusta-desafio \
  -e POSTGRES_USER=kuantokusta \
  -e POSTGRES_PASSWORD="kuantokusta" \
  -e POSTGRES_DB=kuantokusta-db \
  -p 5432:5432 \
  -d \
  postgres