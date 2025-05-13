# Basic UI

## Setup

### Node Package Manager

Inside the client and server folders run the following command.

```
npm install
```

### Server Environment File

Create a .env file at the root of the server folder and populate the following inside it. Replace the quoted text with your credentials.

```
DB_URL="your_db_url"
DB_NAME="your_db_name"
DB_USER="your_db_username"
DB_PW="your_db_password"
CLIENT_URL="client_url"
```

### Client Environment File

Create a .env file at the root of the server folder and populate the following inside it. Replace the quoted text with your credentials.

```
REACT_APP_CRUD_PATH="server_url"
PORT="client_port"
```

## Starting The UI in Dev Mode

In separate terminals for the server and client run the following at the root of each folder.

```
npm start
```