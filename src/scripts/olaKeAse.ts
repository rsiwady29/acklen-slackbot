/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  Best hubot script EVER!
//
// Configuration:
//   None
//
// Commands:
//   hubot ola ke ase 
//
// Author:
//   Richard Siwady   <rsiwady29@gmail.com>

class OlaKeAse {
    
    images: string[] = [
        "http://pbs.twimg.com/media/BMf3ib_CMAAZHEB.jpg:large",
        "http://i3.kym-cdn.com/photos/images/original/000/462/087/166.jpg",
        "http://i.ytimg.com/vi/S-Abebn5kpM/hqdefault.jpg",
        "http://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-ola-ke-ase-92.png",
        "http://ct.fra.bz/ol/fz/sw/i53/2/11/14/frabz-ola-ke-ase-25a690.jpg",
        "http://i2.kym-cdn.com/photos/images/original/000/465/066/e70.jpg",
        "http://i.imgur.com/T1Qm5.jpg",
        "http://www.blogodisea.com/wp-content/uploads/2013/05/ola-ke-ase-en-facebook.jpg",
        "http://i1.kym-cdn.com/entries/icons/original/000/011/944/ola.jpg",
        "http://i.ytimg.com/vi/XOAQl1ZY3AY/maxresdefault.jpg",
        "http://i.ytimg.com/vi/XOAQl1ZY3AY/maxresdefault.jpg",
        "http://quelovendan.com/media/catalog/product/f/e/felpudos-ola-k-ase-p.jpg",
    ];
    
	action = (robot: any) => {
		robot.hear(/ola ke ase/i, (msg: any) => {
			 msg.send(msg.random(this.images));
		});
	 };
 };

var fn = new OlaKeAse().action;
export = fn;
