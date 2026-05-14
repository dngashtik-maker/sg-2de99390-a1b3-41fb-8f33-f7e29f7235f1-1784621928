import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2 } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  credentials: string;
  role: string;
  company: string;
  country: string;
  primaryBranch: string;
  category: "Staff" | "Board" | "Volunteer";
  email: string;
  phone: string;
  photoUrl: string;
  joinDate: string;
  status: "Active" | "Inactive";
  cpdPoints: number;
}

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.id}`}>
      <Card className="group hover:border-accent transition-colors cursor-pointer p-5 bg-card">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-sm overflow-hidden bg-muted flex-shrink-0">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="font-sans font-bold text-base text-foreground truncate group-hover:text-accent transition-colors">
                {member.name}
              </h3>
              <span className="font-sans font-semibold text-xs text-accent flex-shrink-0">
                {member.credentials}
              </span>
            </div>
            <p className="font-sans text-sm text-foreground mb-1 truncate">
              {member.role}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{member.company}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{member.country} • {member.primaryBranch}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}