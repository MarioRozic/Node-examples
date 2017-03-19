var WebTorrent = require('webtorrent');
var fs = require('fs');
var client = new WebTorrent();

var magnetURI = '';

var readContent = (callback) => {
    fs.readFile('./magnet.txt', function(err, content){
        if(err){
            return callback(err);
        }
        callback(content.toString());
    });
}

readContent(() => {
    client.add(magnetURI, {path: './'}, function(torrent) {
            client.on('torrent', function (torrent) {

                var ispis = setInterval(function(){
                    var min = Math.floor((torrent.timeRemaining/1000/60) << 0);
                    var sec = Math.floor((torrent.timeRemaining/1000) % 60);
                    var perc = Math.round(((torrent.progress / 100) * 10000) * 100 / 100);
                    var download =  humanFileSize(torrent.downloadSpeed, true);
                    var name = torrent.files;

                    process.stdout.write("\u001b[2J\u001b[0;0H");
                    console.log(`
                    Download Speed: ${download}/s
                    Time To End: ${min} min & ${sec} sec 
                    Progress: ${perc}%
                    `);

                },100);

                torrent.on('done', function () {
                    clearInterval(ispis);
                    console.log('torrent dowload finished');
                    client.destroy(function callback (err){
                        if(err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            });
        });
});



function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}
