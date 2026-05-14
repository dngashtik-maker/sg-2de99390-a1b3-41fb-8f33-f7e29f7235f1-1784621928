import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Member } from "@/components/MemberCard";

const MOCK_MEMBERS: (Member & {
  bio: string;
  committees: string[];
  skills: string[];
})[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Executive Director",
    category: "Staff",
    email: "s.chen@directory.org",
    phone: "+1-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    joinDate: "2020-03-15",
    status: "Active",
    bio: "Sarah brings over 15 years of nonprofit leadership experience. She specializes in organizational development, strategic planning, and community engagement. Prior to joining the organization, she led initiatives at several national nonprofits.",
    committees: ["Executive Board", "Strategic Planning", "Finance"],
    skills: ["Leadership", "Strategic Planning", "Fundraising", "Public Speaking"],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Board President",
    category: "Board",
    email: "m.rodriguez@directory.org",
    phone: "+1-555-0102",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    joinDate: "2019-01-10",
    status: "Active",
    bio: "Marcus is a corporate attorney with expertise in nonprofit governance. He has served on multiple boards and brings valuable legal and strategic insights to the organization.",
    committees: ["Executive Board", "Governance", "Legal Affairs"],
    skills: ["Legal Expertise", "Governance", "Risk Management", "Policy Development"],
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Program Manager",
    category: "Staff",
    email: "p.patel@directory.org",
    phone: "+1-555-0103",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    joinDate: "2021-06-20",
    status: "Active",
    bio: "Priya manages our flagship programs and ensures quality delivery to our community members. She has a background in social work and program evaluation.",
    committees: ["Program Committee", "Community Outreach"],
    skills: ["Program Management", "Data Analysis", "Grant Writing", "Community Engagement"],
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Volunteer Coordinator",
    category: "Volunteer",
    email: "j.wilson@directory.org",
    phone: "+1-555-0104",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    joinDate: "2022-02-14",
    status: "Active",
    bio: "James coordinates our volunteer programs and manages volunteer recruitment, training, and retention. He is passionate about building strong volunteer communities.",
    committees: ["Volunteer Committee", "Events"],
    skills: ["Volunteer Management", "Training & Development", "Event Planning", "Communication"],
  },
  {
    id: "5",
    name: "Elena Kowalski",
    role: "Communications Director",
    category: "Staff",
    email: "e.kowalski@directory.org",
    phone: "+1-555-0105",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    joinDate: "2020-09-01",
    status: "Active",
    bio: "Elena leads our communications strategy across all channels. She has expertise in digital marketing, public relations, and brand development.",
    committees: ["Marketing Committee", "Digital Strategy"],
    skills: ["Digital Marketing", "Content Strategy", "Social Media", "Brand Management"],
  },
  {
    id: "6",
    name: "David Okonkwo",
    role: "Treasurer",
    category: "Board",
    email: "d.okonkwo@directory.org",
    phone: "+1-555-0106",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    joinDate: "2019-05-30",
    status: "Active",
    bio: "David is a certified public accountant who oversees the organization's financial health. He ensures fiscal responsibility and transparent financial reporting.",
    committees: ["Finance Committee", "Audit Committee"],
    skills: ["Financial Management", "Accounting", "Budget Planning", "Compliance"],
  },
  {
    id: "7",
    name: "Aisha Mohammed",
    role: "Outreach Coordinator",
    category: "Volunteer",
    email: "a.mohammed@directory.org",
    phone: "+1-555-0107",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    joinDate: "2023-01-12",
    status: "Active",
    bio: "Aisha coordinates community outreach initiatives and builds partnerships with local organizations. She is dedicated to expanding our reach and impact.",
    committees: ["Community Outreach", "Partnership Development"],
    skills: ["Community Organizing", "Partnership Building", "Cultural Competency", "Advocacy"],
  },
  {
    id: "8",
    name: "Robert Zhang",
    role: "Secretary",
    category: "Board",
    email: "r.zhang@directory.org",
    phone: "+1-555-0108",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    joinDate: "2018-11-22",
    status: "Active",
    bio: "Robert maintains official records and ensures proper documentation of all board activities. He has extensive experience in nonprofit governance and compliance.",
    committees: ["Executive Board", "Governance", "Records Management"],
    skills: ["Documentation", "Governance", "Meeting Management", "Policy Implementation"],
  },
  {
    id: "9",
    name: "Linda Nguyen",
    role: "Development Manager",
    category: "Staff",
    email: "l.nguyen@directory.org",
    phone: "+1-555-0109",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    joinDate: "2021-03-08",
    status: "Active",
    bio: "Linda leads fundraising efforts and donor relations. She has successfully secured major grants and built lasting relationships with donors and funders.",
    committees: ["Development Committee", "Fundraising Events"],
    skills: ["Fundraising", "Donor Relations", "Grant Writing", "Event Management"],
  },
  {
    id: "10",
    name: "Carlos Mendez",
    role: "Events Coordinator",
    category: "Volunteer",
    email: "c.mendez@directory.org",
    phone: "+1-555-0110",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    joinDate: "2022-08-19",
    status: "Active",
    bio: "Carlos plans and executes our signature events and fundraisers. His attention to detail and creativity make every event memorable.",
    committees: ["Events", "Volunteer Committee"],
    skills: ["Event Planning", "Logistics", "Vendor Management", "Budget Management"],
  },
  {
    id: "11",
    name: "Fatima Al-Rashid",
    role: "Finance Director",
    category: "Staff",
    email: "f.alrashid@directory.org",
    phone: "+1-555-0111",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    joinDate: "2020-07-15",
    status: "Active",
    bio: "Fatima manages day-to-day financial operations and works closely with the treasurer. She ensures efficient financial processes and accurate reporting.",
    committees: ["Finance Committee"],
    skills: ["Financial Operations", "Payroll", "Reporting", "Process Improvement"],
  },
  {
    id: "12",
    name: "Thomas Anderson",
    role: "Board Member",
    category: "Board",
    email: "t.anderson@directory.org",
    phone: "+1-555-0112",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    joinDate: "2019-09-05",
    status: "Active",
    bio: "Thomas is a technology executive who advises on digital transformation and IT strategy. He helps the organization leverage technology for greater impact.",
    committees: ["Technology Committee", "Strategic Planning"],
    skills: ["Technology Strategy", "Digital Transformation", "Systems Architecture", "Innovation"],
  },
];

