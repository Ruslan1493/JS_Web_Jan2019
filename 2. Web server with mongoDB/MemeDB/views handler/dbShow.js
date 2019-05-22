const db = require('../db/db.json');

module.exports = () => {
    let htmlMemes = '';
        db
        .sort((a,b) => {return b.dateStamp - a.dateStamp})
        .filter(meme => meme.privacy === 'on')
        .forEach(meme => {
            htmlMemes += 
            `<div class="meme">
                <a href="/getDetails?id=${meme.id}">
                <img class="memePoster"
                src="${meme.memeSrc}"/>
            </div>`;
        });
        return htmlMemes;
}