const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
});

const ROLE_ID = '1505243473912135892';

client.once('clientReady', () => {
  console.log(`✅ Bot is online: ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.has(ROLE_ID);
  const hasRole = newMember.roles.cache.has(ROLE_ID);

  if (!hadRole && hasRole) {
    const banner = new AttachmentBuilder(path.join(__dirname, 'banner.gif'), { name: 'banner.gif' });

    const embed = new EmbedBuilder()
      .setColor(0x7B2FBE)
      .setTitle('🪶 WELCOME TO 𝐊𝐢𝐧𝐠𝐬 𝐋𝐨𝐮𝐧𝐠𝐞 • 𝐕𝐈𝐏 SERVER 🪶')
      .setDescription("We're excited to have you with us!\nHere are some important channels to get you started:")
      .addFields(
        {
          name: '📋 RULES & GUIDELINES',
          value: '• Read the rules in <#1374340303477014629>\n• Make sure to follow all server rules',
        },
        {
          name: '🟣 RANK ROLES',
          value: '• Check your rank roles in <#1506452771262697532>\n• See what roles are available and their requirements',
        },
        {
          name: '🔧 SELF ROLES',
          value: '• Get self-assignable roles in <#1504119273616969841>\n• Customize your profile with various roles',
        },
        {
          name: '🎮 GAMING ROLES',
          value: '• Pick gaming roles in <#1504119403556634664>\n• Get notified for your favorite games',
        },
        {
          name: '💡 PRO TIPS',
          value: '• Introduce yourself in the introduction channel!\n• Don\'t hesitate to ask questions!',
        }
      )
      .setImage('attachment://banner.gif')
      .setFooter({ text: 'Enjoy your stay in Kings Lounge • VIP Server!' })
      .setTimestamp();

    try {
      await newMember.send({
        content: `# <a:emoji_5:1506445328188968980> Welcome, ${newMember.user}! <a:emoji_4:1506444693377126470>\n\nYou've been successfully verified and now have full access to the server! <a:emoji_2:1505574522487701514>`,
        embeds: [embed],
        files: [banner],
      });
      console.log(`✅ DM sent to ${newMember.user.tag}`);
    } catch (err) {
      console.log(`❌ Could not DM ${newMember.user.tag}: ${err.message}`);
    }
  }
});

if (!process.env.TOKEN) {
  console.error('❌ TOKEN is not set!');
  process.exit(1);
}

client.login(process.env.TOKEN);
