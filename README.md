# @ArzXD/Baileys

Powerful Baileys wrapper with modern WhatsApp Web features — QR pairing, buttons, lists, polls, reactions, vCards, and more.

## 🚀 Installation
```bash
npm install @ArzXD/Baileys
```

## ✨ Features
- QR / Pairing code
- Buttons & List messages
- Poll creation & tally
- Message reactions
- vCard (contact sharing)
- Retrieve chat & group IDs
- Event helpers for message and connection updates

## 🧩 Example
```js
import { connectWA, sendButtons } from "@ArzXD/Baileys";

const wa = await connectWA();
await sendButtons(wa, "6281234567890@s.whatsapp.net", "Hello!", [
  { id: "1", text: "Option 1" },
  { id: "2", text: "Option 2" }
]);
```

## 📝 License
MIT © ArzXD
