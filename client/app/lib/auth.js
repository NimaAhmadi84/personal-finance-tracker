// client/app/lib/auth.js (Fake Auth Service)

const USERS_KEY = 'fake_users';
const CURRENT_USER_KEY = 'fake_currentUser';

// گرفتن لیست کاربران از localStorage
function getUsers() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// ذخیره‌ی کاربران در localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// دریافت کاربر جاری
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// ذخیره‌ی کاربر جاری
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// آیا کاربر لاگین کرده؟
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

// ثبت‌نام کاربر جدید
export function register(username, email, password) {
  const users = getUsers();

  // بررسی تکراری نبودن ایمیل
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already registered!' };
  }

  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);
  saveUsers(users);

  // ورود خودکار پس از ثبت‌نام
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

// ورود کاربر
export function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, message: 'Email not found!' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password!' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

// خروج کاربر
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}