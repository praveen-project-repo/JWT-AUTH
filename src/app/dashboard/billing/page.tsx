'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard as CreditCardIcon, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: '/ month',
        features: [
            '1 User',
            'Basic Dashboard',
            'Email Support'
        ],
        cta: 'Current Plan',
        isCurrent: true,
    },
    {
        name: 'Pro',
        price: '$25',
        period: '/ month',
        features: [
            '5 Users',
            'Advanced Analytics',
            'Priority Support',
            'Billing Management'
        ],
        cta: 'Upgrade to Pro',
        isCurrent: false,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        features: [
            'Unlimited Users',
            'Dedicated Account Manager',
            'Custom Integrations',
            '24/7 Support'
        ],
        cta: 'Contact Sales',
        isCurrent: false,
    },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <CreditCardIcon className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment details.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Your primary payment method is a Visa ending in 1234.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4">
                <CreditCardIcon className="h-6 w-6 text-muted-foreground" />
                <span>Visa **** **** **** 1234</span>
                <Badge variant="secondary">Primary</Badge>
            </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Update Payment Method</Button>
        </CardFooter>
      </Card>
      
      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-1">Subscription Plans</h2>
        <p className="text-muted-foreground mb-4">Choose the plan that's right for you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.isCurrent ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={plan.isCurrent}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
