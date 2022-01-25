# absence-journal-manager



## Instalation

Install Mysql and nodejs on your system 

Create a mysql database with a user with all access rights on the database. 

In the backend folder create .env file with following variables 

``` 
TOKEN_KEY=A character that will encrypt users login 
MAIL_USER=SMTP mail 
MAIL_PASS= SMTP Password
DB_HOST=Databas Host
DB_NAME=Your DB name 
DB_USER=Your DB USER
DB_PASS=Your DB Pass
```

Run following commands at the backend folder of the project  

``` 
npm install 
node 
```

Run the following commands at the frontend folder of the project 

```
npm install
npm run build
npm install -g serve
npm -s build
```



