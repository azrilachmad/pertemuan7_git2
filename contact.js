// node modules
const fs = require('fs');
const validator = require('validator')

// Path file contacts.json
const dataPath= './data/contacts.json'



// Checking JSON Folder
const cekData = async() =>{
    // Path folder data
    const dirPath=`./data`
    // Cek Folder Data
    if(!fs.existsSync(dirPath)){    
        // Make new folder if there is no Data Folder
        fs.mkdirSync(dirPath)
    }
}

// Check JSON Data File
const cekFile = async() =>{
    if(!fs.existsSync(dataPath)){
        // Create a new file if there is no JSON file in the folder 
        fs.writeFileSync(dataPath, '[]', 'utf-8')
    }
}

const changeData = (name,email,mobile) =>{
    // Load Contact Data
    const contact =  {name,email, mobile}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    
   
    // Store data to JSON file if all input is valid
    contacts.push(contact)
    fs.writeFileSync(dataPath, JSON.stringify(contacts))
    console.log("Success input data!")
}
// Function dave data JSON berdasarkan input  
const saveData = (name,email,mobile) =>{
    // Load Contact Data
    const contact =  {name,email, mobile}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    
    // Check Duplicate Name
    const duplicateNameCheck = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    if (duplicateNameCheck){ 
        console.log('Nama sudah ada')
        return false;
    }
    // Validate Email
    if(!validator.isEmail(email)){
        console.log("email anda salah");
        return false;
    }
    // Validate Phone number
    if(!validator.isMobilePhone(mobile,'id-ID')){
        console.log("Nomor Telpon anda salah atau tidak valid");
        return false
    }
    // Store data to JSON file if all input is valid
    contacts.push(contact)
    fs.writeFileSync(dataPath, JSON.stringify(contacts))
    console.log("Success input data!")
}

// Function to save contact data
const saveContact = (name, email, mobile) => {
    const contact = (name, email, mobile);
    // const file = fs.readFileSync('data/contact.json', 'utf8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact()
}

// Function to load contact data
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts= JSON.parse(file);
    return contacts;
}

// Function to show list of JSON data
const listContact = () => {
    const contacts = loadContact()
    console.log('Contact list :')
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.mobile}`);
    });
};


// Detail Contact User
const userDetail = (name) => {
    const contact = {name}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    
    console.log("User Details :")
    const findName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    if (findName){ 
        console.log(`Name : ${findName.name}\nEmail : ${findName.email}\nPhone Number : ${findName.mobile}`)
    }else{
        console.log('Nama Pengguna Tidak Ditemukan')
    }
};


// Delete Contact User
const deleteUser = (name) => {
    // Load existing user data
    const userData = loadContact()
    // Make new array to store new data to JSON
    const newUserData = userData.filter((user) => user.name.toLowerCase() !== name.toLowerCase())

    // Finding username in JSON 
    if(userData.length === newUserData.length) {
        // Notify if user not found
        console.log(`User ${name} not found`)
        return false;
    };
    
    // Delete user if username found
    fs.writeFileSync(dataPath, JSON.stringify(newUserData))
    console.log(`User ${name} has been deleted`)
}



// Delete Contact User
const updateUser = (name, newName, email, mobile) => {
    // Load existing user data
    const userData = loadContact()
    // Make new array to store new data to JSON
    

    // Find user on JSON
    const findName = userData.find((user) => user.name.toLowerCase() === name.toLowerCase())

    let newUsername, newEmail, newMobile

    // If User on JSON is match with name key
    if (findName){ 
        console.log(`Update User ${name} :`)
        // Check if user change the name or not
        // If not Changed
        if (newName === null || newName === '' || newName === name || newName === undefined){
            console.log('- Nama tidak diubah')
            newUsername = findName.name
        }else{
            console.log('- Nama diubah ')
            newUsername = newName
        }

        // Email Check
        if (email === null || email === '' || email === findName.email || email === undefined){
            console.log('- Email tidak diubah')
            newEmail = findName.email
        }else{
            console.log('- Email diubah ')
            newEmail = email
        }
        // Mobile Check
        if (mobile === null || mobile === '' || mobile === findName.mobile || mobile === undefined){
            console.log('- Mobile tidak diubah')
            newMobile = findName.mobile
        }else{
            console.log('- Phone Number diubah ')
            newMobile = mobile
        }    
        
        const updateUser = {
            name : newUsername,
            mobile : newMobile,
            email : newEmail
        }
        console.log(updateUser.name)
        console.log(updateUser.mobile)
        console.log(updateUser.email)
        deleteUser(name)
        changeData(updateUser.name, updateUser.email, updateUser.mobile)       

        }else{
        console.log('User not found')
    }
}
 
       






// Export
module.exports = { 
    cekData, 
    cekFile, 

    saveData, 
    saveContact,

    loadContact, 
    listContact,

    userDetail, 
    deleteUser, 
    updateUser };