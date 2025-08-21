import { getBankBalance, BankAddWid, UserAdd, UserVerify } from "./account"
export const handler2 = async (event: any) => {
    let output;
    switch (event.function) {
        case "BankAddWid":
            output = await BankAddWid(event.username, event.attribute);
            break;
        case "getBankBalance":
            output = await getBankBalance(event.username);
            break;
        case "UserAdd":
            output = await UserAdd(event.username, event.attribute)
            break
        case "UserVerify":
            output = await UserVerify(event.username, event.attribute)
            break
        default:
            throw new Error(`Unsupported function: ${event.function}`);
    }
    return output;
}