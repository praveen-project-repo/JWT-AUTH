'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/firebase';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: <DollarSign className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1% from last month',
    icon: <Users className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: <CreditCard className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
    icon: <Activity className="text-muted-foreground h-4 w-4" />,
  },
];

const recentSales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    status: 'pending'
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    status: 'processing'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    status: 'success'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    status: 'success'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    status: 'processing'
  },
];

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Hello, <strong>{user.displayName || user.email}</strong>! Welcome to your
              newly designed dashboard.
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.email}>
                    <TableCell>
                      <div className="font-medium">{sale.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {sale.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sale.status === 'success' ? 'default' : sale.status === 'pending' ? 'secondary' : 'outline'} className={sale.status === 'success' ? 'bg-green-500/20 text-green-700 border-green-500/20' : sale.status === 'pending' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20' : ''}>{sale.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{sale.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
