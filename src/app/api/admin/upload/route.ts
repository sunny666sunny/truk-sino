import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;
const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

function extensionFor(file: File) {
  const byMime = MIME_EXT[file.type];
  if (byMime) return byMime;
  const ext = path.extname(file.name).replace(".", "").toLowerCase();
  return ext || "bin";
}

function filenameToAlt(name: string) {
  return path.basename(name, path.extname(name)).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const form = await req.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") ?? "").trim();
    const caption = String(form.get("caption") ?? "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "请选择要上传的图片" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "只支持图片文件" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "图片不能超过 5MB" }, { status: 400 });
    }

    const ext = extensionFor(file);
    const filename = `${Date.now()}-${randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "admin");
    const diskPath = path.join(uploadDir, filename);
    const url = `/uploads/admin/${filename}`;

    await mkdir(uploadDir, { recursive: true });
    await writeFile(diskPath, Buffer.from(await file.arrayBuffer()));

    const media = await prisma.mediaItem.create({
      data: {
        name: file.name,
        url,
        mimeType: file.type,
        size: file.size,
        alt: alt || filenameToAlt(file.name),
        caption: caption || null,
        uploadedBy: user.id,
      },
    });

    return NextResponse.json({ url, filename, media });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "未登录" : "上传失败" }, { status: statusCode });
  }
}