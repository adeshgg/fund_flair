import UserCard from '@/components/UserCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function LeaderBoard() {
  const users = await prisma.user.findMany({
    orderBy: {
      rewards: 'desc',
    },
  })

  return (
    <div>
      {users.map(user => (
        <UserCard
          username={user.name!}
          image={user.image!}
          rewards={user.rewards}
          key={user.id}
        />
      ))}
    </div>
  )
}
