import { handler2 } from "./src/handler2"
let event = {
    function: "BankAddWid",
    username: "sidh",
    attribute: 1000
}
let print = async () => {
    let output = await handler2(event)
    console.log(output)
}
print()