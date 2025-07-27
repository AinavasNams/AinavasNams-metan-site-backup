// 🔐 Общее хранилище для верификации пользователей
// В продакшене это должно быть в Redis или базе данных

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// 🔐 Надежное хранилище для верификации пользователей
// Использует файловую систему как fallback для serverless среды

// Интерфейсы
export interface VerificationData {
  code: string;
  timestamp: number;
  data: any;
  verified: boolean;
}

export interface VerifiedUser {
  name: string;
  email: string;
  company?: string;
  verifiedAt: number;
  downloadsCount: number;
  allowedDocuments: string[];
}

// 🔒 Безопасные пути к файлам хранения
const STORAGE_DIR = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), '.secure-storage')  // Более безопасная директория в продакшене
  : path.join(process.cwd(), '.tmp-storage');     // Временная директория для разработки

const CODES_FILE = path.join(STORAGE_DIR, '.codes.enc');  // Зашифрованный файл
const USERS_FILE = path.join(STORAGE_DIR, '.users.enc');  // Зашифрованный файл

// 🔐 Простое шифрование для файлов (в продакшене использовать более сильное шифрование)
const ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY || 'default-dev-key-change-in-production';

function encrypt(text: string): string {
  try {
    const cipher = crypto.createCipher('aes192', ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch {
    // Fallback: base64 кодирование если шифрование не работает
    return Buffer.from(text).toString('base64');
  }
}

function decrypt(text: string): string {
  try {
    const decipher = crypto.createDecipher('aes192', ENCRYPTION_KEY);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    // Fallback: base64 декодирование
    try {
      return Buffer.from(text, 'base64').toString('utf8');
    } catch {
      return '{}'; // Возвращаем пустой объект если не удается декодировать
    }
  }
}

// Константы
export const CODE_EXPIRY = 30 * 60 * 1000; // 30 минут

// Инициализация безопасного хранилища
function initStorage() {
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { 
        recursive: true,
        mode: 0o700  // Только владелец может читать/записывать/выполнять
      });
      console.log('🔒 Secure storage directory created');
    }
  } catch (error) {
    console.warn('⚠️ Could not create secure storage directory:', error);
  }
}

// Функции для работы с зашифрованным файловым хранилищем
function loadCodes(): Map<string, VerificationData> {
  try {
    if (fs.existsSync(CODES_FILE)) {
      const encryptedData = fs.readFileSync(CODES_FILE, 'utf8');
      const decryptedData = decrypt(encryptedData);
      const obj = JSON.parse(decryptedData);
      return new Map(Object.entries(obj));
    }
  } catch (error) {
    console.warn('⚠️ Could not load codes:', error);
  }
  return new Map();
}

function saveCodes(codes: Map<string, VerificationData>) {
  try {
    initStorage();
    const obj = Object.fromEntries(codes);
    const jsonData = JSON.stringify(obj, null, 2);
    const encryptedData = encrypt(jsonData);
    
    fs.writeFileSync(CODES_FILE, encryptedData, { 
      mode: 0o600  // Только владелец может читать/записывать
    });
    console.log('💾 Encrypted codes saved to secure storage');
  } catch (error) {
    console.warn('⚠️ Could not save codes:', error);
  }
}

function loadUsers(): Map<string, VerifiedUser> {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const encryptedData = fs.readFileSync(USERS_FILE, 'utf8');
      const decryptedData = decrypt(encryptedData);
      const obj = JSON.parse(decryptedData);
      return new Map(Object.entries(obj));
    }
  } catch (error) {
    console.warn('⚠️ Could not load users:', error);
  }
  return new Map();
}

function saveUsers(users: Map<string, VerifiedUser>) {
  try {
    initStorage();
    const obj = Object.fromEntries(users);
    const jsonData = JSON.stringify(obj, null, 2);
    const encryptedData = encrypt(jsonData);
    
    fs.writeFileSync(USERS_FILE, encryptedData, {
      mode: 0o600  // Только владелец может читать/записывать
    });
    console.log('💾 Encrypted users saved to secure storage');
  } catch (error) {
    console.warn('⚠️ Could not save users:', error);
  }
}

// Гибридное хранилище: память + файлы
class HybridStorage<T> {
  private memoryCache = new Map<string, T>();
  private loadFn: () => Map<string, T>;
  private saveFn: (data: Map<string, T>) => void;
  private lastLoad = 0;
  private CACHE_TTL = 30000; // 30 секунд

