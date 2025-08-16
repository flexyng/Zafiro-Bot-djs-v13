const { MessageEmbed } = require('discord.js');

module.exports = {
    name:"anuncio",
    description: "Comando de Updates/anuncios globales",
    aliases: ["actu"],

    /**
     * @param {Message} message
     */

     async execute(message, args, commandName, client, Discord) {
        const anuncio = new MessageEmbed()
        .setTitle("<a:warn:995648864847667200> Anuncio importante <a:warn:995648864847667200>")
        .setDescription('**Hola!** si te ha llegado este mensaje es porque eres dueño/a de algún servidor que tenga a ChidoBot. No te preocupes es solo un anuncio global.\n <:b_right_arrow:933013441109721150> **Bueno... después de un largo tiempo hemos encendido el bot, y os preguntaréis ¿Porqué tardaron tanto? simplesmente porque el equipo de desarrollo está de vacaciones lo cual no podemos solucionar caídas/glitcheos o crasheos del bot y tampoco podemos hacer cambios. Pero bueno, a lo que vamos es que tenemos un anuncio importante que daros y porfavor considera leerlo.**')
        .addFields(
            {
                "name": "<:anuncio:936559313294610492> Anuncios <:anuncio:936559313294610492>",
                "value": "> <:flecha_rj:995649054551846953> **Se buscan beta-testers para ChidoBotV4, el bot no es 24/7 pero lo encendemos aveces y bueno, los necesitamos para que ustedes digan si los cambios les gustaron o no, al igual que ideas y sugerencias para esta versión final y definitiva.**"
            },
            {
                "name": "<:dwait:918753215619682305> Actualizaciones/Novedades <:dwait:918753215619682305>",
                "value": '> <:flecha_rj:995649054551846953> `Novedades:` **Como no hemos añadido nada, hemos decidido daros este anuncio un poco triste. Si... sabemos que a todos les hemos dicho que nos verificamos pero Discord dice lo contrario, bueno la razón de la cual nos rechazarón es que no contamos con un método de eliminar datos de forma regular en nuestra base de datos. Pero bueno, este es el primer bot que hacemos pero ChidoV4 no tendrá esos errores ya que tenemos implementar un Término de Servicio, lo cual deberán de aceptar antes de usar el bot o sea no es nada especial pero ahí explicamos porqué almacenamos los datos que usamos y que están encriptados, también os diremos como solicitar la retirada de ellos de forma permanente (aviso que si retiramos tus datos ya no podrás usar el bot PERMANENTEMENTE) Quiero aclarar que una vez que ChidoV3 se añada a 100 servidores, ya no se podrá unir a másy seguramente quede obsoleto, lo cual todos los usuarios que sigan deseando nuestros servicios, que lo añadan además no te preocupes si eres premium y eso o por tu configuración de tu servidor, el bot se guarda todo eso en la base de datos, así que no te preocupes.**'
            },
            {
                "name": "<a:warn:995648864847667200> IMPORTANTE <a:warn:995648864847667200>",
                "value": '> <:flecha_rj:995649054551846953> **Ah si... el tema de los fans, a nosotros nos agrada que ustedes estén contentos con el servicio que prometemos pero hay gente que lo lleva al otro nivel llegando a copiarnos, y si... Nos han suplantado la identidad, bueno hay un usuario que se creó un "supuesto" ChidoBotV4, nos copió en la foto y nombre y se aprovecha de ello haciéndose pasar por unos de nuestros agentes (ADMINS) y eso no nos parece nada bien. Así que tuve que soltar a ChidoBotV4 antes de tiempo, cuidado el verdadero ChidoBotV4 es ChidoBotV4#081 y cualquiera que afirme tener otra versión del bot, os está engañando. Cosas para que sepáis diferenciarnos de alguien suplantador: 1. El Staff NUNCA te pedirá que añadas al bot, lo máximo que pueden hacer es llegar a sugerírtelo pero NUNCA te pedirán que lo añadas, además que si quieres saber si alguien es Staff del bot pueden usar <prefijo>member staff @usuario, o poner <prefijo>team. (Lo del <prefijo> lo cambias por el que tienes en tu servidor, por defecto es c!) 2. NUNCA te pediremos datos personales ni mucho menos roles. 3. El Staff NUNCA te va a suplicar confianza, si deseas confiar en nosotros y darnos un rol permanente o temporal que sea por tu voluntad. 4. El Staff SIEMPRE te tratará con respeto y amabilidad, al igual que evitará cometer errores ortográficos ya que aveces pasa que escribimos rápido sin mirar que ponemos. Podría seguir pero creo que ya es suficiente, cualquier duda o aclaración que tengan, uniros al [servidor de soporte](https://discord.gg/zhXPRWUDJZ), si desean obtener la invitación de ChidoBotV4 abrid ticket y te informaremos. Fín del comunicado, att: Directoría de ChidoBot.**'
            }
        )
        .setColor("#e7e303")
        .setFooter("Atentamente Equipo de Desarrrolladores de ChidoBot")
         
        
        client.guilds.cache.forEach(guild => {
            client.users.fetch(guild.ownerId).then(ow => ow.send({ embeds: [anuncio] })).catch(() => {})
        });
     }
}