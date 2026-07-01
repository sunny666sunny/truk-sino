/**
 * Feishu (飞书) group bot notification via webhook.
 * Sends rich interactive card messages when a new inquiry is received.
 */

const FEISHU_WEBHOOK_URL =
  process.env.FEISHU_WEBHOOK_URL || "";

interface InquiryData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  company?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
  createdAt: string;
}

/**
 * Send a rich inquiry notification card to the Feishu group.
 * Non-blocking — errors are logged but never thrown.
 */
export async function sendInquiryNotification(
  inquiry: InquiryData,
): Promise<void> {
  if (!FEISHU_WEBHOOK_URL) {
    console.warn("[feishu] FEISHU_WEBHOOK_URL not configured, skipping notification");
    return;
  }

  const fields: { label: string; value: string }[] = [
    { label: "👤 姓名", value: inquiry.name },
    { label: "📧 邮箱", value: inquiry.email },
    { label: "🌍 国家", value: inquiry.country },
  ];

  if (inquiry.phone) fields.push({ label: "📱 电话", value: inquiry.phone });
  if (inquiry.company) fields.push({ label: "🏢 公司", value: inquiry.company });
  if (inquiry.productInterest)
    fields.push({ label: "🚛 意向产品", value: inquiry.productInterest });
  if (inquiry.quantity)
    fields.push({ label: "📦 数量", value: inquiry.quantity });

  const fieldElements = fields.map((f) => ({
    tag: "div",
    text: {
      tag: "lark_md",
      content: `**${f.label}**\n${f.value}`,
    },
  }));

  const card = {
    msg_type: "interactive",
    card: {
      config: { wide_screen_mode: true },
      header: {
        title: {
          tag: "plain_text",
          content: `🔔 新询盘 — ${inquiry.name} (${inquiry.country})`,
        },
        template: "orange",
      },
      elements: [
        ...fieldElements,
        { tag: "hr" },
        {
          tag: "div",
          text: {
            tag: "lark_md",
            content: `**💬 询盘内容**\n${inquiry.message}`,
          },
        },
        { tag: "hr" },
        {
          tag: "note",
          elements: [
            {
              tag: "plain_text",
              content: `ID: ${inquiry.id}  |  ${new Date(inquiry.createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`,
            },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(FEISHU_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[feishu] Webhook returned ${res.status}: ${text}`);
    } else {
      console.log(`[feishu] Inquiry notification sent for ${inquiry.id}`);
    }
  } catch (err) {
    console.error("[feishu] Failed to send notification:", err);
  }
}
