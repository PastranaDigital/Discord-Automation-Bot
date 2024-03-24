const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

const commandId = '1221448251798978621';

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);