export default function EditMember() {
  const router = useRouter();
  const { id } = router.query;

  const member = MOCK_MEMBERS.find((m) => m.id === id);

  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    category: member?.category || "Staff",
    email: member?.email || "",
    phone: member?.phone || "",
    bio: member?.bio || "",
    photoUrl: member?.photoUrl || "",
    joinDate: member?.joinDate || "",
    status: member?.status || "Active",
    skills: member?.skills?.join(", ") || "",
    committees: member?.committees?.join(", ") || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving member data:", formData);
    router.push(`/members/${id}`);
  };

  const handleCancel = () => {
    router.push(`/members/${id}`);
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-sm text-muted-foreground mb-4">
            Member not found
          </p>
          <Link href="/">
            <Button variant="outline" className="font-sans text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Return to Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Edit ${member.name} - Member Profile`}
        description={`Edit profile information for ${member.name}`}
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl">
          <Link href={`/members/${id}`}>
            <Button variant="ghost" className="font-sans text-xs mb-6">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Back to Profile
            </Button>
          </Link>

          <Card className="p-6">
            <h1 className="font-sans font-bold text-2xl text-foreground mb-6">
              Edit Member Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-sm font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="font-sans"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive font-sans">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="font-sans text-sm font-semibold">
                    Role *
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="font-sans"
                  />
                  {errors.role && (
                    <p className="text-xs text-destructive font-sans">{errors.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-sans text-sm font-semibold">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as "Staff" | "Board" | "Volunteer" })}
                  >
                    <SelectTrigger className="font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff" className="font-sans">Staff</SelectItem>
                      <SelectItem value="Board" className="font-sans">Board</SelectItem>
                      <SelectItem value="Volunteer" className="font-sans">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="font-sans text-sm font-semibold">
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" })}
                  >
                    <SelectTrigger className="font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active" className="font-sans">Active</SelectItem>
                      <SelectItem value="Inactive" className="font-sans">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-sans text-sm font-semibold">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="font-sans"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive font-sans">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-sans text-sm font-semibold">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="font-sans"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive font-sans">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinDate" className="font-sans text-sm font-semibold">
                    Join Date *
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="font-sans"
                  />
                  {errors.joinDate && (
                    <p className="text-xs text-destructive font-sans">{errors.joinDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoUrl" className="font-sans text-sm font-semibold">
                    Photo URL
                  </Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="font-sans"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-sans text-sm font-semibold">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="font-sans min-h-[120px]"
                  placeholder="Brief biography..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committees" className="font-sans text-sm font-semibold">
                  Committees & Groups
                </Label>
                <Input
                  id="committees"
                  value={formData.committees}
                  onChange={(e) => setFormData({ ...formData, committees: e.target.value })}
                  className="font-sans"
                  placeholder="Separate with commas: Executive Board, Finance, Strategic Planning"
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Separate multiple committees with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="font-sans text-sm font-semibold">
                  Skills & Expertise
                </Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="font-sans"
                  placeholder="Separate with commas: Leadership, Strategic Planning, Fundraising"
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Separate multiple skills with commas
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" className="font-sans text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="font-sans text-sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}