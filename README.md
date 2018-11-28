# Инструкция по первому подключению к БД Cloud SQL
1. Просим доступ к проекту в Google Cloud Console (GCC) у Антохи
2. В GCC открываем SQL и запускаем instance (экземпляр) pgsql
3. Устанавливаем [Cloud SDK](https://cloud.google.com/sdk/docs/) на локальную машину
4. Устанавливаем npm на локальную машину
5. Открываем проект в WebStorm или IntellijIDEA
6. Пишем в терминале
	```
	npm install
	npm update
	gcloud auth login
	```
7. Переходим по ссылке в терминале и авторизуемся через подключенную к проекту учетную запись google
8. Полученный ключ вставляем в терминал и жмем Enter
9. Пишем в терминале
    ```
    gcloud config set project voice-gen-220900
    cloud_sql_proxy -instances=voice-gen-220900:europe-west1:pgsql=tcp:5432
    ```
10. Запускаем server.js
11. Работаем

## Инструкция для последующих подключений
1. Подключаемся к прокси командой
   `cloud_sql_proxy -instances=voice-gen-220900:europe-west1:pgsql=tcp:5432`
2. Запускаем server.js
3. Работаем


## Дополнительная информация
Пример запроса на локальной машине к БД Cloud SQL:

`http://localhost:8080/?id=3&fullName=Дроздов Игорь Сергеевич&email=drozd@mail.ru
&cliPhone=9305007080&address=г. Липецк, ул. Красноармейская, д. 16, кв. 35&pasSeries=1123&pasNumber=343434
&pasIssued=отделом УФМС России по Красноярскому краю в г. Красноярске&pasDateIssued=11.10.2018&pasDevisCode=135666`

Данные конфигурации указаны в [app.yaml](app.yaml):

```
USER: postgres
PASSWORD: P@ssword
DATABASE: webdb
INSTANCE_CONNECTION_NAME: voice-gen-220900:europe-west1:pgsql
NODE_ENV: deployment
```

# Развертывание сервера в Compute Engine
Вообще деплой проекта выполняется двумя строчками:

Авторицация `gcloud auth login` и сам деплой `gcloud app deploy`, НО если это не сработало, 
то можно попробовать следующее:

Загрузить сервер в ВМ и в командной строке прописать следующие строчки для установки node.js и npm
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs
```
Проверяем
```
node -v
npm -v
```
В файле [package.json](package.json) после строки `"start": "node index.js"` дописываем `"deploy": "gcloud app deploy"`,
если это не было сделано ранее.

Можно установить глобальные переменные:
```
export SQL_USER=postgres
export SQL_PASSWORD=P@ssword
export SQL_DATABASE=webdb
export INSTANCE_CONNECTION_NAME=voice-gen-220900:europe-west1:pgsql
export PORT=80
```

Установить npm `npm install` и протестировать приложение `npm start`

Установить проект по умолчанию `gcloud config set project voice-gen-220900`

Загрузть прокси
```
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy
```
Попробовать выполнить другие манипуляции с [Using Cloud SQL for PostgreSQL](https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-sql-postgres) и
[Using Cloud SQL with Node.js](https://cloud.google.com/nodejs/getting-started/using-cloud-sql)

Снова выполнить деплой первыми двумя строчками.

# Swagger generated server

## Overview
This server was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.  By using the [OpenAPI-Spec](https://github.com/OAI/OpenAPI-Specification) from a remote server, you can easily generate a server stub.

### Running the server
To run the server, run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.

123
