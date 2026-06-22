// استدعاء مكتبة البوت
const TelegramBot = require('node-telegram-bot-api');

// ضع التوكن الخاص بالبوت هنا
const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

// أمر البداية للتدريب
bot.onText(/\/training/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "📚 تدريب: لابد من وجود عينة أصلية + مراجعة Tackback قبل القرار النهائي.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "➡️ ابدأ التدريب", callback_data: "train_step1" }]
      ]
    }
  });
});

// خطوات التدريب التفاعلية
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  switch (query.data) {
    case "train_step1":
      bot.sendMessage(chatId, "🔍 خطوة 1: اختيار العينة الأصلية (للتدريب فقط).", {
        reply_markup: {
          inline_keyboard: [[{ text: "➡️ التالي", callback_data: "train_step2" }]]
        }
      });
      break;

    case "train_step2":
      bot.sendMessage(chatId, "🖊️ خطوة 2: تسجيل النتائج وتصنيف العيوب.", {
        reply_markup: {
          inline_keyboard: [[{ text: "➡️ التالي", callback_data: "train_step3" }]]
        }
      });
      break;

    case "train_step3":
      bot.sendMessage(chatId, "🔄 خطوة 3: مراجعة Tackback للعينة الأصلية.", {
        reply_markup: {
          inline_keyboard: [[{ text: "➡️ التالي", callback_data: "train_step4" }]]
        }
      });
      break;

    case "train_step4":
      bot.sendMessage(chatId, "🎯 خطوة 4: اتخاذ القرار النهائي (قبول/رفض) للتدريب.");
      break;
  }
});
