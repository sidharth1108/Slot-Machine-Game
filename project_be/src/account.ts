import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
export const getBankBalance = async (username: string) => {
    const command = new GetCommand({
        TableName: "account_db",
        Key: {
            username: username,
        },
    });

    const response = await docClient.send(command);
    if (response.Item) {
        return response.Item.bank_amount;
    }
    else {
        return undefined
    }
};
export const BankAddWid = async (username: string, amount: number) => {
    let currentbal: number = await getBankBalance(username);
    if (Number.isInteger(amount) == true) {

        const command = new UpdateCommand({
            TableName: "account_db",
            Key: {
                username: username,
            },
            UpdateExpression: "SET bank_amount = :amount",
            ExpressionAttributeValues: {
                ":amount": currentbal + amount
            },
            ReturnValues: "ALL_NEW",
        });

        const response = await docClient.send(command);
        if (response.Attributes)
            return response.Attributes.bank_amount;
        else {
            console.log("undefined");
            return undefined;
        }
    }
    else {
        return "amount to be added should be an integer"
    }
};
export const UserAdd = async (username: string, password: any) => {
    if (await getBankBalance(username) == undefined) {
        const command = new PutCommand({
            TableName: "account_db",
            Item: {
                username: username,
                password: password,
                bank_amount: 0,
            },
        });
        const response = await docClient.send(command);
        return "user added"
    }
    else {
        return "username already exists"
    }
};
export const UserVerify = async (username: string, password: any) => {
    if (await getBankBalance(username) == undefined) {
        return "failed"
    }
    else {
        const command = new GetCommand({
            TableName: "account_db",
            Key: {
                username: username,
            },
        });
        const response = await docClient.send(command);
        if (response.Item) {
            if (response.Item.password == password) {
                return "verified"
            }
            else {
                return "failed"
            }
        }
    }
}