  constructor(loadFn: () => Map<string, T>, saveFn: (data: Map<string, T>) => void) {
    this.loadFn = loadFn;
    this.saveFn = saveFn;
  }

  private refreshCache() {
    const now = Date.now();
    if (now - this.lastLoad > this.CACHE_TTL || this.memoryCache.size === 0) {
      this.memoryCache = this.loadFn();
      this.lastLoad = now;
      console.log('🔄 Cache refreshed from persistent storage');
    }
  }

  get(key: string): T | undefined {
    this.refreshCache();
    return this.memoryCache.get(key);
  }

  set(key: string, value: T) {
    this.refreshCache();
    this.memoryCache.set(key, value);
    this.saveFn(this.memoryCache);
  }

  delete(key: string): boolean {
    this.refreshCache();
    const result = this.memoryCache.delete(key);
    if (result) {
      this.saveFn(this.memoryCache);
    }
    return result;
  }

  entries(): IterableIterator<[string, T]> {
    this.refreshCache();
    return this.memoryCache.entries();
  }

  get size(): number {
    this.refreshCache();
    return this.memoryCache.size;
  }
}

// Создаем гибридные хранилища
const verificationCodes = new HybridStorage<VerificationData>(loadCodes, saveCodes);
const verifiedUsers = new HybridStorage<VerifiedUser>(loadUsers, saveUsers);

// Функции для работы с кодами верификации
export function setVerificationCode(email: string, data: VerificationData) {
  verificationCodes.set(email, data);
  
  // В продакшене не логируем чувствительную информацию
  if (process.env.NODE_ENV === 'production') {
    console.log(`📝 Verification code set for ${email.replace(/(.{3}).*@/, '$1***@')}, expires in ${CODE_EXPIRY / 1000 / 60} minutes`);
  } else {
    console.log(`📝 Verification code set for ${email}, expires in ${CODE_EXPIRY / 1000 / 60} minutes`);
  }
  
  console.log(`📊 Total active codes: ${verificationCodes.size}`);
}

export function getVerificationCode(email: string): VerificationData | undefined {
  return verificationCodes.get(email);
}

export function deleteVerificationCode(email: string) {
  const result = verificationCodes.delete(email);
  if (result) {
    console.log(`🗑️ Verification code deleted for ${email}`);
  }
  return result;
}

export function isVerificationCodeValid(email: string, code: string): { valid: boolean; error?: string; details?: any } {
  const trimmedCode = code.trim();
  console.log(`🔍 Checking verification code for ${email}:`);
  console.log(`   - Input code: "${code}" (length: ${code.length})`);
  console.log(`   - Trimmed code: "${trimmedCode}" (length: ${trimmedCode.length})`);
  
  const storedData = verificationCodes.get(email);
  
  if (!storedData) {
    console.log(`❌ No verification code found for ${email}`);
    return { valid: false, error: 'Kods nav atrasts. Pieprasiet jaunu kodu.' };
  }

  console.log(`   - Stored code: "${storedData.code}" (length: ${storedData.code.length})`);
  console.log(`   - Codes match: ${storedData.code === trimmedCode}`);

  if (storedData.code !== trimmedCode) {
    console.log(`❌ Invalid code for ${email}: expected "${storedData.code}", got "${trimmedCode}"`);
    return { valid: false, error: 'Nepareizs kods. Pārbaudiet un mēģiniet vēlreiz.' };
  }

  // Детальная проверка времени
  const now = Date.now();
  const codeAge = now - storedData.timestamp;
  const codeAgeMinutes = Math.floor(codeAge / (60 * 1000));
  const codeAgeSeconds = Math.floor((codeAge % (60 * 1000)) / 1000);
  const expiryMinutes = Math.floor(CODE_EXPIRY / (60 * 1000));
  
  console.log(`⏰ Time check for ${email}:`);
  console.log(`   - Code created: ${new Date(storedData.timestamp).toISOString()}`);
  console.log(`   - Current time: ${new Date(now).toISOString()}`);
  console.log(`   - Code age: ${codeAgeMinutes}m ${codeAgeSeconds}s`);
  console.log(`   - Expiry limit: ${expiryMinutes} minutes`);
  console.log(`   - Time elapsed: ${codeAge}ms / ${CODE_EXPIRY}ms`);
  console.log(`   - Is expired: ${codeAge > CODE_EXPIRY}`);

  if (codeAge > CODE_EXPIRY) {
    verificationCodes.delete(email);
    console.log(`⏰ Code expired for ${email} (${codeAgeMinutes}m ${codeAgeSeconds}s old)`);
    return { 
      valid: false, 
      error: `Kods beidzies pēc ${codeAgeMinutes} minūtēm. Pieprasiet jaunu kodu.`,
      details: {
        codeAge: codeAgeMinutes,
        expiryLimit: expiryMinutes
      }
    };
  }

  console.log(`✅ Code is valid for ${email} (${expiryMinutes - codeAgeMinutes} minutes remaining)`);
  return { 
    valid: true, 
    details: {
      remainingMinutes: expiryMinutes - codeAgeMinutes,
      codeAge: codeAgeMinutes
    }
  };
}

