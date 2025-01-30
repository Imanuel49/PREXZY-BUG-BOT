//base by DGXeon (Xeon Bot Inc.)
//YouTube: @prexzyvilla
//Instagram: prexzy.ay
//Telegram: t.me/prexzyvilla_tech
//GitHub: @Prexzybooster
//WhatsApp: +2349159895444
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@Prexzyvilla

const fs = require('fs').promises;
const { Buffer } = require('buffer');
const FileType = require('file-type');

async function downloadMediaMessage(message) {
  try {
    const mime = (message.msg || message).mimetype || '';
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    const buffer = await streamToBuffer(stream);
    return buffer;
  } catch (error) {
    console.error('Error downloading media message:', error);
    return null;
  }
}

async function saveFile(buffer, filename) {
  try {
    const type = await FileType.fromBuffer(buffer);
    const trueFileName = `${filename}.${type.ext}`;
    await fs.writeFile(trueFileName, buffer);
    return trueFileName;
  } catch (error) {
    console.error('Error saving file:', error);
    return null;
  }
}

async function streamToBuffer(stream) {
  const buffer = Buffer.alloc(0);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  return buffer;
}

const file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  require(file);
});

process.on('uncaughtException', (error) => {
  console.error('Caught exception:', error);
  process.exit(1);
});
