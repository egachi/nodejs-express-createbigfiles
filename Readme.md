## Summary

This express sample creates .txt files with the desired size and with randome names in the current directory.
This sample is designed just for testing, please do not use this code in production.

>This sample is using async functions so at least you will need node > v8.x.

## Routes

| Route        | Syntax                                                  | Description                                  |
| -----------  | -----------------------------------------------------   | ---------------------------------------------
| Create Files | `http://{hostname}:{port}/create?sizeinmb=400&limit=20` | Size in MegaBytes, Limit of Files            |
| Delete All   | `http://{hostname}:{port}/delete/all`                   | Delete all files created with .txt extension |

## How to run this sample
- Use `npm start` to start the server, it will be listening in port 3000 or asigned by env.