'use strict';

const Script = require('smooch-bot').Script;


const script = new Script({
    start: {
        receive: (bot) => {
            return bot.say('Welcome to your digital butler! I’m Max, your personal AI concierge. You can talk to me about anything that`s on your mind.')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Type in your name sir/madam.'),
        receive: (bot, message) => {
            const name = message.text.trim();
            bot.setProp('name', name);
            return bot.say('Great! I`ll call you ${name}' + 'Is that OK? %[Yes](postback:yes) %[No](postback:no)')
                .then(() => 'next');
        }
    },

    next: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then(() => 'getRequest');
        }
    },

    getRequest: {
        prompt: (bot) => bot.say('${name}, how can I help you have a better stay?'),
        receive: (bot, message) => {
            const zCurrResponse = message.text.trim();

            var str = zCurrResponse + "";
            var regex = RegExp('^(.*?(\bResto\b)[^$]*)$|^(.*?(\bRestaurant\b)[^$]*)$|^(.*?(\bFood\b)[^$]*)$|^(.*?(\bIce Cream\b)[^$]*)$|^(.*?(\bDessert\b)[^$]*)$|^(.*?(\bDesert\b)[^$]*)$|^(.*?(\bDeserts\b)[^$]*)$|^(.*?(\bSushi\b)[^$]*)$|^(.*?(\bChinese\b)[^$]*)$|^(.*?(\bJapanese\b)[^$]*)$|^(.*?(\bIndian\b)[^$]*)$|^(.*?(\bMexican\b)[^$]*)$|^(.*?(\bMediterranean\b)[^$]*)$|^(.*?(\bFast Food\b)[^$]*)$|^(.*?(\bMcDonalds\b)[^$]*)$|^(.*?(\bBurger King\b)[^$]*)$|^(.*?(\bStarbucks\b)[^$]*)$|^(.*?(\bBurger\b)[^$]*)$|^(.*?(\bPizza\b)[^$]*)$|^(.*?(\bVegan\b)[^$]*)$|^(.*?(\bVegetarian\b)[^$]*)$|^(.*?(\bFine Dining\b)[^$]*)$|^(.*?(\btake out\b)[^$]*)$|^(.*?(\brestaurants\b)[^$]*)$|^(.*?(\breserve\b)[^$]*(\btable\b)[^$]*)$');
            //console.log(regex.test(str) + " " + regex.lastIndex);
            // expected output: true

            if(regex.test(str)){
                return bot.say('A great time for food! I found diners near you, to check out, please follow the link below: \n https://www.google.com/search?q=restaurants+near+me')
                .then(() => 'next');
            }
            else {
                return bot.say('Please be precise and concise to guide my understanding. what are you looking for?')
                .then(() => 'next');          
            }



          //  bot.setProp('name', name);
          //  return bot.say('I`ll call you ${name}! Great!')
          //     .then(() => 'finish');
        }
    }


});
