import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  try {
    if (msg.body.startsWith("!stiker") || msg.body.startsWith("!sticker")) {
      if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        const attachment = await client.sendMessage(msg.from, media, {
          sendMediaAsSticker: true,
        });
      } else {
        msg.reply("klo mau bikin stiker, minimal kirim gambarnya dek");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

client.initialize();
