# Manage.sys

## Overview

This project is a full-stack applications that allows for creation of accounts and CRUD operations with store and employee data.

## Table of Contents

-   [Development](#development)<br/>

---

## Development

To run this application locally, you will need the following installed:

-   Node 16+
-   npm 8.3.0+
-   JDK 17
-   Maven 3.8.4+
-   PostgreSQL

**Server Setup**

1. Create a `.env` file in the `server` directory (**Note**: this file will be git ignored)

```
touch .env
```

2. Open up the `.env` file and provide the following environmental variables. **Imporant**

```bash
# URL of database including the database name
# eg. jdbc:postgresql://localhost:5432/studentdatabase
SPRING_DATASOURCE_URL=jdbc:postgresql://{YOUR_DB_URL}

# database username
SPRING_DATASOURCE_USERNAME=

# database password
SPRING_DATASOURCE_PASSWORD=

# JPA Mode
# create-drop - Create, then destroy Schema at the end of session (Will erase everything)
# update - Update the Schema if necessary
# none
SPRING_JPA_DDL_MODE=

# JWT secret key
JWT_SECRET=
```

3. Export the environmental variables

```
export $(cat .env | xargs)
```

or

Directly add .env file to your IDE through a plugin eg. DotEnv on IntelliJ

**Client Setup**

1. Head over to the `client` directory and run the following
```bash
npm i
```

2. Create a `.env` file in the `client` directory (**Note**: this file will be git ignored)

```
touch .env
```

3. Open up the `.env` file and provide the following environmental variables. **Imporant**

```bash
# URL of API
# eg. http://localhost:8080
REACT_APP_API_URL=
```

4. To run the client
```bash
npm start
```