// Функции для работы с верифицированными пользователями
export function addVerifiedUser(email: string, userData: any): VerifiedUser {
  // Проверяем, существует ли уже пользователь
  const existingUser = verifiedUsers.get(email);
  
  let user: VerifiedUser;
  
  if (existingUser) {
    console.log(`📝 User ${email} already exists, updating data...`);
    // Обновляем только недостающие поля, сохраняя счетчик скачиваний
    user = {
      ...existingUser,
      name: userData.name || existingUser.name,
      company: userData.company || existingUser.company,
      verifiedAt: Date.now() // Обновляем время верификации
    };
  } else {
    // Создаем нового пользователя
    user = {
      name: userData.name || email.split('@')[0],
      email: userData.email || email,
      company: userData.company || 'Unknown',
      verifiedAt: Date.now(),
      downloadsCount: 0,
      allowedDocuments: ['business_plan_lv', 'business_plan_ru', 'business_plan_en', 'financial_model']
    };
    console.log(`✅ New user ${email} added to verified users list`);
  }
  
  verifiedUsers.set(email, user);
  
  // Логируем текущее состояние для отладки
  console.log(`📊 Total verified users: ${verifiedUsers.size}`);
  
  return user;
}

export function getVerifiedUser(email: string): VerifiedUser | undefined {
  return verifiedUsers.get(email);
}

export function isUserVerified(email: string): boolean {
  const user = verifiedUsers.get(email);
  return !!user;
}

export function incrementDownloadCount(email: string): boolean {
  const user = verifiedUsers.get(email);
  if (user) {
    user.downloadsCount += 1;
    verifiedUsers.set(email, user);
    console.log(`📈 Download count incremented for ${email}: ${user.downloadsCount}`);
    return true;
  }
  return false;
}

// Функция очистки старых записей
export function cleanupExpiredCodes() {
  const now = Date.now();
  const entries = Array.from(verificationCodes.entries());
  let cleanedCount = 0;
  
  console.log(`🧹 Starting cleanup. Current time: ${new Date(now).toISOString()}`);
  
  for (const [email, data] of entries) {
    const age = now - data.timestamp;
    const ageMinutes = Math.floor(age / 1000 / 60);
    
    if (age > CODE_EXPIRY) {
      verificationCodes.delete(email);
      cleanedCount++;
      console.log(`🗑️ Removed expired code for ${email} (age: ${ageMinutes} min)`);
    } else {
      console.log(`⏰ Code for ${email} still valid (age: ${ageMinutes} min, expires in ${Math.floor(CODE_EXPIRY / 1000 / 60) - ageMinutes} min)`);
    }
  }
  
  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} expired verification codes`);
  } else {
    console.log(`✅ No expired codes to clean up`);
  }
}

// Функция для получения статистики (для отладки)
export function getStats() {
  const now = Date.now();
  const codes = Array.from(verificationCodes.entries()).map(([email, data]) => ({
    email: email.replace(/(.{3}).*@/, '$1***@'), // Скрываем email для безопасности
    age: Math.floor((now - data.timestamp) / 1000 / 60), // возраст в минутах
    verified: data.verified,
    expiresIn: Math.max(0, Math.floor((CODE_EXPIRY - (now - data.timestamp)) / 1000 / 60)) // осталось минут
  }));
  
  return {
    totalVerificationCodes: verificationCodes.size,
    totalVerifiedUsers: verifiedUsers.size,
    activeCodes: codes,
    timestamp: new Date().toISOString(),
    codeExpiryMinutes: CODE_EXPIRY / 1000 / 60,
    storageType: 'hybrid-persistent'
  };
}