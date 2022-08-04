let IDS = ["660292639412846621"];

const { WebSocket } = require("ws");

const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.on("open", () => {
    console.log("Connected");
});

ws.on("message", data => {
    let json = JSON.parse(data);

    if (json.op === 0)
    {
        console.log(json);
    }
    else if (json.op === 1)
    {
        let dataToSend = JSON.stringify({
            op: 2,
            d: {
                subscribe_to_ids: IDS
            }
        });

        ws.send(dataToSend);

        setInterval(() => {
            console.log("HB");
            let hb = JSON.stringify({ op: 3 });
            ws.send(hb);
        }, json.d.heartbeat_interval);
    }
});