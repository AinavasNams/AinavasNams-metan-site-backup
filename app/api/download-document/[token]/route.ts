import { NextRequest, NextResponse } from 'next/server';

// 🚫 Токен-система больше не используется - переход на прямые Google Drive ссылки

export async function GET(request: NextRequest) {
  const token = request.nextUrl.pathname.split('/').pop();
  
  console.log(`⚠️ Attempted access to deprecated token endpoint: ${token?.slice(0, 8)}...`);

  return NextResponse.json({
    error: 'Система скачивания обновлена. Используйте новую форму верификации.',
    message: 'Download system has been updated. Please use the new verification form.',
    redirect: '/investoriem'
  }, { status: 410 }); // Gone
}