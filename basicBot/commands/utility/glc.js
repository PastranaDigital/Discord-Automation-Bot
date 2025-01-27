const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('glc').setDescription('Gym Leader Challenge Info'),
	async execute(interaction) {
		await interaction.reply({
			content: `
📋 Check the Elo Leaderboard
https://brave-shark-9g6q3j-dev-ed.my.site.com/comebackmechanics/

🧭 Looking to learn about GLC?
https://gymleaderchallenge.com/
			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
