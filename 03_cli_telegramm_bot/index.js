import { program } from "commander";
import contactsApi from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsApi.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContactById = await contactsApi.getContactById(id);
      return console.log(oneContactById);

    case "add":
      const newContact = await contactsApi.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const deletedContact = await contactsApi.removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const consoleActions = program.opts();

invokeAction(consoleActions);
