/// <reference path="../../typings/node/node.d.ts"/>
var _ = require("underscore");


export interface ITrelloService{
  moveCard(cardName: string, listName: string) :any
}

export class TrelloService implements ITrelloService{
  
        boardId : string   = "55314f6bf10520a36ce9250f";
        backlogId : string  ="55314f7433029f1cf32811d6";
        onDeckId : string= "55314f87531e125bd4569ef0";
        inDev : string = "55314fc1b6dd68995271f7ab";
        readyForCodeReview : string ="55314fad4752513188e28090";
        readyForTesting : string = "55314ff25c4112b46c0eb65f";
        key :string = "762756329d379eab41f982807ca3b6a4";
        token: string = "c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c";

    
    constructor(private httpClient: any){
    }
    
    moveCard(cardName: string, listName: string) :any {
       
        
        
        var cardsInBacklogPromise =  this.httpClient("https://api.trello.com/1/boards/55314f6bf10520a36ce9250f/cards?key=762756329d379eab41f982807ca3b6a4&token=c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c");
        
        cardsInBacklogPromise.then((body)=>{
                
            
            var card = _.find(JSON.parse(body),(item) => {
                
                
                
                    return item.name === cardName;
                
                
                });
            
             
            
            
            var listid = this.getListId(listName);
            
            var options = {
                uri : "https://api.trello.com/1/cards/"+card.id +"?idList="+listid+"&key=762756329d379eab41f982807ca3b6a4&token=c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c",
                method : 'PUT'
            };
            
            this.httpClient(options).then((body)=>{
            
                return {url: card.shortUrl, name: card.name};

            }).catch((error)=> {
                throw new Error("Cant move the card: " + error);
            });
		}).catch((error)=> { 
            throw new Error("Cant move the card: " + error);
        });
        

}  
        
    
    
    getListId(listName: string) : string {

        if(listName.toLowerCase() === "on deck")
            return this.onDeckId;
        
        if(listName.toLowerCase() === "backlog")
            return this.backlogId;
        
        
        if(listName.toLowerCase() === "in dev")
            return this.inDev;
        
        
        if(listName.toLowerCase() === "ready for code review")
            return this.readyForCodeReview;
        
        if(listName.toLowerCase() === "ready for testing")
            return this.readyForTesting;
    
    }
    
}