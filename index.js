const Discord = require('discord.js'); 
const { prefix, token } = require('./config.json');
const client = new Discord.Client(); 
const emojiCharacters = require('./emojiCharacters');

client.once('ready', () => {
 	console.log(`Cyber reporting for duty! Status : ONLINE, Current Condition : Working with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} servers.`);
 }); 
 
 client.on("guildCreate", guild => {
// This event triggers when the bot joins a guild.
console.log(`New Server joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members!`);
client.user.setActivity(`Watching ${client.guilds.cache.size}`);
});

client.on("guildDelete", guild => {
// this event triggers when the bot is removed from a guild.
console.log(`I have been removed from the server: ${guild.name} (id: ${guild.id})`);
client.user.setActivity(`Watching ${client.guilds.cache.size}`);
});

client.on("guildMemberAdd", member => {

member.send(`Welcome on the server! Please be aware that we will not tolerate troll, spam or harassment. Have fun 😀`);

});



client.on('message', async message => { 	
  console.log(message.content);
  
  if(!message.content.startsWith(prefix)) return;
  
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === "ping") {
// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
const m = await message.channel.send("Ping?");
m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
 }

if(command === "say") {
// makes the bot say something and delete the message
const sayMessage = args.join(" ");
// Then we delete the command message
message.delete().catch(O_o=>{}); 
// And we get the bot to say the thing
message.channel.send(sayMessage);
}

if(command === "dmsg") {
// This command removes all messages from all users in the channel, up to 100.

// get the delete count, as an actual number.
const deleteCount = parseInt(args[0], 10);
 
// Ooooh nice, combined conditions. <3
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

// So we get our messages, and delete them. Simple enough, right?
const fetched = await message.channel.messages.fetch({limit: deleteCount});
message.channel.bulkDelete(fetched)
.catch(error => message.reply(`Could not delete messages because of: ${error}`));
}
if(command === "kick") {
// This command must be limited to mods and admins. In this example we just hardcode the role names.
// Please read on Array.some() to understand this bit: 
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
if(!message.member.roles.cache.some(r=>[ "Leader","Admin"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");

// Let's first check if we have a member and if we can kick them!
// message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
// We can also support getting the member by ID, which would be args[0]
let member = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!member)
return message.reply("Please mention a valid member of this server");
if(!member.kickable) 
return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

// slice(1) removes the first part, which here should be the user mention or ID
// join(' ') takes all the various parts to make it a single string.
let reason = args.slice(1).join(' ');
if(!reason) reason = "No reason provided";

// Now, time for a swift kick in the nuts!
await member.kick(reason)
.catch(error => message.reply(`Sorry ${message.author} I could not kick because of : ${error}`));
message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

}
if(command === "ban") {
// Most of this command is identical to kick, except that here we'll only let admins do it.
// In the real world mods could ban too, but this is just an example, right? ;)
if(!message.member.roles.cache.some(r=>["Leader"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");

let member = message.mentions.members.first();
if(!member)
return message.reply("Please mention a valid member of this server");
if(!member.bannable) 
return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

let reason = args.slice(1).join(' ');
if(!reason) reason = "No reason provided";

await member.ban(reason)
.catch(error => message.reply(`Sorry ${message.author} I could not ban because of : ${error}`));
message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
}
if(command === "help") {
const exampleEmbed = new Discord.MessageEmbed()
.setColor('#0000ff')
.setTitle('Commands List')
.setURL('https://cyber.simdif.com')
.setAuthor('Cyber', 'https://creator.simdif.com/images/public/sd_5f1d21692e86b.png?nocache=1595745052')
.setDescription('Here is a list of commands for you !!!!')
.setThumbnail('https://creator.simdif.com/images/public/sd_5f1d21692e86b.png?nocache=1595745052')
.addFields(
{ name: 'Prefix = !', value: 'This is my Prefix!' },
{ name: '\u200B', value: '\ Note : It is essential to add my prefix before every command!' },
{ name: '\u200B', value: '\u200B' },
{ name: 'DMSG', value: 'Deletes previous messages'},
{ name: 'PING', value: 'Shows the Latency & API Latency'},
{ name: 'KICK', value: 'Kick Members'},
{ name: 'BAN', value: 'Ban Members'},
)
.setImage('https://creator.simdif.com/images/public/sd_5f1d21692e86b.png?nocache=1595745052')
.setTimestamp()
.setFooter('Hope This works out for you!', 'https://creator.simdif.com/images/public/sd_5f1d21692e86b.png?nocache=1595745052');

message.channel.send(exampleEmbed);
}

if (command === "code") {
	
}

});
   
client.on('message', async message => { 	
  console.log(message.content);
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
const command = args.shift().toLowerCase();

const Bad = ("fuck", "f*ck", "fu*k", "fuk", "bitch", "son of a", "ass", "asshole", "kuta", "fucker", "motherfucker", "motherfuck");
  
  if (!message.content.startsWith(prefix)) {
  	if (message.content = (Bad)) {
   if (message.member.roles.cache.some(r=>["The Manager"].includes(r.name))) {
//Nothing Happens
   }
  	else if (!message.member.roles.cache.some(r=>["The Manager"].includes(r.name))) {
  		message.channel.bulkDelete(1);
return message.reply(`Such language is not allowed`);
   	  }
   	}
  }
});

client.login(token);