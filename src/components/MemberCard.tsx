import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Member {
  id: string;
  name: string;
  role: string;
  category: "Staff" | "Board" | "Volunteer";
  email: string;
  phone: string;
  photoUrl: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.id}`}>
      <Card className="group hover:border-accent transition-colors cursor-pointer p-4 bg-card">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-sm overflow-hidden bg-muted flex-shrink-0">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-mono font-bold text-sm text-foreground truncate group-hover:text-accent transition-colors">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-0.5 truncate">
                {member.role}
              </p>
              <Badge
                variant="secondary"
                className="mt-2 text-xs font-mono font-normal"
              >
                {member.category}
              </Badge>
            </div>
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground tabular-nums">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{member.phone}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}