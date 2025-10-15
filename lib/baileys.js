import makeWASocket, { useMultiFileAuthState, makeInMemoryStore, Browsers } from "@whiskeysockets/baileys";
import Pino from "pino";

export async function connectWA() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const sock = makeWASocket({
    printQRInTerminal: true,
    browser: Browsers.macOS("Safari"),
    auth: state,
    logger: Pino({ level: "silent" })
  });
  sock.ev.on("creds.update", saveCreds);
  return sock;
}

export async function sendButtons(sock, jid, text, buttons, footer = "Powered by @ArzXD/Baileys") {
  return await sock.sendMessage(jid, {
    text,
    footer,
    buttons: buttons.map(b => ({ buttonId: b.id, buttonText: { displayText: b.text }, type: 1 }))
  });
}

export async function sendList(sock, jid, title, text, footer, buttonText, sections) {
  return await sock.sendMessage(jid, {
    text,
    footer,
    title,
    buttonText,
    sections
  });
}

export async function sendReaction(sock, key, emoji) {
  return await sock.sendMessage(key.remoteJid, { react: { text: emoji, key } });
}

export async function sendVCard(sock, jid, name, number) {
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`;
  return await sock.sendMessage(jid, {
    contacts: { displayName: name, contacts: [{ vcard }] }
  });
}

export async function sendPoll(sock, jid, name, options) {
  return await sock.sendMessage(jid, {
    poll: {
      name,
      options,
      selectableCount: 1
    }
  });
}
