# Поиск чатов по имени
🔶 Prisma реализация через prisma.$queryRaw
```ts
const chats = await prisma.$queryRawUnsafe(`
  SELECT c.*, 
         CASE 
             WHEN c."userAId" = $1 THEN u2."fullName"
             ELSE u1."fullName"
         END AS "otherUserFullName",
         CASE 
             WHEN c."userAId" = $1 THEN u2."nickname"
             ELSE u1."nickname"
         END AS "otherUserNickname"
  FROM "Chat" c
  JOIN "User" u1 ON c."userAId" = u1."id"
  JOIN "User" u2 ON c."userBId" = u2."id"
  WHERE (c."userAId" = $1 OR c."userBId" = $1)
    AND (
         (u1."id" != $1 AND (u1."fullName" ILIKE $2 OR u1."nickname" ILIKE $2))
      OR (u2."id" != $1 AND (u2."fullName" ILIKE $2 OR u2."nickname" ILIKE $2))
    )
  ORDER BY c."updatedAt" DESC
  LIMIT 50
`, currentUserId, `%${query}%`);
```

✅ Что лучше: сделать проекцию otherUser на клиенте или при запросе на сервере
```ts
const chatList = await prisma.chat.findMany({
  where: {
    OR: [
      { userAId: userId },
      { userBId: userId }
    ]
  },
  orderBy: { updatedAt: 'desc' },
  include: {
    userA: true,
    userB: true
  },
  take: 50
});

// Приведение к виду "otherUser"
const result = chatList.map(chat => {
  const otherUser = chat.userAId === userId ? chat.userB : chat.userA;
  return {
    id: chat.id,
    updatedAt: chat.updatedAt,
    lastMessageText: chat.lastMessageText,
    otherUser: {
      id: otherUser.id,
      fullName: otherUser.fullName,
      nickname: otherUser.nickname,
      avatarUrl: otherUser.avatarUrl
    }
  };
});
```