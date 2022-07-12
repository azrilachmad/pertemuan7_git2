// Node Modules
const yargs = require("yargs")
const contacts = require("./contact")
const fs = require('fs');


// Yargs Command add data to list
yargs.command({
    command: 'add',
    describe: 'add new contact',
    builderr:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'Contact Email',
            demandOption: false,
            type: 'string',
        },
        mobile:{
            describe: 'Contact Mobile',
            demandOption: false,
            type: 'string',
        }
    },    
    handler(argv){
        
        contacts.cekData()
        contacts.cekFile()  
        contacts.saveData(argv.name.charAt(0).toUpperCase() + argv.name.slice(1).toLowerCase(),argv.email,argv.mobile.toString())
    }
}),


// Yargs Command show list of data
yargs.command({
    command: 'list',
    describe: 'See contact list',
    handler(){
        contacts.listContact();
    },
})

// Yargs command show user details
yargs.command({
    command: 'detail',
    describe: 'See user details',
    builderr:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },    
    handler(argv){
        contacts.userDetail(argv.name);
    },
})

// Yargs command delete User
yargs.command({
    command: 'delete',
    describe: 'Delete User',
    builderr:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },    
    handler(argv){
        contacts.deleteUser(argv.name);
    },
})

// Yargs command Update User Data
yargs.command({
    command: 'update',
    describe: 'Edit User data',
    builderr:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        newName:{
            describe: 'Contact Name',
            demandOption: false,
            type: 'string',
        },
        email:{
            describe: 'Contact Email',
            demandOption: false,
            type: 'string',
        },
        mobile:{
            describe: 'Contact Mobile',
            demandOption: false,
            type: 'string',
        }
    },    
    handler(argv){
        contacts.updateUser(argv.name, argv.newName, argv.email, argv.mobile);
    },
})

yargs.parse()