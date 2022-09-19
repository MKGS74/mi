const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('https://discord.com/users/958841836200415232')
});
app.listen(3000, () => {
  console.log('MK');
});
const { Collection, Client, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")
const client = new Client({ intents: 32767 });





client.on('ready', async() => {
client.user.setActivity({
name: `$$`,
type: 'PLAYING'
})
})





let prefix = "!"
client.on("messageCreate", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ")
  if (args[0] === "!تحذير") {
    if (message.channel.id !== "1020302989979816006" || !message.member?.roles.cache.has("999954102782005359")) return;
    let anotherChannel = message.guild.channels.cache.get("999839406024314961")
    if (!anotherChannel) return message.reply("لا استطيع ايجاد الروم التانية")
    let member = message.mentions.members.first();
    if (!member) return message.reply(`منشن`)
    message.reply(`السبب؟ `).then(first_message => {


      let filter = (i) => i.author.id === message.author.id && i.content;
      const collector = message.channel.createMessageCollector({
        filter,
        max: 1,
        errors: ["time"]
      })
      collector.on('collect', async (first_collected) => {
        let reason = first_collected.content
        first_message.delete().catch(_ => 0)
        first_collected.delete().catch(_ => 0)
        message.reply(`التحذير؟ `).then(sec_message => {


          let filter2 = (i) => i.author.id === message.author.id && i.content;
          const collector2 = message.channel.createMessageCollector({
            filter: filter2,
            max: 1,
            errors: ["time"]
          })
          collector2.on('collect', async (sec_collected) => {
            let warn = sec_collected.content;
            let arr = [{ name: '25', value: '1000410361238933815' }, { name: '50', value: '999839321974652928' }, { name: '100', value: '999839322603786242' },{ name: 'سحب', value: '' }]
            let obj = arr.find(c => c.name === warn)
            if (!obj) return message.reply(`رجاء كتابة التحذير صحيح`)
            sec_message.delete().catch(_ => 0)
            sec_collected.delete().catch(_ => 0)
            message.reply(`الدليل؟`).then(third_message => {
              let filter3 = (i) => i.author.id === message.author.id && i.attachments.first();
              const collector3 = message.channel.createMessageCollector({
                filter: filter3,
                max: 1,
                errors: ["time"]
              })
              collector3.on('collect', async (third_collected) => {
                let dlel = third_collected.attachments.first();
                third_message.delete().catch(_ => 0)
                third_collected.delete().catch(_ => 0)
                let attachement = new MessageAttachment(dlel.url)
                anotherChannel.send({
                  content: `**<:wasite_haland:1018129964840787998>تحذير\nالعضو: ${member}\nالإداري: ${message.member}\nالسبب: ${reason}\nالتحذير: ${warn === "سحب" ? "سحب رتب" : `Warn ${warn}%`}.\nالدلائل: **`,
                  files: [attachement]
                }).then(c => anotherChannel.send("https://media.discordapp.net/attachments/998762107996749824/1018212125069557770/New_Project.gif").catch(_ => 0)).catch(_ => 0)
                member.roles.add(obj.value).catch(e => 0)
              })
            })
          })
        })
      })
    })
  }
})



client.on(`messageCreate`, async (message) => {
 

    const args = message.content.slice(`${prefix}`.length).trim().split(" ")
    const command = args.shift().toLowerCase()

    if(command == "rr") {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(`${args[0]}`) || message.guild.roles.cache.find((role) => role.name.includes(`${message.content.split(`${command} `)}`))

        if(!role) return message.reply(`**:x: |منشن الرول رجاء!**`)

        const arr = []
        const members = role.members.forEach(member => {
            
           arr.push(`<@!${member.id}>`)
        })
        const members_msg = arr.join("\n") 
        message.channel.send(`> **اسم الرول:** ${role.name}\n> **عدد الاشخاص الي معه الرول:** \`${role.members.size}\`\n> **لون الرول:** \`${role.hexColor}\`\n\n**الاشخاص:**\n\n${members_msg}`)
    }
})




client.on("messageCreate", async message => {
if(message.content.startsWith(prefix+"MK")){
    if(message.author.bot) return;
const verificationLevels = {NONE: '0',LOW: '1',MEDIUM: '2',HIGH: '3',VERY_HIGH: '4'};
    let on = message.guild.presences.cache.filter(e => e.status == 'online').size - 1 || 0
let idle = message.guild.presences.cache.filter(e => e.status == 'idle').size + 1 || 0
let dnd = message.guild.presences.cache.filter(e => e.status == 'dnd').size || 0
    var embed  = new MessageEmbed()
.setThumbnail(message.guild.iconURL({dynamic:true})) 
      .addFields([
    {
    name: `🆔 Server ID: `,
    value: `**${message.guild.id}**`
},
    {
    name: `📅 Created On: `,
    value: `**<t:${parseInt(message.guild.createdAt / 1000)}:R>**`
}, 
    {
      name: `👑 Owned by: `, 
      value: `**${await message.guild.fetchOwner()}**`
}, 
      {
        name: `👥  Members: (**${message.guild.memberCount}**)`, 
        value: `**${Math.floor(on + idle + dnd)}** **Online \n${message.guild.premiumSubscriptionCount} Boosts ✨**`
}, 
        {
          name: `💬 Channels: (${message.guild.channels.cache.size})`, 
          value: `**${message.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}** **Text | ${message.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size} Voice**`
}, 
        {
          name: `🌍 Others: `, 
          value: `**Verification Level: ${verificationLevels[message.guild.verificationLevel]}**`
},
        {
          name: `🔐 Roles:(${message.guild.roles.cache.size})`, 
          value: `**To see a list with all roles use ${prefix}roles**`
}, 
])  
.setColor(message.guild.me.displayHexColor)
.setAuthor(`${message.guild.name}`, `${message.guild.iconURL({dynamic:true})}`)
    message.reply({embeds: [embed]})
  }
})




setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60);




    
client.login(process.env.token);
