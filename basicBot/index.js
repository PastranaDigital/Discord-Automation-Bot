const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');
const comebackMechanicsGuildId = '1070482190833561713';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, (c) => {
	console.log(`Logged in as ${c.user.tag}`);

	const glc = new SlashCommandBuilder().setName('glc').setDescription('Gym Leader Challenge Info');
	//? this was to make it only show up in a specific guild
	client.application.commands.create(glc, comebackMechanicsGuildId);
});

//TODO this gets a response that a message was typed but the content is empty
// const prefix = '!';
// client.on('messageCreate', (message) => {
// 	// console.log('message: ', message);
// 	console.log('message.content: ', message.content);
// 	//? Only human messages are allowed if they have the prefix
// 	if (!message.content.startsWith(prefix) || message.author.bot) return;

// 	if (message.content.startsWith(`${prefix}ping`)) {
// 		message.channel.send('pong! http://tcgplayer.com');
// 	} else if (message.content.startsWith(`${prefix}foo`)) {
// 		message.channel.send('bar!');
// 	}
// });

client.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	// console.log(interaction.member.nickname);

	switch (interaction.commandName) {
		case 'glc':
			interaction.reply(`
			Check the Tags Leaderboard
https://brave-shark-9g6q3j-dev-ed.my.site.com/comebackmechanics/

Looking to learn about GLC?
https://gymleaderchallenge.com/
			`);
			break;
		default:
			break;
	}
});

client.login(token);

/* 
Check the Tags Leaderboard
https://brave-shark-9g6q3j-dev-ed.my.site.com/comebackmechanics/ 

Looking to learn about GLC?
https://gymleaderchallenge.com/
*/

/*
ChatInputCommandInteraction {
  type: 2,
  id: '1221448306073534524',
  applicationId: '1221441316026585088',
  channelId: '1166952524343934977',
  guildId: '1070482190833561713',
  user: User {
    id: '938147454367457301',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'pastranadigital',
    globalName: 'PastranaDigital',
    discriminator: '0',
    avatar: '55e53f45f6ecfe0a37a1e0347d9ef37e',
    banner: undefined,
    accentColor: undefined,
    avatarDecoration: null
  },
  member: GuildMember {
    guild: Guild {
      id: '1070482190833561713',
      name: undefined,
      icon: undefined,
      features: undefined,
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: PresenceManager {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      autoModerationRules: [AutoModerationRuleManager],
      available: false,
      shardId: 0
    },
    joinedTimestamp: 1675293243177,
    premiumSinceTimestamp: 1694752826530,
    nickname: 'Omar - PostRo Bro',
    pending: false,
    communicationDisabledUntilTimestamp: null,
    user: User {
      id: '938147454367457301',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'pastranadigital',
      globalName: 'PastranaDigital',
      discriminator: '0',
      avatar: '55e53f45f6ecfe0a37a1e0347d9ef37e',
      banner: undefined,
      accentColor: undefined,
      avatarDecoration: null
    },
    avatar: null,
    flags: GuildMemberFlagsBitField { bitfield: 0 }
  },
  version: 1,
  appPermissions: PermissionsBitField { bitfield: 562949953421311n },
  memberPermissions: PermissionsBitField { bitfield: 562949953421311n },
  locale: 'en-US',
  guildLocale: 'en-US',
  commandId: '1221448251798978621',
  commandName: 'ping',
  commandType: 1,
  commandGuildId: '1070482190833561713',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: InteractionWebhook { id: '1221441316026585088' },
  options: CommandInteractionOptionResolver {
    _group: null,
    _subcommand: null,
    _hoistedOptions: []
  }
}
*/
