import { Star, MapPin, Mail, Phone, Eye, FileSignature, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface CompanyCardProps {
  company: any;
  onView: () => void;
  getStatusColor: (status: string) => string;
}

export function CompanyCard({ company, onView, getStatusColor }: CompanyCardProps) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <button 
            onClick={onView}
            className="text-white hover:text-purple-400 transition-colors text-left"
          >
            {company.name}
          </button>
          <div className="text-gray-500 text-sm">{company.type}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(company.status)}`}>
              {company.status}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm">{company.performance}/5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="text-gray-400 text-xs mb-1">Primary Contact</div>
          <div className="text-white mb-1">{company.contact.name}</div>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-0.5">
            <Mail className="w-3 h-3" />
            <span className="truncate">{company.contact.email}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Phone className="w-3 h-3" />
            <span>{company.contact.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-gray-400 text-xs mb-1">Location</div>
            <div className="flex items-center gap-1 text-white">
              <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
              <span className="text-sm truncate">{company.location}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">Contracts</div>
            <div className="text-white">{company.contracts}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-gray-400 text-xs mb-1">Monthly Spend</div>
            <div className="text-white">{company.monthlySpend}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">Last Order</div>
            <div className="text-white text-sm">{company.lastOrder}</div>
          </div>
        </div>

        <Button
          onClick={onView}
          variant="outline"
          className="w-full border-white/10 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </div>
  );
}

interface ContractCardProps {
  contract: any;
  onView: () => void;
  getStatusColor: (status: string) => string;
}

export function ContractCard({ contract, onView, getStatusColor }: ContractCardProps) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white mb-1">{contract.company}</h4>
          <div className="text-gray-400 text-sm">{contract.type}</div>
        </div>
        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(contract.status)}`}>
          {contract.status}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-gray-400 text-xs mb-1">Contract Value</div>
            <div className="text-white">{contract.value}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">Renewal Status</div>
            <span className={`px-2 py-1 rounded text-xs ${
              contract.renewalStatus === 'Expiring Soon' 
                ? 'bg-red-500/10 text-red-400'
                : contract.renewalStatus === 'Auto-Renew'
                ? 'bg-green-500/10 text-green-400'
                : 'bg-yellow-500/10 text-yellow-400'
            }`}>
              {contract.renewalStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-gray-400 text-xs mb-1">Start Date</div>
            <div className="text-white">{contract.startDate}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">End Date</div>
            <div className="text-white">{contract.endDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onView}
            variant="outline"
            className="flex-1 border-white/10 text-white"
          >
            <FileSignature className="w-4 h-4 mr-2" />
            Send Contract
          </Button>
          <Button
            onClick={onView}
            variant="outline"
            className="flex-1 border-white/10 text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PerformanceCardProps {
  vendor: any;
}

export function PerformanceCard({ vendor }: PerformanceCardProps) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white mb-1">{vendor.company}</h4>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white">{vendor.rating}/5.0</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {vendor.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
          {vendor.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
          {vendor.trend === 'stable' && <span className="text-gray-400">—</span>}
          <span className={`text-sm ${
            vendor.trend === 'up' ? 'text-green-400' :
            vendor.trend === 'down' ? 'text-red-400' :
            'text-gray-400'
          }`}>
            {vendor.trend === 'up' ? 'Improving' : vendor.trend === 'down' ? 'Declining' : 'Stable'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-400 text-xs mb-1">On-Time Delivery</div>
          <div className="text-white">{vendor.onTimeDelivery}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Quality Score</div>
          <div className="text-white">{vendor.qualityScore}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Avg Response</div>
          <div className="text-white">{vendor.responseTime}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Projects</div>
          <div className="text-white">{vendor.projectsCompleted}</div>
        </div>
      </div>
    </div>
  );
}
