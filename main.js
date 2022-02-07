const Discord = require('discord.js') // подключение библиотеки                 
const client = new Discord.Client() // создание клиента

client.on('ready', () =>{ // ивент, когда бот запускается https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready
    client.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`))
    console.log(`Привет! ${client.user.tag} запустился!`) // информация в консоль про успешный запуск
})

client.on('message', message =>{ // ивент, когда приходит любое сообщение в чат https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
    if (message.author.bot) return; // если автор сообщения - бот, ничего не происходит 
    if (message.content == ':info') { // если пользователь написал "!профиль" 
    let embed = new Discord.MessageEmbed() // создание ембед сообщения
    .setTitle(message.author.username) // в тайтле имя автора 
    let status = ''
    switch (message.author.presence.status) { // проверка статусов 
        case 'online':
            status = 'онлайн'; break; 
            case 'idle':
                status = ':orange_circle:нет на месте'; break;
                case 'offline':
                    status = 'нет в сети'; break;
                    case 'dnd':
                        status = ':red_circle:не беспокоить'; break;
    }
    embed.setDescription(`**Ваш дискорд айди: ${message.author.id}
    Ваш статус: ${status}
    **`) // описание ембеда
    .setColor('RED') // рандомный цвет ембеда
    .setThumbnail(message.author.avatarURL()) // вставляем в ембед аватарку пользователя
    message.channel.send(embed) // отправляем сообщение в канал где была написана команда   
    }
})
client.on('guildMemberAdd', member =>{ // ивент, когда пользователь присоединяется к серверу https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Привет, ${member.user.username}!`)
    .setDescription(`**Ты прихлынул к нам советуем прочитать правила.
    Ты наш \`${client.guilds.get("939970748221636698").memberCount}\` самурай **`) // айди вашего сервера               !!!!!!!!!!
    .setFooter('')
    // .addField(`Участвуй в розыгрышах!`, `<#706487236220289054>`, true) // Добавляйте свои каналы по желанию
    // .addField(`Общайся в чате!`, `<#702364684199788625>`, true)
    // .addField(`Смотри видео наших ютуберов!`, `<#702363551184060546>`, true)
    .setColor('RANDOM')
    member.send(embed); // отправка сообщения в лс 

    let embed2 = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Самурай прихлынул к нам`)
    .addField('Самурай:', member.user)
    .setColor('RED')
    member.send(embed);
    client.channels.cache.get('940017284922089522').send(embed2) // айди вашего канала с логами
})

client.on('guildMemberRemove', member => { // ивент, когда пользователь выходит с сервера https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Самурай покинул сервер`)
    .addField('Самурай:', member.user)
    .setColor('RED')
    member.send(embed);
    client.channels.cache.get('940017284922089522').send(embed) // айди вашего канала с логами
  })




var interval = setInterval(function () { change(); }, 20000  ); // время обновления в миллисекундах

client.login('process.env.BOT_TOKEN') // токен вашего бота

