// //card search :cardName
// static cardSearch(msg:Message, client:Client, params:any){
//     const card:Card=CardManager.getInstance().getCardSearch(params.cardName);
//     if(card){
//         const embed=CardGameServer.cardEmbedMessage(card);
//         msg.channel.send(embed);
//     }else{
//         msg.channel.send("No result found.");
//     }
// }
// //############################################################-USER COMMANDS-############################################################
// static openPack(msg:Message, client:Client, params:any){
//     let id=1;
//     if(params.id){
//         id=parseInt(params.id);
//     }
//     const pack=PackManager.getInstance().getItemById(id);
//     const cards=pack.open();
//     if(cards){
//        cards.forEach((card:Card)=>{
//            const embed=CardGameServer.cardEmbedMessage(card);
//            msg.channel.send(embed);
//     });
//     }else{
//         msg.channel.send("You don't have that pack");
//     }
// }
// tradeCard(msg:Message, client:Client, params:any){
// }
// buyPack(msg:Message, client:Client, params:any){
// }
// cardInfo(msg:Message, client:Client, params:any){
// }
// packInfo(msg:Message, client:Client, params:any){
// }
// shopInfo(msg:Message, client:Client, params:any){
// }
// userInfo(msg:Message, client:Client, params:any){
// }
// static cardInfoById(msg:Message, client:Client, params:any){
//     let card:Card=CardManager.getInstance().getItemById(parseInt(params.id));
//     if(card){
//         const embed:MessageEmbed=CardGameServer.cardEmbedMessage(card);
//         msg.channel.send(embed);
//     }else{
//         msg.channel.send("No card found for that id");
//     }  
// }
// static cardInfoByName(msg:Message, client:Client, params:any){
//     let card:Card=CardManager.getInstance().getItemByName(params.name);
//     if(card){
//         const embed:MessageEmbed=CardGameServer.cardEmbedMessage(card);
//         msg.channel.send(embed);
//     }else{
//         msg.channel.send("No card found for that name");
//     }  
// }
// //############################################################-Embed-############################################################
// static cardEmbedMessage(card:Card) : MessageEmbed{
//     const rarity=new Rarity(card.stars);
//     const embed=new MessageEmbed()
//         .setTitle(card.rarity.colorString +"   "+ card.name)
//         .setThumbnail(card.imageURL)
//         .addField("Show ", card.show)
//         .addField(rarity.toString+": ",Rarity.starsToString(card.stars));
//     return embed;
// }
// packOpenEmbedMessage(pack:Pack) : MessageEmbed{
//     return undefined;
// }
// //############################################################-Actions-############################################################
// static sendCardLoot(msg:Message, client:Client, packOwner:Player, card:Card){
//     const embed:MessageEmbed=CardGameServer.cardEmbedMessage(card);
//     msg.channel.send(embed).then((sentMsg:Message)=>{
//         sentMsg.react("👍");
//         const filter=(reaction:MessageReaction, user:User) => {return ["👍"].includes(reaction.emoji.name) && !user.bot;}
//         sentMsg.awaitReactions(filter, { max: 5, time: 10000 }).then((collected:Collection<string,MessageReaction>)=>{
//             const usersIds:Array<string>=collected.first().users.cache.array().map((user:User)=>{return user.id});
//             const needers:Array<Player>=usersIds.map((id:string)=>{return PlayerHandler.getInstance().getPlayerById(id)}).filter((player:Player)=>{return player.claims>0});
//             const winner:Player=LootingSystem.splitLoot(packOwner, needers, card);
//             msg.channel.send(msg.guild.members.cache.get(winner.id).user.username+" has received: " + card.name);
//         });
//     });
// }
// splitLoot(){
// }
// }
