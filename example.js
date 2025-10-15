import { connectWA, sendButtons, sendList, sendReaction, sendVCard, sendPoll } from "./index.js";

const start = async () => {
  const sock = await connectWA();

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const jid = msg.key.remoteJid;

    if (msg.message.conversation === "buttons") {
      await sendButtons(sock, jid, "Choose one:", [
        { id: "b1", text: "Yes" },
        { id: "b2", text: "No" }
      ]);
    }

    if (msg.message.conversation === "list") {
      await sendList(sock, jid, "Menu", "Select:", "Footer", "Open", [
        { title: "Options", rows: [{ title: "Option 1" }, { title: "Option 2" }] }
      ]);
    }

    if (msg.message.conversation === "react") {
      await sendReaction(sock, msg.key, "🔥");
    }

    if (msg.message.conversation === "poll") {
      await sendPoll(sock, jid, "Which is better?", ["Option A", "Option B"]);
    }
  });
};

start();
