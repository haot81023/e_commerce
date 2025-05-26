'use server'

import fs from "fs";
import path from "path";

export async function loginAction(formData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return {success: false, message: "Thiếu thông tin đăng nhập"};

  const filePath = path.join(process.cwd(), "src", "components", "data", "user.json");

  const raw = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(raw);

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return {success: true, user};
  } else {
    return {success: false, message: "Tài khoản hoặc mật khẩu không đúng"};
  }
}