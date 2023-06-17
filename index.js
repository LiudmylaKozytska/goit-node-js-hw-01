const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      contacts ? console.table(contacts) : console.log("Contact not found");
      break;

    case "get":
      const contact = await getContactById(id);
      contact ? console.table(contact) : console.log("Contact not found");
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      newContact
        ? console.table(newContact)
        : console.log("Error adding contact");
      break;

    case "remove":
      const removedContact = await removeContact(id);
      removedContact
        ? console.table(removedContact)
        : console.log("Contact not found");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
