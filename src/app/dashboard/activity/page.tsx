'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity as ActivityIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    user: 'Olivia Martin',
    avatar: '/avatars/01.png',
    action: ' upgraded their plan to Pro.',
    time: '2 hours ago',
  },
  {
    user: 'Jackson Lee',
    avatar: '/avatars/02.png',
    action: ' added a new user.',
    time: '5 hours ago',
  },
  {
    user: 'Isabella Nguyen',
    avatar: '/avatars/03.png',
    action: ' updated their billing details.',
    time: '1 day ago',
  },
  {
    user: 'William Kim',
    avatar: '/avatars/04.png',
    action: ' signed in.',
    time: '2 days ago',
  },
  {
    user: 'Sofia Davis',
    avatar: '/avatars/05.png',
    action: ' changed their password.',
    time: '3 days ago',
  },
];

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ActivityIcon className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">
            A log of recent activities in your account.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Here is a list of the most recent events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.avatar} alt="Avatar" />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
