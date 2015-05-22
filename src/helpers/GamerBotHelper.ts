

var _ = require('underscore');
export interface IGamerBotHelper{
  steam(name: string) : any
}

export class GamerBotHelper implements IGamerBotHelper{
  
  constructor(private getClient: any){

  }
  
  steam(name: string) :any {
    var that = this;
    var urlSteamId = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=11BD543D775F4ABE9886FEBDFA96A74E&vanityurl=";

    var urlToGet = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=11BD543D775F4ABE9886FEBDFA96A74E&steamid=";
    
    if (name && name.trim() != ""){
      urlSteamId = urlSteamId + name.trim();
      
      var promise = that.getClient(urlSteamId);
      return promise
        .then((body)=> {   
          var response = JSON.parse(body).response;
          
          if (response.success != 1)
              return "Oops man, you were not found!";

          urlToGet = urlToGet + response.steamid;
          var promise2 = that.getClient(urlToGet);

          return promise2
          .then((body2)=> { 
             var resultJson = JSON.parse(body2);
             var gameCount = +resultJson.response.game_count;
             var gameNotPlayed = +_.where(resultJson.response.games, {playtime_forever: 0}).length;
             var total = (gameNotPlayed/gameCount) *100;
             
             if(total > 60){
              return "You have more than enough games to play for now." 
             } else {
              return "Go ahead if you have the money."
             }
                       
          })
       }).catch((err)=>{
             return "GamerBot says: " + err;
      })
    } else {
      return "You must give me a urlname";
    }    
  }
}