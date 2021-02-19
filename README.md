# nodejs-mentoring

./node_modules/sequelize-cli/lib/sequelize model:generate --name User --attributes login:string,password:string,age:integer,isDeleted:boolean

./node_modules/sequelize-cli/lib/sequelize model:generate --name Group --attributes name:string,permissions:array

./node_modules/sequelize-cli/lib/sequelize model:generate --name UserGroup --attributes userIds:array,groupId:integer

./node_modules/sequelize-cli/lib/sequelize db:migrate


## Docker

docker build -t nodejsmentoring .
docker run -p 3000:3000 --network="host" nodejsmentoring
