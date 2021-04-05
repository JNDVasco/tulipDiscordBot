const discord = require("discord.js");
const client = new discord.Client();

const fetch = require("node-fetch");
global.fetch = fetch;

const { command, tokenDiscord, accessUnsplash, } = require("./config.json");

const { toJson } = require("unsplash-js");
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({ accessKey: accessUnsplash, });


client.once("ready", () => { console.log("Parabéns, ao menos isto funciona"); });

function generateRandomInteger(max) { return Math.floor(Math.random() * Math.floor(max)); }

client.on("message", (message) => {
  if (message.content.startsWith(`${command}tulipa`)) {
    let randomPage = generateRandomInteger(30);
    console.log("Page: " + randomPage)
    unsplash.search.photos("tulip", randomPage, 30).then(toJson).then((result) => {
      let randomNum = generateRandomInteger(result.results.length);
      console.log("Resultados: " + result.results.length + "  Random: " + randomNum);
      let data = result.results[randomNum];

      message.channel.send(data.links.download,
        {
          file: data.urls.thumb == null ? data.urls.small : data.urls.thumb,
        });
    });
  }
});

client.login(tokenDiscord);
