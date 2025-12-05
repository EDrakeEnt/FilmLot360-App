import { DashboardLayout } from '../components/DashboardLayout';
import { CreditCard, Plus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UpgradePrompt } from '../components/UpgradePrompt';
import { useState, useEffect } from 'react';
import { profileAPI } from '../utils/api';
import { getSubscriptionStatus } from '../utils/subscription';

export function DashboardPaymentMethods() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const response = await profileAPI.get();
      const subStatus = getSubscriptionStatus(response.profile.subscription);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(subStatus.isPaid);
    } catch (error) {
      console.error('Error checking access:', error);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <UpgradePrompt
          featureName="Payment Methods"
          description="Securely store and manage payment methods for quick transactions. Process payments and manage vendor relationships efficiently."
          icon={CreditCard}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Payment Methods</h1>
            <p className="text-gray-400">Manage payment methods and transaction settings</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-white text-2xl mb-2">Payment Methods Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Securely manage your payment methods and transaction preferences.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}